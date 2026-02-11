import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiSettings, 
  FiBell, 
  FiShield, 
  FiEye, 
  FiLock, 
  FiTrash2,
  FiDownload,
  FiUpload,
  FiMoon,
  FiSun,
  FiVolume2,
  FiVolumeX
} from 'react-icons/fi';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    emergency: true
  });

  const tabs = [
    { id: 'general', name: 'General', icon: FiSettings },
    { id: 'notifications', name: 'Notifications', icon: FiBell },
    { id: 'privacy', name: 'Privacy', icon: FiShield },
    { id: 'security', name: 'Security', icon: FiLock }
  ];

  const notificationSettings = [
    {
      id: 'email',
      name: 'Email Notifications',
      description: 'Receive updates via email',
      enabled: notifications.email
    },
    {
      id: 'push',
      name: 'Push Notifications',
      description: 'Receive push notifications on your device',
      enabled: notifications.push
    },
    {
      id: 'sms',
      name: 'SMS Notifications',
      description: 'Receive text message alerts',
      enabled: notifications.sms
    },
    {
      id: 'emergency',
      name: 'Emergency Alerts',
      description: 'Critical safety alerts (always enabled)',
      enabled: notifications.emergency,
      disabled: true
    }
  ];

  const privacySettings = [
    {
      name: 'Profile Visibility',
      description: 'Who can see your profile information',
      value: 'Friends Only'
    },
    {
      name: 'Location Sharing',
      description: 'Share location with trusted contacts',
      value: 'Enabled'
    },
    {
      name: 'Activity Status',
      description: 'Show when you were last active',
      value: 'Disabled'
    },
    {
      name: 'Data Collection',
      description: 'Allow anonymous data collection for safety insights',
      value: 'Enabled'
    }
  ];

  const securitySettings = [
    {
      name: 'Two-Factor Authentication',
      description: 'Add an extra layer of security',
      status: 'Enabled'
    },
    {
      name: 'Login Alerts',
      description: 'Get notified of new device logins',
      status: 'Enabled'
    },
    {
      name: 'Session Timeout',
      description: 'Automatically log out after inactivity',
      status: '30 minutes'
    },
    {
      name: 'Password',
      description: 'Last changed 30 days ago',
      status: 'Update'
    }
  ];

  const handleNotificationChange = (id, enabled) => {
    setNotifications(prev => ({
      ...prev,
      [id]: enabled
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Customize your SafeHerHub experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="card p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Appearance
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Switch between light and dark themes</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isDarkMode}
                          onChange={(e) => setIsDarkMode(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Language</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Choose your preferred language</p>
                      </div>
                      <select className="select w-32">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Time Zone</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Your local time zone</p>
                      </div>
                      <select className="select w-48">
                        <option value="UTC-5">Eastern Time (UTC-5)</option>
                        <option value="UTC-6">Central Time (UTC-6)</option>
                        <option value="UTC-7">Mountain Time (UTC-7)</option>
                        <option value="UTC-8">Pacific Time (UTC-8)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Data & Storage
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Export Data</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Download your data</p>
                      </div>
                      <button className="btn btn-outline flex items-center">
                        <FiDownload className="w-4 h-4 mr-2" />
                        Export
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Import Data</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Import data from another source</p>
                      </div>
                      <button className="btn btn-outline flex items-center">
                        <FiUpload className="w-4 h-4 mr-2" />
                        Import
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Clear Cache</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Clear stored cache data</p>
                      </div>
                      <button className="btn btn-outline">Clear</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  {notificationSettings.map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{setting.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{setting.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={setting.enabled}
                          disabled={setting.disabled}
                          onChange={(e) => handleNotificationChange(setting.id, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600 ${setting.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Privacy Controls
                </h3>
                <div className="space-y-4">
                  {privacySettings.map((setting, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{setting.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{setting.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{setting.value}</span>
                        <button className="btn btn-outline btn-sm">Change</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Security Settings
                  </h3>
                  <div className="space-y-4">
                    {securitySettings.map((setting, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{setting.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{setting.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{setting.status}</span>
                          {setting.status === 'Update' && (
                            <button className="btn btn-primary btn-sm">Update</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Danger Zone
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-danger-50 dark:bg-danger-900 rounded-lg">
                      <div>
                        <p className="font-medium text-danger-900 dark:text-danger-100">Delete Account</p>
                        <p className="text-sm text-danger-700 dark:text-danger-300">Permanently delete your account and all data</p>
                      </div>
                      <button className="btn btn-danger flex items-center">
                        <FiTrash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
