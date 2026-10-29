import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import UserLayout from "./comp/Layout/UserLayout";
import Home from "./pages/Home";
import { CartProvider } from "./comp/Layout/CartContext";
import ExplorePage from "./option/explorePage";
import Resume from "./ResumeBuilder/ResumeMain/Resume";
import JobListings from "./Job/JobListings";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";

// Check authentication using backend login data
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  if (!token || !savedUser) {
    return false;
  }

  try {
    const user = JSON.parse(savedUser);
    return Boolean(user && user.email);
  } catch {
    return false;
  }
};

// Protect routes that require login
const ProtectedRoute = () => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

// Redirect logged-in users away from Login/Signup
const GuestRoute = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />

            <Route path="explore" element={<ExplorePage />} />
            <Route path="jobs" element={<JobListings />} />

            <Route
              path="login"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />

            <Route
              path="signup"
              element={
                <GuestRoute>
                  <Signup />
                </GuestRoute>
              }
            />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<Dashboard />} />

              <Route
                path="profile"
                element={<Navigate to="/dashboard" replace />}
              />

              <Route path="resume-builder" element={<Resume />} />
            </Route>

            {/* Unknown routes */}
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;