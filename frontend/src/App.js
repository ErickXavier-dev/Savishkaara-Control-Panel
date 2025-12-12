// App.js
import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { createSocketConnection } from "./utils/socketConnector"; // Import the WebSocket connection logic

// Import Pages
import Login from "./pages/login";
import UpdatePassword from "./pages/updatePassword";
import Dashboard from "./pages/dashboard";
import EventOverview from "./pages/eventOverview";
import AddEvent from "./pages/addEvent";
import Events from "./pages/eventOverview";
import MyEvent from "./pages/myEvent";
import Mailer from "./pages/mailer";
import UserOverview from "./pages/userOverview";
import AddUser from "./pages/addUser";
import Health from "./pages/health";
import Domain from "./pages/domain";
import Samridhi from "./pages/samridhi";
import ControlPane from "./pages/controlpanel";
import APITicket from "./pages/api-ticket";
import APICert from "./pages/api-certificate";
import APIForms from "./pages/api-forms";
import APIAtten from "./pages/api-attendance";
import ForbiddenPage from "./pages/forbidden"; // Import the 403 page component
import Cookies from "js-cookie"; // make sure it's imported
import EventReg from "./pages/eventReg"; 


// Function to check authentication status
const checkAuth = async () => {
  const apiBaseURL = process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_API_URL || "https://testapi.amritaiedc.site"
    : process.env.REACT_APP_API_URL || "http://localhost:5000";
    
  try {
    const response = await fetch(`${apiBaseURL}/check-auth`, {
      headers: {'X-Allowed-Origin': 'savishkaara.in'},
      credentials: "include", // Important to send cookies
    });

    if (!response.ok) {
      throw new Error("Failed to fetch authentication status");
    }

    const data = await response.json();
    return data.isAuthenticated;
  } catch (error) {
    console.error("Authentication check failed:", error);
    return false;
  }
};

// ProtectedRoute component to guard authenticated routes
const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    checkAuth().then(setIsAuthenticated);
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show loading while checking auth
  }

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

// Create a WebSocket Context
export const WebSocketContext = createContext();

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize WebSocket connection using the utility function
    const newSocket = createSocketConnection();
    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={socket}>
      <Router>
      <Routes>
  {/* Protected Routes */}
  <Route
    path="/"
    element={
      Cookies.get("role") === "coor"
        ? <Navigate to={`/my-event/${Cookies.get("objId")}`} replace />
        : <ProtectedRoute element={<Dashboard />} />
    }
  />
  <Route path="/update-password" element={<ProtectedRoute element={<UpdatePassword />} />} />
  <Route path="/events/overview" element={<ProtectedRoute element={<EventOverview />} />} />
  <Route path="/events/add" element={<ProtectedRoute element={<AddEvent />} />} />
  <Route path="/events" element={<ProtectedRoute element={<Events />} />} />
  <Route path="/my-event/:eventId" element={<ProtectedRoute element={<MyEvent />} />}/> {/* Dynamic route for Events */}
  <Route path="/Mailer" element={<ProtectedRoute element={<Mailer />} />} />
  <Route path="/samridhi" element={<ProtectedRoute element={<Samridhi />} />} />
  <Route path="/users/overview" element={<ProtectedRoute element={<UserOverview />} />} />
  <Route path="/users/add" element={<ProtectedRoute element={<AddUser />} />} />
  <Route path="/server/health" element={<ProtectedRoute element={<Health />} />} />
  <Route path="/server/domain" element={<ProtectedRoute element={<Domain />} />} />
  <Route path="/server/samridhi" element={<ProtectedRoute element={<Samridhi />} />} />
  <Route path="/server/control-panel" element={<ProtectedRoute element={<ControlPane />} />} />
  <Route path="/server/ticket-api" element={<ProtectedRoute element={<APITicket />} />} />
  <Route path="/server/certi-api" element={<ProtectedRoute element={<APICert />} />} />
  <Route path="/server/forms-api" element={<ProtectedRoute element={<APIForms />} />} />
  <Route path="/server/attendance-api" element={<ProtectedRoute element={<APIAtten />} />} />
  <Route path="/event-registration" element={<ProtectedRoute element={<EventReg />} />} /> {/* Add this line */}

  {/* Public Routes */}
  <Route path="/login" element={<Login />} />
  <Route path="/403" element={<ForbiddenPage />} /> {/* Add the 403 route */}

  {/* Catch-all Route (Optional) */}
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
      </Router>
    </WebSocketContext.Provider>
  );
}

export default App;