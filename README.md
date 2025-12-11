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

## 🔌 API Documentation

The API follows RESTful principles and uses JSON for request/response bodies. All endpoints require appropriate authentication unless otherwise specified.

### Base URL
- **Development**: `http://localhost:5000`
- **Production**: `https://testapi.amritaiedc.site`

### Common Headers
```javascript
{
  "Content-Type": "application/json",
  "X-Allowed-Origin": "savishkaara.in" // Required in production
}
```

---

## 🔐 Authentication Endpoints

### Login
Authenticate a user and create a session.

**Endpoint:** `POST /login-auth`

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Success Response (200 OK):**
```json
{
  "message": "Login successful",
  "objectID": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "gender": "male",
  "department": "CSE",
  "role": "admin"
}
```

**Password Reset Required (200 OK):**
```json
{
  "redirectToUpdatePassword": true,
  "objectID": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "gender": "male",
  "department": "CSE",
  "role": "coor"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "error": "Invalid username or password"
}
```

---

### Check Authentication Status
Verify if the current session is authenticated.

**Endpoint:** `GET /check-auth`

**Success Response (200 OK):**
```json
{
  "isAuthenticated": true,
  "objectID": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "gender": "male",
  "department": "CSE",
  "role": "admin"
}
```

**Unauthenticated Response (200 OK):**
```json
{
  "isAuthenticated": false
}
```

---

### Update Password
Update user password (typically after first login).

**Endpoint:** `POST /update-password`

**Authentication:** Required (Session-based)

**Request Body:**
```json
{
  "password": "newSecurePassword123"
}
```

**Success Response (200 OK):**
```json
{
  "message": "Password updated successfully"
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "User not found"
}
```

---

### Logout
End the current user session.

**Endpoint:** `POST /logout`

**Authentication:** Required

**Success Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

---

## 🎉 Event Management Endpoints

### Get All Events
Retrieve list of all events with basic information.

**Endpoint:** `GET /events`

**Success Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Tech Fest 2025",
    "venue": "Main Auditorium",
    "coordinators": ["John Doe", "Jane Smith"],
    "status": "upcoming",
    "date_time": "2025-12-20T10:00:00.000Z"
  }
]
```

---

### Get Event by ID
Retrieve detailed information about a specific event.

**Endpoint:** `GET /events/:eventId`

**Parameters:**
- `eventId` (string, required): MongoDB ObjectId of the event

**Success Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Tech Fest 2025",
  "venue": "Main Auditorium",
  "date_time": "2025-12-20T10:00:00.000Z",
  "fee": 500,
  "coordinators": ["John Doe", "Jane Smith"],
  "faculty_coordinators": ["Dr. Kumar", "Prof. Sharma"],
  "form_link": "https://forms.example.com/techfest",
  "excel_link": "https://docs.example.com/excel",
  "status": "upcoming"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Invalid event ID"
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Event not found"
}
```

---

### Get Event by Name
Retrieve event details by event name.

**Endpoint:** `GET /events/by-name/:name`

**Parameters:**
- `name` (string, required): Event name

**Success Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Tech Fest 2025",
  "venue": "Main Auditorium",
  "date_time": "2025-12-20T10:00:00.000Z",
  "fee": 500,
  "coordinators": ["John Doe", "Jane Smith"],
  "faculty_coordinators": ["Dr. Kumar", "Prof. Sharma"],
  "status": "upcoming"
}
```

---

### Get Events by Coordinator
Retrieve all events managed by a specific coordinator.

**Endpoint:** `GET /events/by-coordinator/:username`

**Parameters:**
- `username` (string, required): Coordinator's username

**Success Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Tech Fest 2025",
    "venue": "Main Auditorium",
    "coordinators": ["johncoord"],
    "faculty_coordinators": ["Dr. Kumar"],
    "status": "upcoming"
  }
]
```

**Error Response (404 Not Found):**
```json
{
  "error": "No events found for this username",
  "details": "Username 'john' not found in coordinators or faculty coordinators"
}
```

