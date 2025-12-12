import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Box } from "@mui/material";
import MetricCard from "../components/metricCard";
import Cookies from "js-cookie";
import { WebSocketContext } from "../App";
import Room from "../utils/roomManager";
import Layout from "../layouts/layout";

// Mini spark bar component
const MiniSparkBar = ({ value, color }) => {
  const width = Math.min(100, Math.max(0, value));
  return (
    <Box
      sx={{
        width: "100%",
        height: 20,
        backgroundColor: "rgba(255,255,255,0.15)",
        borderRadius: "4px",
        overflow: "hidden",
        mt: 1,
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: `${width}%`,
          backgroundColor: color,
          borderRadius: "4px",
          transition: "width 0.6s ease",
        }}
      />
    </Box>
  );
};

const Health = () => {
  const navigate = useNavigate();
  const socket = useContext(WebSocketContext);
  const objID = Cookies.get("objId");
  const [socketError, setSocketError] = useState(null);

  const [cpu, setCpu] = useState(0);
  const [memory, setMemory] = useState(0);
  const [disk, setDisk] = useState(0);
  const [network, setNetwork] = useState(0);

  const apiBaseURL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_API_URL || "https://testapi.amritaiedc.site"
      : process.env.REACT_APP_API_URL || "http://localhost:5000";

  const fetchHealthData = async () => {
    try {
      const response = await fetch(`${apiBaseURL}/health`, {
        method: "GET",
        headers: {
          "X-Allowed-Origin": "savishkaara.in",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch health data");
      const data = await response.json();

      setCpu(data.cpu || 0);
      setMemory(data.memory || 0);
      setDisk(data.disk || 0);
      setNetwork(data.network || 0);
    } catch (error) {
      console.error("Error fetching health ", error);
    }
  };

  useEffect(() => {
    document.title = "Server Health";
  }, []);

  useEffect(() => {
    let hasJoinedRoom = false;

    if (socket && !hasJoinedRoom) {
      Room.join(socket, "health", objID);
      hasJoinedRoom = true;

      socket.on("message", (data) => {
        console.log("Message:", data);
      });

      socket.on("health-update", (metrics) => {
        if (metrics.cpu !== undefined) setCpu(metrics.cpu);
        if (metrics.memory !== undefined) setMemory(metrics.memory);
        if (metrics.disk !== undefined) setDisk(metrics.disk);
        if (metrics.network !== undefined) setNetwork(metrics.network);
      });

      socket.on("redirect", (data) => {
        navigate(data.url);
      });

      socket.on("error", (error) => {
        console.error("Socket error:", error.message);
        setSocketError(error.message);
      });
    }

    fetchHealthData();
    const interval = setInterval(fetchHealthData, 10000);

    return () => {
      clearInterval(interval);
      if (hasJoinedRoom) {
        socket.emit("leave-room", "health");
      }
      socket.off("message");
      socket.off("health-update");
      socket.off("redirect");
      socket.off("error");
    };
  }, [socket, objID, navigate]);

  const getTrend = (value) => {
    if (value > 80) return "down";
    if (value > 50) return "stable";
    return "up";
  };

  return (
    <Layout title="Health" activePage="health">
      {socketError && (
        <Typography variant="body1" color="error" sx={{ ml: 2, mt: 2 }}>
          Error: {socketError}
        </Typography>
      )}

      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Server Health Metrics
        </Typography>

        <Grid container spacing={3}>
          {/* CPU */}
          <Grid item xs={12} md={6}>
            <MetricCard
              title={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src="/icons/developer_board_24dp_EFEFEF_FILL0_wght400_GRAD0_opsz24.svg"
                    alt="CPU"
                    width="20"
                    height="20"
                    style={{ marginRight: "12px" }}
                  />
                  CPU Usage
                </Box>
              }
              value={`${cpu}%`}
              trend={getTrend(cpu)}
              bgColor="#ff6f61"
              height="22vh"
            >
              <MiniSparkBar value={cpu} color="rgba(255,255,255,0.85)" />
            </MetricCard>
          </Grid>

          {/* Memory */}
          <Grid item xs={12} md={6}>
            <MetricCard
              title={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src="/icons/memory_24dp_EFEFEF_FILL0_wght400_GRAD0_opsz24.svg"
                    alt="Memory"
                    width="20"
                    height="20"
                    style={{ marginRight: "12px" }}
                  />
                  Memory Usage
                </Box>
              }
              value={`${memory}%`}
              trend={getTrend(memory)}
              bgColor="#4ecdc4"
              height="22vh"
            >
              <MiniSparkBar value={memory} color="rgba(255,255,255,0.85)" />
            </MetricCard>
          </Grid>

          {/* Disk */}
          <Grid item xs={12} md={6}>
            <MetricCard
              title={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src="/icons/hard_disk_24dp_EFEFEF_FILL0_wght400_GRAD0_opsz24.svg"
                    alt="Disk"
                    width="20"
                    height="20"
                    style={{ marginRight: "12px" }}
                  />
                  Disk Usage
                </Box>
              }
              value={`${disk}%`}
              trend={getTrend(disk)}
              bgColor="#45b7d1"
              height="22vh"
            >
              <MiniSparkBar value={disk} color="rgba(255,255,255,0.85)" />
            </MetricCard>
          </Grid>

          {/* Network */}
          <Grid item xs={12} md={6}>
            <MetricCard
              title={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src="/icons/lan_24dp_EFEFEF_FILL0_wght400_GRAD0_opsz24.svg"
                    alt="Network"
                    width="20"
                    height="20"
                    style={{ marginRight: "12px" }}
                  />
                  Network Load
                </Box>
              }
              value={`${network} Mbps`}
              trend={getTrend(network)}
              bgColor="#96ceb4"
              height="22vh"
            >
              <MiniSparkBar value={network} color="rgba(255,255,255,0.85)" />
            </MetricCard>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Health;