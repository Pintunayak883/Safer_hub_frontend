import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiShield, 
  FiUsers, 
  FiMapPin, 
  FiBell, 
  FiHeart, 
  FiTrendingUp,
  FiCheckCircle,
  FiArrowRight,
  FiStar
} from 'react-icons/fi';

const Home = () => {
  const features = [
    {
      icon: FiShield,
      title: 'Whisper Alert Chain',
      description: 'Silent location sharing with trusted contacts that auto-escalates if no response.',
      color: 'text-primary-600',
      bgColor: 'bg-primary-100 dark:bg-primary-900'
    },
    {
      icon: FiUsers,
      title: 'Echo Forum Threads',
      description: 'Community support with AI-powered similar story suggestions for empathy.',
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-100 dark:bg-secondary-900'
    },
    {
      icon: FiMapPin,
      title: 'Shadow Report Vault',
      description: 'Anonymous encrypted vault for logging incidents with voice-to-text transcription.',
      color: 'text-success-600',
      bgColor: 'bg-success-100 dark:bg-success-900'
    },
    {
      icon: FiBell,
      title: 'Pulse Check Scheduler',
      description: 'Random safety check-ins with gamified streaks and community heatmaps.',
      color: 'text-warning-600',
      bgColor: 'bg-warning-100 dark:bg-warning-900'
    },
    {
      icon: FiHeart,
      title: 'Guardian Profile Sync',
      description: 'Sync safety settings with loved ones using affirmation locks for security.',
      color: 'text-danger-600',
      bgColor: 'bg-danger-100 dark:bg-danger-900'
    },
    {
      icon: FiTrendingUp,
      title: 'Community Pulse',
      description: 'Real-time neighborhood safety insights from opted-in community members.',
      color: 'text-primary-600',
      bgColor: 'bg-primary-100 dark:bg-primary-900'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '50K+', label: 'Safety Reports' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Student',
      content: 'SafeHerHub has given me peace of mind during late-night commutes. The whisper alert feature is a game-changer.',
      rating: 5
    },
    {
      name: 'Maria Rodriguez',
      role: 'Professional',
      content: 'The community support is incredible. Knowing I\'m not alone in my experiences makes all the difference.',
      rating: 5
    },
    {
      name: 'Emily Chen',
      role: 'Entrepreneur',
      content: 'The safety streak feature motivates me to stay vigilant. It\'s like having a safety coach in my pocket.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Your Safety, Our{' '}
              <span className="text-gradient">Priority</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Empowering women with comprehensive safety tools, real-time protection, and a supportive community. 
              Stay safe, stay connected, stay empowered.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/register"
                className="btn btn-primary text-lg px-8 py-3"
              >
                Get Started Free
                <FiArrowRight className="ml-2" />
              </Link>
              <Link
                to="/features"
                className="btn btn-outline text-lg px-8 py-3"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Innovative Safety Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Cutting-edge technology designed specifically for women's safety with unique features you won't find anywhere else.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card p-6 hover:shadow-medium transition-shadow duration-300"
                >
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Women Worldwide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real stories from real women who have found safety and support in our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="w-5 h-5 text-warning-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Take Control of Your Safety?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of women who have already made safety a priority. 
              Your safety journey starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3"
              >
                Start Your Safety Journey
                <FiArrowRight className="ml-2" />
              </Link>
              <Link
                to="/contact"
                className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-3"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
