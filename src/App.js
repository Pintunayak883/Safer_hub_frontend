import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

// Components
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ErrorBoundary from "./components/common/ErrorBoundary";

// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import SafetyTools from "./pages/SafetyTools";
import CommunityForum from "./pages/CommunityForum";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import useSocket from "./hooks/useSocket";

// Redux
import { checkAuthStatus } from "./store/slices/authSlice";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const { isDarkMode } = useSelector((state) => state.theme);
  const { socket } = useSocket();

  useEffect(() => {
    // Check authentication status on app load
    dispatch(checkAuthStatus());
  }, [dispatch]);

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Initialize socket connection when authenticated
    if (isAuthenticated && socket) {
      socket.emit("join-user-room", localStorage.getItem("userId"));
    }
  }, [isAuthenticated, socket]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4,
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar />

        <div className="flex">
          {isAuthenticated && <Sidebar />}

          <main
            className={`flex-1 ${
              isAuthenticated ? "ml-64" : ""
            } transition-all duration-300`}
          >
            <AnimatePresence mode="wait">
              <Routes>
                {/* Public Routes */}
                <Route
                  path="/"
                  element={
                    <motion.div
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <Home />
                    </motion.div>
                  }
                />
                <Route
                  path="/login"
                  element={
                    isAuthenticated ? (
                      <Navigate to="/dashboard" replace />
                    ) : (
                      <motion.div
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                      >
                        <Login />
                      </motion.div>
                    )
                  }
                />
                <Route
                  path="/register"
                  element={
                    isAuthenticated ? (
                      <Navigate to="/dashboard" replace />
                    ) : (
                      <motion.div
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                      >
                        <Register />
                      </motion.div>
                    )
                  }
                />

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    isAuthenticated ? (
                      <motion.div
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                      >
                        <Dashboard />
                      </motion.div>
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                <Route
                  path="/safety-tools"
                  element={
                    isAuthenticated ? (
                      <motion.div
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                      >
                        <SafetyTools />
                      </motion.div>
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                <Route
                  path="/community"
                  element={
                    isAuthenticated ? (
                      <motion.div
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                      >
                        <CommunityForum />
                      </motion.div>
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                <Route
                  path="/reports"
                  element={
                    isAuthenticated ? (
                      <motion.div
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                      >
                        <Reports />
                      </motion.div>
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                <Route
                  path="/profile"
                  element={
                    isAuthenticated ? (
                      <motion.div
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                      >
                        <Profile />
                      </motion.div>
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                <Route
                  path="/settings"
                  element={
                    isAuthenticated ? (
                      <motion.div
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                      >
                        <Settings />
                      </motion.div>
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />

                {/* 404 Route */}
                <Route
                  path="*"
                  element={
                    <motion.div
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <NotFound />
                    </motion.div>
                  }
                />
              </Routes>
            </AnimatePresence>
          </main>
        </div>

        <Footer />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: isDarkMode ? "#374151" : "#fff",
              color: isDarkMode ? "#f9fafb" : "#111827",
              border: isDarkMode ? "1px solid #4b5563" : "1px solid #e5e7eb",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#4ade80",
                secondary: "#fff",
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