---

### Create Event
Add a new event to the system.

**Endpoint:** `POST /addEvent`

**Authentication:** Required (Admin/Super role)

**Request Body:**
```json
{
  "name": "Tech Fest 2025",
  "venue": "Main Auditorium",
  "dateAndTime": "2025-12-20T10:00:00.000Z",
  "fee": 500,
  "coordinators": ["John Doe", "Jane Smith"],
  "facultyCoordinators": ["Dr. Kumar", "Prof. Sharma"],
  "registrationLink": "https://forms.example.com/techfest",
  "excelLink": "https://docs.example.com/excel"
}
```

**Success Response (201 Created):**
```json
{
  "message": "Event added successfully",
  "event": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Tech Fest 2025",
    "venue": "Main Auditorium",
    "date_time": "2025-12-20T10:00:00.000Z",
    "fee": 500,
    "coordinators": ["John Doe", "Jane Smith"],
    "faculty_coordinators": ["Dr. Kumar", "Prof. Sharma"],
    "form_link": "https://forms.example.com/techfest",
    "excel_link": "https://docs.example.com/excel",
    "status": "upcoming"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "All required fields must be provided"
}
```

---

### Update Event Status
Change the status of an event (upcoming, ongoing, completed).

**Endpoint:** `POST /events/update-status-by-name`

**Authentication:** Required

**Request Body:**
```json
{
  "name": "Tech Fest 2025",
  "status": "ongoing"
}
```

**Success Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Tech Fest 2025",
  "status": "ongoing",
  "venue": "Main Auditorium"
}
```

---

### Update Event Details
Update comprehensive event information.

**Endpoint:** `POST /events/update-details-by-name`

**Authentication:** Required

**Request Body:**
```json
{
  "name": "Tech Fest 2025",
  "venue": "New Auditorium",
  "date_time": "2025-12-21T10:00:00.000Z",
  "fee": 600,
  "coordinators": ["John Doe", "Jane Smith", "Bob Wilson"],
  "faculty_coordinators": ["Dr. Kumar"],
  "form_link": "https://forms.example.com/techfest-updated",
  "excel_link": "https://docs.example.com/excel-updated"
}
```

**Success Response (200 OK):**
```json
{
  "message": "Event updated successfully",
  "event": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Tech Fest 2025",
    "venue": "New Auditorium",
    "date_time": "2025-12-21T10:00:00.000Z",
    "fee": 600
  }
}
```

---

### Get Event Summary
Get registration and revenue summary for a specific event.

**Endpoint:** `GET /events/summary/:eventName`

**Parameters:**
- `eventName` (string, required): URL-encoded event name

**Success Response (200 OK):**
```json
{
  "totalRegistrations": 150,
  "totalRevenue": 75000
}
```

---

## 📊 Event Analytics Endpoints

### Get Events Count
Retrieve total and verified registration counts.

**Endpoint:** `GET /events-count`

**Success Response (200 OK):**
```json
{
  "totalRegistrations": 500,
  "verifiedRegistrations": 450
}
```

---

### Get Events Revenue
Calculate revenue for all events.

**Endpoint:** `GET /events-revenue`

**Success Response (200 OK):**
```json
[
  {
    "name": "Tech Fest 2025",
    "revenue": 75000
  },
  {
    "name": "Cultural Night",
    "revenue": 45000
  }
]
```

---

### Get Event Revenue by Name
Get total revenue for a specific event.

**Endpoint:** `GET /events-revenueper/:eventName`

**Parameters:**
- `eventName` (string, required): URL-encoded event name

**Success Response (200 OK):**
```json
{
  "eventName": "Tech Fest 2025",
  "totalRevenue": 75000
}
```

---

### Get Registration Trend
Get registration counts grouped by event.

**Endpoint:** `GET /registration-trend`

**Success Response (200 OK):**
```json
[
  {
    "event": "Tech Fest 2025",
    "count": 150
  },
  {
    "event": "Cultural Night",
    "count": 90
  }
]
```

---

### Get Top Events
Retrieve top 5 events by registration count.

**Endpoint:** `GET /top-events`

**Success Response (200 OK):**
```json
[
  {
    "event": "Tech Fest 2025",
    "count": 150
  },
  {
    "event": "Cultural Night",
    "count": 90
  }
]
```

---

### Get Ongoing Events
Retrieve all currently ongoing events.

**Endpoint:** `GET /ongoing-events`

**Success Response (200 OK):**
```json
[
  {
    "name": "Tech Fest 2025",
    "venue": "Main Auditorium"
  }
]
```

---

## 🎫 Event Registration Endpoints

### Get All Event Registrations
Retrieve all event registrations.

**Endpoint:** `GET /event-registrations`

**Success Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "ticket_number": "TKT001",
    "timestamp": "2025-12-15T10:30:00.000Z",
    "ticket_details": {
      "event": "Tech Fest 2025",
      "amount": "500"
    },
    "verified": true
  }
]
```

