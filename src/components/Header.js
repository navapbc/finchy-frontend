import React, { useState } from "react";
import { LogIn, LogOut, User, Menu, X } from "lucide-react";
import GoldfinchIcon from "./GoldfinchIcon";

const Header = ({ isAuthenticated, onLogin, onLogout, user }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogin = () => {
    // Mock login - in production this will integrate with AWS Cognito
    onLogin();
  };

  const handleLogout = () => {
    // Mock logout - in production this will integrate with AWS Cognito
    onLogout();
  };

  return (
    <header className="bg-white shadow-sm border-b border-secondary-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <GoldfinchIcon className="w-8 h-8 text-yellow-500" />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-primary-700 font-serif">
                Finchy
              </h1>
              <p className="text-xs text-secondary-600">
                NJ UI Modernization Assistant
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              <a
                href="#features"
                className="text-secondary-600 hover:text-primary-600 transition-colors font-medium"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-secondary-600 hover:text-primary-600 transition-colors font-medium"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-secondary-600 hover:text-primary-600 transition-colors font-medium"
              >
                Contact
              </a>
            </nav>

            {/* Authentication Section */}
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-secondary-700">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {user?.name || user?.email || "User"}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-secondary-700 hover:text-error-600 hover:bg-error-50 rounded-lg transition-all duration-200 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 text-secondary-600 hover:text-primary-600 transition-colors"
            >
              {showMobileMenu ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-secondary-200 py-4">
            <nav className="flex flex-col space-y-3 mb-4">
              <a
                href="#features"
                className="text-secondary-600 hover:text-primary-600 transition-colors font-medium py-2"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-secondary-600 hover:text-primary-600 transition-colors font-medium py-2"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-secondary-600 hover:text-primary-600 transition-colors font-medium py-2"
              >
                Contact
              </a>
            </nav>

            {/* Mobile Authentication */}
            <div className="border-t border-secondary-200 pt-4">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-secondary-700 py-2">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {user?.name || user?.email || "User"}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-secondary-700 hover:text-error-600 hover:bg-error-50 rounded-lg transition-all duration-200 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
