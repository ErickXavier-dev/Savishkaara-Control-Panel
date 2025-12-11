# Savishkaara Control Panel

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18.2-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green.svg)](https://www.mongodb.com/)

A comprehensive administrative control panel for event management, user administration, and real-time system monitoring. Built with React, Node.js, Express, and MongoDB.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Environment Variables](#-environment-variables)
- [Security Features](#-security-features)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Event Management
- **Event Creation & Management**: Create, update, and delete events
- **Event Registration System**: Handle participant registrations
- **Event Overview Dashboard**: Monitor all events at a glance
- **Event Coordinator Panel**: Specialized view for event coordinators

### User Management
- **User Authentication**: Secure login and session management
- **Role-Based Access Control**: Different access levels (admin, coordinator, etc.)
- **User Overview**: Comprehensive user management dashboard
- **Bulk User Operations**: Add and manage multiple users efficiently

### Real-Time Features
- **Live Dashboard Updates**: Real-time metrics and statistics via WebSocket
- **System Monitoring**: Track server health, CPU, memory usage, and uptime
- **Live Event Updates**: Automatic updates for event changes
- **Room Management**: Real-time room allocation and updates

### Administrative Tools
- **Server Status Control**: Dynamic server mode switching (online, restricted, offline)
- **Email Management**: Built-in mailing system
- **Analytics Dashboard**: Visualizations with charts and graphs
- **Samridhi Integration**: Special module for Samridhi event management

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18.2
- **UI Components**: Material-UI (MUI)
- **Routing**: React Router DOM
- **Real-time Communication**: Socket.io Client
- **Charts & Visualizations**: 
  - Chart.js with React-Chartjs-2
  - D3.js
  - Recharts
- **Animations**: React Spring
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Build Tool**: Next.js 14

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Real-time**: Socket.io
- **Authentication**: Express Session with bcryptjs
- **File Upload**: Multer
- **System Monitoring**: 
  - pidusage
  - systeminformation
- **Security**: CORS, HTTPS enforcement

### Development Tools
- **Process Management**: Concurrently, Nodemon
- **Linting**: ESLint
- **Environment Management**: dotenv

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend (React)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  Dashboard   │  │    Events    │  │    Users     │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                          │                              │
│                   WebSocket / REST API                  │
└──────────────────────────┬──────────────────────────────┘
                           │
┌──────────────────────────┴──────────────────────────────┐
│                  Backend (Express.js)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │     Auth     │  │    Events    │  │  Real-time   │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                          │                              │
└──────────────────────────┬──────────────────────────────┘
                           │
                    ┌──────┴──────┐
                    │   MongoDB   │
                    └─────────────┘
```

## 📦 Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher
- **MongoDB**: v6.0 or higher (local or cloud instance)
- **Git**: For version control

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ErickXavier-dev/Savishkaara-Control-Panel.git
cd Savishkaara-Control-Panel
```

### 2. Install Dependencies

Install root dependencies:
```bash
npm install
```

Install backend dependencies:
```bash
cd backend
npm install
cd ..
```

Install frontend dependencies:
```bash
cd frontend
npm install
cd ..
```

**Or use the convenient update script:**
```bash
npm run update
```

## ⚙️ Configuration

### 1. Backend Configuration

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/savishkaara
# Or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/savishkaara

# Session Configuration
COOKIE_NAME=savishkaara_session
SESSION_SECRET=your-secure-session-secret-here

# CORS Origins (comma-separated)
ALLOWED_ORIGINS=http://localhost:3000,https://control.savishkaara.in

# Production Settings (if applicable)
# FORCE_HTTPS=true
```

### 2. Frontend Configuration

Create a `.env` file in the `frontend` directory:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000
REACT_APP_PROD_API_URL=https://testapi.amritaiedc.site

# WebSocket Configuration
REACT_APP_SOCKET_URL=http://localhost:5000
```

### 3. MongoDB Setup

Ensure MongoDB is running:

**Local MongoDB:**
```bash
mongod --dbpath /path/to/your/data/directory
```

**Or use MongoDB Atlas** (cloud) and update the `MONGO_URI` in your `.env` file.

## 🏃 Running the Application

### Development Mode

**Run both frontend and backend concurrently:**
```bash
npm start
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:3000`

**Run backend only:**
```bash
npm run server
```

**Run frontend only:**
```bash
npm run client
```

### Production Mode

**Build and run in production:**
```bash
npm run test
```

This will:
1. Set `NODE_ENV=production` for the backend
2. Build the frontend for production
3. Serve the built frontend using `serve`

## 📁 Project Structure

```
Savishkaara-Control-Panel/
├── backend/                      # Backend application
│   ├── db/
│   │   └── mongodb.js           # MongoDB connection setup
│   ├── models/                  # Mongoose models
│   │   ├── event_registration.js
│   │   ├── events.js
│   │   └── User.js
│   ├── routes/                  # API routes
│   │   ├── addusers.js         # User creation routes
│   │   ├── auth.js             # Authentication routes
│   │   ├── eventManager.js     # Event management routes
│   │   ├── realTime.js         # Real-time WebSocket handlers
│   │   ├── roomUpdater.js      # Room management
│   │   ├── userOVERVIEW.js     # User overview routes
│   │   ├── users.js            # User management routes
│   │   └── verify.js           # Verification routes
│   ├── server.js               # Express server entry point
│   └── package.json
│
├── frontend/                    # Frontend application
│   ├── public/                 # Static files
│   │   ├── icons/
│   │   ├── images/
│   │   └── profile/
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── blurText.js
│   │   │   ├── header.js
│   │   │   ├── metricCard.js
│   │   │   ├── metricCardData.js
│   │   │   ├── sidebar.js
│   │   │   └── visualizationCard.js
│   │   ├── css/                # Component styles
│   │   ├── layouts/            # Layout components
│   │   │   └── layout.js
│   │   ├── pages/              # Page components
│   │   │   ├── addEvent.js
│   │   │   ├── addUser.js
│   │   │   ├── dashboard.js
│   │   │   ├── eventOverview.js
│   │   │   ├── eventReg.js
│   │   │   ├── forbidden.js
│   │   │   ├── login.js
│   │   │   ├── mailer.js
│   │   │   ├── myEvent.js
│   │   │   ├── samridhi.js
│   │   │   ├── server.js
│   │   │   ├── updatePassword.js
│   │   │   └── userOverview.js
│   │   ├── utils/              # Utility functions
│   │   │   ├── roomManager.js
│   │   │   └── socketConnector.js
│   │   ├── App.js              # Main application component
│   │   └── index.js            # React entry point
│   └── package.json
│
├── package.json                # Root package.json
├── LICENSE                     # MIT License
└── README.md                   # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /check-auth` - Check authentication status
- `POST /update-password` - Update user password

### Events
- `GET /events` - Get all events
- `POST /events` - Create new event
- `GET /events/:id` - Get event by ID
- `PUT /events/:id` - Update event
- `DELETE /events/:id` - Delete event
- `GET /event-registrations` - Get event registrations

### Users
- `GET /users` - Get all users
- `POST /users` - Create new user
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `GET /users/overview` - Get user statistics

### System Monitoring
- `GET /status` - Get server status and metrics
- `POST /update-server-status` - Update server mode (admin only)

### Real-time (WebSocket)
- `connection` - Establish WebSocket connection
- `disconnect` - Handle client disconnect
- Real-time event and room updates

## 🔐 Environment Variables

### Backend (.env)

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | 5000 |
| `NODE_ENV` | Environment (development/production) | No | development |
| `MONGO_URI` | MongoDB connection string | Yes | - |
| `COOKIE_NAME` | Session cookie name | No | default |
| `SESSION_SECRET` | Session encryption secret | Yes (auto-generated) | - |
| `ALLOWED_ORIGINS` | CORS allowed origins | No | - |

### Frontend (.env)

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `REACT_APP_API_URL` | Backend API URL (dev) | Yes | http://localhost:5000 |
| `REACT_APP_PROD_API_URL` | Backend API URL (prod) | Yes | - |
| `REACT_APP_SOCKET_URL` | WebSocket server URL | Yes | http://localhost:5000 |

## 🔒 Security Features

1. **HTTPS Enforcement**: Automatic redirect to HTTPS in production
2. **Session Management**: Secure session handling with HTTP-only cookies
3. **Password Hashing**: bcryptjs for password encryption
4. **CORS Protection**: Configurable CORS policy
5. **Origin Validation**: Custom origin header validation
6. **Role-Based Access Control**: Different permission levels
7. **Protected Routes**: Authentication-required routes in frontend
8. **Server Mode Control**: Restrict access during maintenance

## 💻 Development

### Available Scripts

#### Root Level
- `npm start` - Run both frontend and backend
- `npm run server` - Run backend only
- `npm run client` - Run frontend only
- `npm run update` - Install all dependencies
- `npm run test` - Run production build and test

#### Backend
- `npm start` - Start production server
- `npm run demo` - Start development server with nodemon

#### Frontend
- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm start` - Run Next.js development server
- `npm run start:prod` - Run production server

### Code Style

This project uses ESLint for code quality. Run linting with:
```bash
npm run lint
```

### Adding New Features

1. **Create a new route** in `backend/routes/`
2. **Add model** if needed in `backend/models/`
3. **Create page component** in `frontend/src/pages/`
4. **Update routing** in `frontend/src/App.js`
5. **Add to sidebar** if needed in `frontend/src/components/sidebar.js`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Erick Xavier** - *Initial work* - [ErickXavier-dev](https://github.com/ErickXavier-dev)
- **Meenakshi B** - *Intial work* - [Meenakshi2002-26](https://github.com/Meenakshi2002-28)
- **Akshay Sunith** - *Intial Work* - [Thanasis504] (https://github.com/Thanasis504)
- **Chinmay Shashedaran** - *Initial work* -[Obito8010] (https://github.com/obito8010)

## 🙏 Acknowledgments

- Material-UI for the component library
- MongoDB team for the excellent database
- Socket.io for real-time functionality
- All contributors who have helped shape this project

## 📞 Support

For support, email: [support@savishkaara.in](mailto:support@savishkaara.in)

## 🔗 Links

- **Repository**: [https://github.com/ErickXavier-dev/Savishkaara-Control-Panel](https://github.com/ErickXavier-dev/Savishkaara-Control-Panel)
- **Production**: [https://control.savishkaara.in](https://control.savishkaara.in)
- **API Documentation**: Coming soon

---

**Made with ❤️ by the Savishkaara Team**
