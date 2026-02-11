import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUsers, 
  FiMessageSquare, 
  FiHeart, 
  FiThumbsUp, 
  FiSearch,
  FiFilter,
  FiPlus,
  FiTrendingUp,
  FiClock,
  FiEye
} from 'react-icons/fi';

const CommunityForum = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Topics', count: 156 },
    { id: 'safety', name: 'Safety Tips', count: 42 },
    { id: 'incidents', name: 'Incident Sharing', count: 28 },
    { id: 'support', name: 'Community Support', count: 35 },
    { id: 'resources', name: 'Resources', count: 23 },
    { id: 'general', name: 'General', count: 28 }
  ];

  const featuredPosts = [
    {
      id: 1,
      title: 'Night Walking Safety Tips from the Community',
      author: 'Sarah M.',
      category: 'Safety Tips',
      replies: 24,
      likes: 156,
      views: 1200,
      time: '2 hours ago',
      isPinned: true,
      tags: ['night-safety', 'walking', 'tips']
    },
    {
      id: 2,
      title: 'How to Build Your Trusted Contact Network',
      author: 'Maria R.',
      category: 'Resources',
      replies: 18,
      likes: 89,
      views: 850,
      time: '4 hours ago',
      isPinned: false,
      tags: ['trusted-contacts', 'network', 'safety']
    },
    {
      id: 3,
      title: 'Positive Experience: Community Helped Me Feel Safe',
      author: 'Anonymous',
      category: 'Community Support',
      replies: 32,
      likes: 203,
      views: 1500,
      time: '6 hours ago',
      isPinned: false,
      tags: ['positive', 'community', 'support']
    }
  ];

  const recentPosts = [
    {
      id: 4,
      title: 'Best Self-Defense Apps for Women',
      author: 'Lisa K.',
      category: 'Resources',
      replies: 12,
      likes: 45,
      views: 320,
      time: '1 day ago',
      tags: ['self-defense', 'apps', 'tools']
    },
    {
      id: 5,
      title: 'Public Transport Safety - What Works?',
      author: 'Emma T.',
      category: 'Safety Tips',
      replies: 8,
      likes: 67,
      views: 450,
      time: '1 day ago',
      tags: ['public-transport', 'safety', 'commuting']
    },
    {
      id: 6,
      title: 'Creating Safe Spaces in Our Neighborhood',
      author: 'Community Mod',
      category: 'General',
      replies: 15,
      likes: 92,
      views: 680,
      time: '2 days ago',
      tags: ['neighborhood', 'community', 'safety']
    }
  ];

  const allPosts = [...featuredPosts, ...recentPosts];

  const filteredPosts = allPosts.filter(post => {
    if (activeTab !== 'all' && post.category.toLowerCase() !== activeTab) {
      return false;
    }
    if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

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
                Community Forum
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Connect, share, and support each other in a safe space
              </p>
            </div>
            <button className="btn btn-primary flex items-center">
              <FiPlus className="w-4 h-4 mr-2" />
              New Post
            </button>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search discussions..."
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors duration-200 ${
                      activeTab === category.id
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Community Stats */}
            <div className="card p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Community Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Active Members</span>
                  <span className="font-semibold text-gray-900 dark:text-white">2,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Posts</span>
                  <span className="font-semibold text-gray-900 dark:text-white">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">This Week</span>
                  <span className="font-semibold text-gray-900 dark:text-white">156</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            {/* Featured Posts */}
            {activeTab === 'all' && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FiTrendingUp className="w-5 h-5 mr-2 text-primary-600" />
                  Featured Discussions
                </h2>
                <div className="space-y-4">
                  {featuredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      className="card p-6 hover:shadow-medium transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {post.isPinned && (
                              <span className="badge badge-warning">Pinned</span>
                            )}
                            <span className="badge badge-primary">{post.category}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {post.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <span>by {post.author}</span>
                            <span>•</span>
                            <span>{post.time}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <FiMessageSquare className="w-4 h-4 mr-1" />
                            {post.replies} replies
                          </div>
                          <div className="flex items-center">
                            <FiThumbsUp className="w-4 h-4 mr-1" />
                            {post.likes} likes
                          </div>
                          <div className="flex items-center">
                            <FiEye className="w-4 h-4 mr-1" />
                            {post.views} views
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="badge badge-gray text-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* All Posts */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {activeTab === 'all' ? 'Recent Discussions' : `${categories.find(c => c.id === activeTab)?.name}`}
              </h2>
              <div className="space-y-4">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="card p-6 hover:shadow-medium transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="badge badge-primary">{post.category}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {post.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>by {post.author}</span>
                          <span>•</span>
                          <span>{post.time}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <FiMessageSquare className="w-4 h-4 mr-1" />
                          {post.replies} replies
                        </div>
                        <div className="flex items-center">
                          <FiThumbsUp className="w-4 h-4 mr-1" />
                          {post.likes} likes
                        </div>
                        <div className="flex items-center">
                          <FiEye className="w-4 h-4 mr-1" />
                          {post.views} views
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="badge badge-gray text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CommunityForum;
