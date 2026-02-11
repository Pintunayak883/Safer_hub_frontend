import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft, FiSearch } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full mx-4 text-center"
      >
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-8xl font-bold text-primary-600 dark:text-primary-400 mb-4"
          >
            404
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="btn btn-primary w-full flex items-center justify-center"
          >
            <FiHome className="w-4 h-4 mr-2" />
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline w-full flex items-center justify-center"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Looking for something specific?
          </p>
          <div className="flex space-x-2">
            <Link
              to="/safety-tools"
              className="btn btn-ghost btn-sm"
            >
              Safety Tools
            </Link>
            <Link
              to="/community"
              className="btn btn-ghost btn-sm"
            >
              Community
            </Link>
            <Link
              to="/reports"
              className="btn btn-ghost btn-sm"
            >
              Reports
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
