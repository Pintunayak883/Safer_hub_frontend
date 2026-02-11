import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiHome,
  FiShield,
  FiUsers,
  FiFileText,
  FiUser,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiBell,
  FiMapPin,
  FiHeart,
  FiTrendingUp
} from 'react-icons/fi';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: FiHome,
      description: 'Overview and quick actions'
    },
    {
      name: 'Safety Tools',
      path: '/safety-tools',
      icon: FiShield,
      description: 'Emergency alerts and safety features'
    },
    {
      name: 'Community',
      path: '/community',
      icon: FiUsers,
      description: 'Forums and community support'
    },
    {
      name: 'Reports',
      path: '/reports',
      icon: FiFileText,
      description: 'Incident reports and safety data'
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: FiUser,
      description: 'Your profile and settings'
    }
  ];

  const quickActions = [
    {
      name: 'Emergency Alert',
      icon: FiBell,
      color: 'text-danger-600',
      bgColor: 'bg-danger-100 dark:bg-danger-900'
    },
    {
      name: 'Share Location',
      icon: FiMapPin,
      color: 'text-primary-600',
      bgColor: 'bg-primary-100 dark:bg-primary-900'
    },
    {
      name: 'Safety Check',
      icon: FiHeart,
      color: 'text-success-600',
      bgColor: 'bg-success-100 dark:bg-success-900'
    },
    {
      name: 'Community Pulse',
      icon: FiTrendingUp,
      color: 'text-warning-600',
      bgColor: 'bg-warning-100 dark:bg-warning-900'
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <motion.div
      initial={{ width: 256 }}
      animate={{ width: isCollapsed ? 64 : 256 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40 overflow-hidden"
    >
      <div className="flex flex-col h-full">
        {/* Toggle button */}
        <div className="flex justify-end p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {isCollapsed ? (
              <FiChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            ) : (
              <FiChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                  active
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-primary-600' : ''}`} />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium">{item.name}</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {item.description}
                    </p>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.name}
                    className={`flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group`}
                  >
                    <div className={`w-8 h-8 rounded-lg ${action.bgColor} flex items-center justify-center mb-2`}>
                      <Icon className={`w-4 h-4 ${action.color}`} />
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 text-center">
                      {action.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Collapsed Quick Actions */}
        {isCollapsed && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.name}
                    className={`w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group`}
                    title={action.name}
                  >
                    <div className={`w-6 h-6 rounded-lg ${action.bgColor} flex items-center justify-center mx-auto`}>
                      <Icon className={`w-3 h-3 ${action.color}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Settings Link */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            to="/settings"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
              isActive('/settings')
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <FiSettings className={`w-5 h-5 flex-shrink-0 ${isActive('/settings') ? 'text-primary-600' : ''}`} />
            {!isCollapsed && (
              <span className="text-sm font-medium">Settings</span>
            )}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