---

### Delete Event Registration
Remove a specific registration.

**Endpoint:** `POST /delete-event-registrations/:id`

**Parameters:**
- `id` (string, required): MongoDB ObjectId of the registration

**Success Response (200 OK):**
```json
{
  "message": "Registration deleted successfully",
  "deletedId": "507f1f77bcf86cd799439011"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Invalid registration ID format"
}
```

---

### Request Ticket Generation
Forward ticket generation request to ticket service.

**Endpoint:** `POST /request_ticket`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "event": "Tech Fest 2025",
  "amount": 500
}
```

**Success Response:** Forwards response from ticket generation service

---

### Verify Ticket
Mark participant attendance for an event.

**Endpoint:** `POST /verify-ticket`

**Request Body:**
```json
{
  "ticketID": "TKT001"
}
```

**Success Response (200 OK):**
```json
{
  "message": "Participant attendance marked successfully"
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Participant not found"
}
```

---

## 👥 User Management Endpoints

### Get Coordinators
Retrieve all users with coordinator role.

**Endpoint:** `GET /coordinators`

**Success Response (200 OK):**
```json
{
  "coordinators": [
    {
      "name": "John Doe",
      "username": "johndoe"
    },
    {
      "name": "Jane Smith",
      "username": "janesmith"
    }
  ]
}
```

---

### Get Distinct Events
Retrieve list of all unique event names.

**Endpoint:** `GET /distinctEvents`

**Success Response (200 OK):**
```json
{
  "events": [
    "Tech Fest 2025",
    "Cultural Night",
    "Sports Day"
  ]
}
```

---

### Add User
Create a new user account.

**Endpoint:** `POST /addUser`

**Authentication:** Required (Admin/Super role)

**Request Body (Admin/Super):**
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "gender": "male",
  "role": "admin",
  "mobile": "9876543210",
  "dept": "CSE"
}
```

**Request Body (Coordinator):**
```json
{
  "name": "Jane Smith",
  "username": "janesmith",
  "gender": "female",
  "role": "coor",
  "mobile": "9876543211",
  "event_relation": "Tech Fest 2025"
}
```

**Success Response (201 Created):**
```json
{
  "message": "User added successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "username": "johndoe",
    "mobile": 9876543210,
    "role": "admin",
    "dept": "CSE",
    "status": -1,
    "gender": "male"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Name, username, gender, role, and mobile are required."
}
```

**Error Response (400 Bad Request - Duplicate):**
```json
{
  "error": "User already exists"
}
```

---

### Get User Details
Retrieve details for all admins and coordinators.

**Endpoint:** `GET /overview/details`

**Success Response (200 OK):**
```json
{
  "users": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "role": "admin",
      "event_relation": "none",
      "mobile": "9876543210"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Jane Smith",
      "role": "coor",
      "event_relation": "Tech Fest 2025",
      "mobile": "9876543211"
    }
  ]
}
```

---

### Get Departments by Names
Retrieve department information for multiple users.

**Endpoint:** `POST /users/depts-by-name`

