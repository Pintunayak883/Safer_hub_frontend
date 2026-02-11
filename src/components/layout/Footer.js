import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShield, FiUsers, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '/features' },
      { name: 'Safety Tools', href: '/safety-tools' },
      { name: 'Community', href: '/community' },
      { name: 'Reports', href: '/reports' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Safety Guide', href: '/safety-guide' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Emergency', href: '/emergency' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Safety Standards', href: '/safety-standards' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', href: '#' },
    { name: 'Facebook', href: '#' },
    { name: 'Instagram', href: '#' },
    { name: 'LinkedIn', href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold">SafeHerHub</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Empowering women with comprehensive safety tools, community support, and real-time protection features.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                >
                  <span className="text-sm font-medium">{social.name[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <FiMail className="w-5 h-5 text-primary-400" />
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white">support@safeherhub.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FiPhone className="w-5 h-5 text-primary-400" />
              <div>
                <p className="text-sm text-gray-400">Emergency</p>
                <p className="text-white">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FiMapPin className="w-5 h-5 text-primary-400" />
              <div>
                <p className="text-sm text-gray-400">Location</p>
                <p className="text-white">Global Community</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0">
              <FiHeart className="w-4 h-4 text-danger-500" />
              <span className="text-sm">
                Made with love for women's safety
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>© {currentYear} SafeHerHub. All rights reserved.</span>
              <div className="flex items-center space-x-2">
                <FiShield className="w-4 h-4" />
                <span>Secure & Private</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
