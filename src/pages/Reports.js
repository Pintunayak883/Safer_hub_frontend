import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiFileText, 
  FiPlus, 
  FiFilter, 
  FiSearch,
  FiMapPin,
  FiClock,
  FiEye,
  FiThumbsUp,
  FiThumbsDown,
  FiAlertTriangle,
  FiShield,
  FiHeart
} from 'react-icons/fi';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('my-reports');
  const [searchQuery, setSearchQuery] = useState('');

  const reportTypes = [
    { id: 'incident', name: 'Incident', color: 'text-danger-600', bgColor: 'bg-danger-100 dark:bg-danger-900' },
    { id: 'harassment', name: 'Harassment', color: 'text-warning-600', bgColor: 'bg-warning-100 dark:bg-warning-900' },
    { id: 'safety_concern', name: 'Safety Concern', color: 'text-primary-600', bgColor: 'bg-primary-100 dark:bg-primary-900' },
    { id: 'positive_experience', name: 'Positive Experience', color: 'text-success-600', bgColor: 'bg-success-100 dark:bg-success-900' },
    { id: 'tip', name: 'Safety Tip', color: 'text-secondary-600', bgColor: 'bg-secondary-100 dark:bg-secondary-900' }
  ];

  const severityLevels = [
    { id: 'low', name: 'Low', color: 'text-success-600', bgColor: 'bg-success-100 dark:bg-success-900' },
    { id: 'medium', name: 'Medium', color: 'text-warning-600', bgColor: 'bg-warning-100 dark:bg-warning-900' },
    { id: 'high', name: 'High', color: 'text-danger-600', bgColor: 'bg-danger-100 dark:bg-danger-900' },
    { id: 'critical', name: 'Critical', color: 'text-danger-800', bgColor: 'bg-danger-200 dark:bg-danger-800' }
  ];

  const sampleReports = [
    {
      id: 1,
      title: 'Catcalling incident near Central Park',
      type: 'harassment',
      severity: 'medium',
      location: 'Central Park, NYC',
      timestamp: '2024-01-15T14:30:00Z',
      description: 'Experienced verbal harassment while walking through the park. The individual followed me for several blocks.',
      isAnonymous: true,
      upvotes: 23,
      downvotes: 2,
      views: 156,
      status: 'submitted',
      tags: ['catcalling', 'public-space', 'following']
    },
    {
      id: 2,
      title: 'Well-lit bus stop made me feel safe',
      type: 'positive_experience',
      severity: 'low',
      location: 'Main Street Bus Stop',
      timestamp: '2024-01-14T18:45:00Z',
      description: 'The new lighting at this bus stop has made such a difference. I feel much safer waiting here in the evening.',
      isAnonymous: false,
      upvotes: 45,
      downvotes: 0,
      views: 234,
      status: 'submitted',
      tags: ['lighting', 'public-transport', 'positive']
    },
    {
      id: 3,
      title: 'Suspicious individual near campus',
      type: 'safety_concern',
      severity: 'high',
      location: 'University Campus',
      timestamp: '2024-01-13T20:15:00Z',
      description: 'Noticed someone following multiple students. Reported to campus security.',
      isAnonymous: true,
      upvotes: 67,
      downvotes: 3,
      views: 445,
      status: 'under_review',
      tags: ['campus', 'following', 'security']
    }
  ];

  const filteredReports = sampleReports.filter(report => {
    if (searchQuery && !report.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const getTypeInfo = (type) => {
    return reportTypes.find(t => t.id === type) || reportTypes[0];
  };

  const getSeverityInfo = (severity) => {
    return severityLevels.find(s => s.id === severity) || severityLevels[0];
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Safety Reports
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Share experiences and help build a safer community
              </p>
            </div>
            <button className="btn btn-primary flex items-center">
              <FiPlus className="w-4 h-4 mr-2" />
              New Report
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            {[
              { id: 'my-reports', name: 'My Reports' },
              { id: 'community', name: 'Community Reports' },
              { id: 'nearby', name: 'Nearby' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 w-full"
              />
            </div>
            <button className="btn btn-outline flex items-center">
              <FiFilter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
        </motion.div>

        {/* Reports List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6"
        >
          {filteredReports.map((report, index) => {
            const typeInfo = getTypeInfo(report.type);
            const severityInfo = getSeverityInfo(report.severity);
            
            return (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="card p-6 hover:shadow-medium transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`badge ${typeInfo.bgColor} ${typeInfo.color}`}>
                        {typeInfo.name}
                      </span>
                      <span className={`badge ${severityInfo.bgColor} ${severityInfo.color}`}>
                        {severityInfo.name}
                      </span>
                      {report.isAnonymous && (
                        <span className="badge badge-gray">Anonymous</span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {report.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {report.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <FiMapPin className="w-4 h-4 mr-1" />
                        {report.location}
                      </div>
                      <div className="flex items-center">
                        <FiClock className="w-4 h-4 mr-1" />
                        {new Date(report.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <FiThumbsUp className="w-4 h-4 mr-1" />
                      {report.upvotes}
                    </div>
                    <div className="flex items-center">
                      <FiThumbsDown className="w-4 h-4 mr-1" />
                      {report.downvotes}
                    </div>
                    <div className="flex items-center">
                      <FiEye className="w-4 h-4 mr-1" />
                      {report.views} views
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {report.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="badge badge-gray text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Safety Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <div className="card p-8 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700">
            <div className="text-center">
              <FiShield className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Your Voice Matters
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                Every report helps build a safer community. Share your experiences to help others stay safe and informed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn btn-primary">
                  <FiFileText className="w-4 h-4 mr-2" />
                  Create Report
                </button>
                <button className="btn btn-outline">
                  <FiHeart className="w-4 h-4 mr-2" />
                  Safety Guide
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Reports;