**Request Body:**
```json
{
  "names": ["John Doe", "Jane Smith", "Bob Wilson"]
}
```

**Success Response (200 OK):**
```json
{
  "John Doe": "CSE",
  "Jane Smith": "ECE",
  "Bob Wilson": "ME"
}
```

---

### Reset User Status
Reset user status and password to default.

**Endpoint:** `POST /overview/reset-status/:mobile`

**Parameters:**
- `mobile` (string, required): User's mobile number

**Success Response (200 OK):**
```json
{
  "message": "Status reset and password updated for 9876543210"
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "User not found"
}
```

---

## 🖥️ System Monitoring Endpoints

### Get Server Status
Retrieve comprehensive server health metrics.

**Endpoint:** `GET /status`

**Success Response (200 OK):**
```json
{
  "status": "online",
  "uptime": "2d 5h 30m",
  "cpu": {
    "usage": 45.2,
    "cores": 8
  },
  "memory": {
    "total": 16384,
    "used": 8192,
    "free": 8192,
    "usagePercent": 50
  },
  "process": {
    "cpu": 12.5,
    "memory": 256
  }
}
```

---

### Update Server Status
Change server operational mode.

**Endpoint:** `POST /update-server-status`

**Authentication:** Required (Admin/Super role)

**Request Body:**
```json
{
  "status": "restricted"
}
```

**Allowed Values:**
- `online` - Full access to all pages
- `restricted` - Limited access to specific pages only
- `offline` - API only, all pages blocked

**Success Response (200 OK):**
```
Status code 200 with no body
```

---

## 🔌 WebSocket Events

The application uses Socket.io for real-time communication.

### Connection
Client connects to WebSocket server.

**Event:** `connection`

**Server acknowledges:**
```javascript
socket.emit('connected', { message: 'Connected to WebSocket server' });
```

---

### Room Updates
Subscribe to specific room for updates.

**Event:** `join-room`

**Emit:**
```javascript
socket.emit('join-room', { room: 'dashboard' });
```

**Available Rooms:**
- `dashboard` - Main dashboard updates
- `samridhi` - Samridhi event updates
- `server` - Server status updates
- `eventso` - Events overview updates
- `eventsa` - Events admin updates
- `userso` - Users overview updates
- `usersa` - Users admin updates
- `vevents` - Verified events updates
- `myevent` - Individual event updates

---

### Receive Updates
Listen for real-time updates in subscribed room.

**Event:** `update`

**Server emits:**
```javascript
socket.on('update', (data) => {
  // Handle update data
  console.log('Received update:', data);
});
```

---

## 📝 Error Responses

All error responses follow a consistent format:

```json
{
  "error": "Human-readable error message",
  "details": "Technical details (optional)"
}
```

### Common HTTP Status Codes

- **200 OK** - Request successful
- **201 Created** - Resource created successfully
- **400 Bad Request** - Invalid request parameters
- **401 Unauthorized** - Authentication required or failed
- **403 Forbidden** - Insufficient permissions
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server error

---

## 🔑 Authentication & Authorization

### Session-Based Authentication
The API uses Express sessions with HTTP-only cookies. After successful login, a session is created and maintained through cookies.

### Role-Based Access Control (RBAC)

**Roles:**
- `super` - Full system access, can manage all resources
- `admin` - Administrative access, can manage events and users
- `coor` / `coordinator` - Limited access to assigned events only

**Protected Endpoints:**
All endpoints except `/login-auth` and `/check-auth` require authentication.

### Required Session Variables
- `objectID` - User's MongoDB ObjectId
- `username` - User's username
- `user_role` - User's role (super/admin/coor)
- `name` - User's full name
- `department` - User's department
- `event` - Assigned event (for coordinators)
- `gender` - User's gender

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
- **Akshay Sunith** - *Intial Work* - [Thanasis504](https://github.com/Thanasis504)
- **Chinmay Shashedaran** - *Initial work* - [Obito8010](https://github.com/obito8010)

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
