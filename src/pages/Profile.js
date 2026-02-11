import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiShield, 
  FiUsers, 
  FiHeart,
  FiEdit3,
  FiSave,
  FiX,
  FiPlus,
  FiTrash2,
  FiEye,
  FiEyeOff
} from 'react-icons/fi';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const [showWhisperChain, setShowWhisperChain] = useState(false);

  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    bio: 'Safety advocate and community member. Always here to help!',
    location: 'New York, NY',
    joinDate: '2024-01-01',
    safetyStreak: 15,
    totalReports: 8,
    communityPoints: 1250
  };

  const emergencyContacts = [
    { name: 'Mom', phone: '+1 (555) 123-4567', relationship: 'Family', priority: 1 },
    { name: 'Best Friend', phone: '+1 (555) 987-6543', relationship: 'Friend', priority: 2 },
    { name: 'Sister', phone: '+1 (555) 456-7890', relationship: 'Family', priority: 3 }
  ];

  const whisperChain = [
    { name: 'Mom', responseTime: '2 min', priority: 1, isActive: true },
    { name: 'Best Friend', responseTime: '5 min', priority: 2, isActive: true },
    { name: 'Sister', responseTime: '8 min', priority: 3, isActive: false }
  ];

  const safetyPreferences = {
    shareLocation: true,
    autoAlertThreshold: 30,
    preferredContactMethod: 'both',
    quietHours: { start: '22:00', end: '07:00' }
  };

  const badges = [
    { name: 'Safety Streak', description: '7-day safety streak', icon: FiShield, earned: true },
    { name: 'Community Helper', description: 'Helped 10+ community members', icon: FiUsers, earned: true },
    { name: 'Early Adopter', description: 'Joined in the first month', icon: FiHeart, earned: true },
    { name: 'Safety Expert', description: 'Completed safety training', icon: FiShield, earned: false }
  ];

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Profile
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Manage your safety settings and preferences
              </p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-outline flex items-center"
            >
              {isEditing ? (
                <>
                  <FiX className="w-4 h-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <FiEdit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </>
              )}
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="card p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {user.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {user.bio}
                </p>
                <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                  <FiMapPin className="w-4 h-4 mr-1" />
                  {user.location}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Safety Streak</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {user.safetyStreak} days
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Reports</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {user.totalReports}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Community Points</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {user.communityPoints}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Member Since</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="card p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Badges
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {badges.map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={index}
                      className={`p-3 rounded-lg text-center ${
                        badge.earned
                          ? 'bg-primary-100 dark:bg-primary-900'
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mx-auto mb-2 ${
                        badge.earned ? 'text-primary-600' : 'text-gray-400'
                      }`} />
                      <p className={`text-xs font-medium ${
                        badge.earned ? 'text-primary-700 dark:text-primary-300' : 'text-gray-500'
                      }`}>
                        {badge.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Personal Information */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Personal Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="input"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{user.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="input"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{user.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      defaultValue={user.phone}
                      className="input"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{user.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      defaultValue={user.bio}
                      className="textarea"
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{user.bio}</p>
                  )}
                </div>
                {isEditing && (
                  <div className="flex justify-end">
                    <button className="btn btn-primary flex items-center">
                      <FiSave className="w-4 h-4 mr-2" />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Emergency Contacts
                </h3>
                <button
                  onClick={() => setShowEmergencyContacts(!showEmergencyContacts)}
                  className="btn btn-outline btn-sm flex items-center"
                >
                  {showEmergencyContacts ? <FiEyeOff className="w-4 h-4 mr-1" /> : <FiEye className="w-4 h-4 mr-1" />}
                  {showEmergencyContacts ? 'Hide' : 'Show'}
                </button>
              </div>
              
              {showEmergencyContacts ? (
                <div className="space-y-3">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{contact.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{contact.phone}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{contact.relationship}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="badge badge-primary">Priority {contact.priority}</span>
                        {isEditing && (
                          <button className="text-danger-600 hover:text-danger-700">
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {isEditing && (
                    <button className="btn btn-outline w-full flex items-center justify-center">
                      <FiPlus className="w-4 h-4 mr-2" />
                      Add Contact
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  Emergency contacts are hidden for privacy
                </p>
              )}
            </div>

            {/* Whisper Chain */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Whisper Chain
                </h3>
                <button
                  onClick={() => setShowWhisperChain(!showWhisperChain)}
                  className="btn btn-outline btn-sm flex items-center"
                >
                  {showWhisperChain ? <FiEyeOff className="w-4 h-4 mr-1" /> : <FiEye className="w-4 h-4 mr-1" />}
                  {showWhisperChain ? 'Hide' : 'Show'}
                </button>
              </div>
              
              {showWhisperChain ? (
                <div className="space-y-3">
                  {whisperChain.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{contact.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Avg. response: {contact.responseTime}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`badge ${contact.isActive ? 'badge-success' : 'badge-gray'}`}>
                          {contact.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <span className="badge badge-primary">Priority {contact.priority}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  Whisper chain is hidden for privacy
                </p>
              )}
            </div>

            {/* Safety Preferences */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Safety Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Share Location</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Allow trusted contacts to see your location</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={safetyPreferences.shareLocation}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Auto Alert Threshold</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Minutes before auto-escalation</p>
                  </div>
                  <select className="select w-24">
                    <option value="15">15 min</option>
                    <option value="30" selected>30 min</option>
                    <option value="60">60 min</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Preferred Contact Method</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">How to receive alerts</p>
                  </div>
                  <select className="select w-32">
                    <option value="sms">SMS</option>
                    <option value="email">Email</option>
                    <option value="both" selected>Both</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
