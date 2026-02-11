import React from "react";
import { motion } from "framer-motion";
import {
  FiShield,
  FiMapPin,
  FiBell,
  FiHeart,
  FiUsers,
  FiTrendingUp,
  FiAlertTriangle,
  FiCheckCircle,
  FiLock,
  FiEye,
} from "react-icons/fi";
import SafeRouteTool from "../components/safety/SafeRouteTool";

const SafetyTools = () => {
  const tools = [
    {
      title: "Whisper Alert Chain",
      description:
        "Silently share your location with trusted contacts. Auto-escalates if no response.",
      icon: FiBell,
      color: "text-primary-600",
      bgColor: "bg-primary-100 dark:bg-primary-900",
      features: [
        "Silent location sharing",
        "Auto-escalation",
        "Trusted contacts",
        "Real-time alerts",
      ],
      status: "Available",
    },
    {
      title: "Shadow Report Vault",
      description:
        "Anonymous encrypted vault for logging incidents with voice-to-text transcription.",
      icon: FiLock,
      color: "text-secondary-600",
      bgColor: "bg-secondary-100 dark:bg-secondary-900",
      features: [
        "Anonymous reporting",
        "Voice transcription",
        "Pattern analysis",
        "Encrypted storage",
      ],
      status: "Available",
    },
    {
      title: "Pulse Check Scheduler",
      description:
        "Random safety check-ins with gamified streaks and community heatmaps.",
      icon: FiHeart,
      color: "text-success-600",
      bgColor: "bg-success-100 dark:bg-success-900",
      features: [
        "Random check-ins",
        "Safety streaks",
        "Community heatmap",
        "Gamification",
      ],
      status: "Available",
    },
    {
      title: "Guardian Profile Sync",
      description:
        "Sync safety settings with loved ones using affirmation locks for security.",
      icon: FiUsers,
      color: "text-warning-600",
      bgColor: "bg-warning-100 dark:bg-warning-900",
      features: [
        "Profile syncing",
        "Affirmation locks",
        "Safety settings",
        "Family integration",
      ],
      status: "Available",
    },
    {
      title: "Echo Forum Threads",
      description:
        "Community support with AI-powered similar story suggestions for empathy.",
      icon: FiTrendingUp,
      color: "text-danger-600",
      bgColor: "bg-danger-100 dark:bg-danger-900",
      features: [
        "Community support",
        "AI suggestions",
        "Anonymous sharing",
        "Empathy building",
      ],
      status: "Available",
    },
    {
      title: "Emergency Quick Actions",
      description: "One-tap emergency features for immediate safety response.",
      icon: FiAlertTriangle,
      color: "text-primary-600",
      bgColor: "bg-primary-100 dark:bg-primary-900",
      features: [
        "One-tap alerts",
        "Emergency contacts",
        "Location sharing",
        "Quick response",
      ],
      status: "Available",
    },
  ];

  const quickActions = [
    {
      title: "Send Emergency Alert",
      description: "Immediately alert your trusted contacts",
      icon: FiBell,
      action: "emergency",
      color: "bg-danger-500 hover:bg-danger-600",
    },
    {
      title: "Share Location",
      description: "Share your current location with contacts",
      icon: FiMapPin,
      action: "location",
      color: "bg-primary-500 hover:bg-primary-600",
    },
    {
      title: "Safety Check-in",
      description: "Quick safety status check",
      icon: FiCheckCircle,
      action: "checkin",
      color: "bg-success-500 hover:bg-success-600",
    },
    {
      title: "Report Incident",
      description: "Report a safety incident anonymously",
      icon: FiEye,
      action: "report",
      color: "bg-warning-500 hover:bg-warning-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Safety Tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comprehensive safety features designed specifically for women. Stay
            protected with our innovative tools and real-time support.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className={`${action.color} text-white p-6 rounded-xl shadow-medium hover:shadow-hard transition-all duration-300 transform hover:scale-105`}
                >
                  <Icon className="w-8 h-8 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                  <p className="text-sm opacity-90">{action.description}</p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Safe Route Tool */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <SafeRouteTool />
        </motion.div>

        {/* Safety Tools Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Available Tools
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="card p-8 hover:shadow-medium transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`w-16 h-16 ${tool.bgColor} rounded-xl flex items-center justify-center`}
                    >
                      <Icon className={`w-8 h-8 ${tool.color}`} />
                    </div>
                    <span className="badge badge-success">{tool.status}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {tool.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Key Features:
                    </h4>
                    <ul className="space-y-2">
                      {tool.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                        >
                          <FiCheckCircle className="w-4 h-4 text-success-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-3">
                    <button className="btn btn-primary flex-1">Use Tool</button>
                    <button className="btn btn-outline">Learn More</button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Safety Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <div className="card p-8 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700">
            <div className="text-center">
              <FiShield className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Safety First
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                Remember to always trust your instincts and use these tools as
                part of a comprehensive safety strategy. Your safety is our
                priority.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn btn-primary">Safety Guide</button>
                <button className="btn btn-outline">Emergency Contacts</button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SafetyTools;
