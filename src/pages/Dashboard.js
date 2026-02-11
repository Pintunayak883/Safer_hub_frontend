import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  FiShield, 
  FiUsers, 
  FiFileText, 
  FiMapPin, 
  FiBell, 
  FiTrendingUp,
  FiAlertTriangle,
  FiHeart,
  FiCheckCircle
} from 'react-icons/fi';
import { fetchUserProfile, fetchSafetyStreak } from '../store/slices/userSlice';
import { fetchUserAlerts } from '../store/slices/alertSlice';
import { fetchUserPulses } from '../store/slices/pulseSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, safetyStreak } = useSelector((state) => state.user);
  const { alerts } = useSelector((state) => state.alerts);
  const { userPulses } = useSelector((state) => state.pulse);
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchSafetyStreak());
    dispatch(fetchUserAlerts({ page: 1, limit: 5 }));
    dispatch(fetchUserPulses({ page: 1, limit: 5 }));
  }, [dispatch]);

  if (isLoading) {
    return <LoadingSpinner size="lg" className="min-h-screen" />;
  }

  const quickActions = [
    {
      title: 'Emergency Alert',
      description: 'Send immediate alert to contacts',
      icon: FiBell,
      color: 'text-danger-600',
      bgColor: 'bg-danger-100 dark:bg-danger-900',
      action: '/safety-tools/emergency'
    },
    {
      title: 'Share Location',
      description: 'Share your current location',
      icon: FiMapPin,
      color: 'text-primary-600',
      bgColor: 'bg-primary-100 dark:bg-primary-900',
      action: '/safety-tools/location'
    },
    {
      title: 'Safety Check',
      description: 'Quick safety status check',
      icon: FiHeart,
      color: 'text-success-600',
      bgColor: 'bg-success-100 dark:bg-success-900',
      action: '/safety-tools/pulse'
    },
    {
      title: 'Report Incident',
      description: 'Report a safety incident',
      icon: FiFileText,
      color: 'text-warning-600',
      bgColor: 'bg-warning-100 dark:bg-warning-900',
      action: '/reports/new'
    }
  ];

  const stats = [
    {
      title: 'Safety Streak',
      value: safetyStreak?.currentStreak || 0,
      subtitle: 'days',
      icon: FiTrendingUp,
      color: 'text-success-600',
      bgColor: 'bg-success-100 dark:bg-success-900'
    },
    {
      title: 'Active Alerts',
      value: alerts?.filter(alert => alert.status === 'active').length || 0,
      subtitle: 'alerts',
      icon: FiAlertTriangle,
      color: 'text-warning-600',
      bgColor: 'bg-warning-100 dark:bg-warning-900'
    },
    {
      title: 'Pulse Checks',
      value: userPulses?.length || 0,
      subtitle: 'this week',
      icon: FiCheckCircle,
      color: 'text-primary-600',
      bgColor: 'bg-primary-100 dark:bg-primary-900'
    },
    {
      title: 'Community',
      value: 'Active',
      subtitle: 'status',
      icon: FiUsers,
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-100 dark:bg-secondary-900'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name || 'User'}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's your safety overview and quick actions
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={stat.title} className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {stat.subtitle}
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.a
                  key={action.title}
                  href={action.action}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="card p-6 hover:shadow-medium transition-all duration-300 cursor-pointer group"
                >
                  <div className={`w-12 h-12 ${action.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`w-6 h-6 ${action.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {action.description}
                  </p>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Alerts
              </h3>
              <a href="/alerts" className="text-sm text-primary-600 hover:text-primary-500">
                View all
              </a>
            </div>
            <div className="space-y-3">
              {alerts?.slice(0, 3).map((alert) => (
                <div key={alert._id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    alert.status === 'active' ? 'bg-danger-500' :
                    alert.status === 'acknowledged' ? 'bg-warning-500' :
                    'bg-success-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {alert.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(alert.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {alerts?.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No recent alerts
                </p>
              )}
            </div>
          </motion.div>

          {/* Safety Streak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Safety Streak
              </h3>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FiShield
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.min(safetyStreak?.currentStreak || 0, 5)
                        ? 'text-warning-500 fill-current'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {safetyStreak?.currentStreak || 0}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Days of safety check-ins
              </p>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((safetyStreak?.currentStreak || 0) * 10, 100)}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Keep it up! You're doing great.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
