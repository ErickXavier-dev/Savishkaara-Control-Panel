// routes/health.js
const express = require('express');
const router = express.Router();
const os = require('os');
const fs = require('fs').promises;

// Shared metrics
let metrics = { cpu: 0, memory: 0, disk: 0, network: 0 };

// CPU state
let lastCpu = null;

// Network state
let lastNetworkSample = null;
let lastNetworkTime = Date.now();

// === CPU: Lightweight ===
function getCPUUsage() {
  const cpus = os.cpus();
  let idle = 0, total = 0;
  for (const cpu of cpus) {
    for (const type in cpu.times) total += cpu.times[type];
    idle += cpu.times.idle;
  }
  return { idle, total };
}

// === Memory: Built-in ===
function getMemoryUsage() {
  const total = os.totalmem();
  const free = os.freemem();
  return total > 0 ? parseFloat(((1 - free / total) * 100).toFixed(1)) : 0;
}

// === Disk: Lightweight (Linux/macOS), skipped on Windows ===
async function getDiskUsage() {
  if (process.platform === 'win32') return 0;
  try {
    const stat = await fs.statfs('/');
    const total = stat.blocks * stat.bsize;
    const free = stat.bfree * stat.bsize;
    return total > 0 ? parseFloat(((1 - free / total) * 100).toFixed(1)) : 0;
  } catch {
    return 0;
  }
}

// === Network: Cross-platform, low-overhead ===
async function getNetworkBytes() {
  if (process.platform === 'linux') {
    // Parse /proc/net/dev
    const data = await fs.readFile('/proc/net/dev', 'utf8');
    let rx = 0, tx = 0;
    const lines = data.split('\n').slice(2);
    for (const line of lines) {
      const match = line.match(/^\s*(\S+):\s*(\d+)\s+\d+\s+\d+\s+\d+\s+\d+\s+\d+\s+\d+\s+\d+\s+(\d+)/);
      if (match) {
        const iface = match[1];
        if (iface === 'lo') continue; // skip loopback
        rx += parseInt(match[2], 10) || 0;
        tx += parseInt(match[3], 10) || 0;
      }
    }
    return { rx, tx };
  } else {
    // Windows/macOS: use os.networkInterfaces()
    const nets = os.networkInterfaces();
    let rx = 0, tx = 0;
    for (const name of Object.keys(nets)) {
      if (name.startsWith('lo') || name.includes('Loopback')) continue;
      for (const net of nets[name]) {
        if (net.family === 'IPv4' && !net.internal) {
          // Note: os.networkInterfaces() does NOT provide byte counters on Windows/macOS
          // So we return 0 — bandwidth not available without external tools
        }
      }
    }
    // On non-Linux, we can't get rx/tx bytes reliably without systeminformation or WMI
    // So we return null to skip calculation
    return null;
  }
}

// === Background sampler (every 2000ms) ===
async function updateMetrics() {
  try {
    // CPU
    const currCpu = getCPUUsage();
    if (lastCpu) {
      const idleDiff = currCpu.idle - lastCpu.idle;
      const totalDiff = currCpu.total - lastCpu.total;
      if (totalDiff > 0) {
        const usage = 100 - (idleDiff / totalDiff) * 100;
        metrics.cpu = parseFloat(Math.max(0, Math.min(100, usage)).toFixed(1));
      }
    }
    lastCpu = currCpu;

    // Memory
    metrics.memory = getMemoryUsage();

    // Disk (every 4s)
    if (Date.now() % 4000 < 2000) {
      metrics.disk = await getDiskUsage();
    }

    // Network: Only on Linux (where /proc/net/dev is available)
    // Windows-only: use PowerShell (high overhead!)
    if (process.platform === 'win32') {
      const { exec } = require('child_process');
      exec(
        "Get-NetAdapterStatistics | Where-Object {$_.InterfaceDescription -notlike '*loopback*'} | Measure-Object -Property ReceivedBytes, SentBytes -Sum | ForEach-Object { $_.Sum }",
        (err, stdout) => { /* parse */ }
      );
    }
  } catch (err) {
    console.warn('Metric update error:', err.message);
  }
}

// Warm up
setTimeout(() => {
  lastCpu = getCPUUsage();
  if (process.platform === 'linux') {
    getNetworkBytes().then(net => {
      lastNetworkSample = net;
      lastNetworkTime = Date.now();
    }).catch(() => {});
  }
  updateMetrics();
}, 500);

const interval = setInterval(updateMetrics, 2000);

process.on('SIGINT', () => {
  clearInterval(interval);
  process.exit(0);
});

// === API ===
router.get('/health', (req, res) => {
  console.log(`CPU: ${metrics.cpu}%, Memory: ${metrics.memory}%, Disk: ${metrics.disk}%, Network: ${metrics.network} Mbps`);
  res.json({
    cpu: metrics.cpu,
    memory: metrics.memory,
    disk: metrics.disk,
    network: metrics.network // in Mbps (Linux only), 0 elsewhere
  });
});

module.exports = router;