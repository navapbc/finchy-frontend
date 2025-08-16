import React, { useState } from "react";
import { X, LogIn, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import GoldfinchIcon from "./GoldfinchIcon";

const LoginModal = ({
  onClose,
  onLogin,
  onSwitchToSignUp,
  onSwitchToForgotPassword,
}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await onLogin(formData.username, formData.password);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await onLogin("demo", "password");
      setSuccess("Demo login successful! Redirecting...");
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      setError(err.message || "Demo login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-secondary-200">
          <div className="flex items-center space-x-3">
            <GoldfinchIcon className="w-8 h-8 text-yellow-500" />
            <div>
              <h3 className="text-xl font-semibold text-primary-900 font-serif">
                Welcome to Finchy
              </h3>
              <p className="text-sm text-secondary-600">
                Sign in to your account
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-secondary-400 hover:text-secondary-600 transition-colors p-2 rounded-full hover:bg-secondary-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Demo Login Button */}
          <div className="mb-6">
            <button
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-warning-500 text-white rounded-lg hover:bg-warning-600 focus:ring-2 focus:ring-warning-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm"
            >
              <LogIn className="w-5 h-5" />
              <span>Try Demo Login (demo/password)</span>
            </button>
            <p className="text-xs text-secondary-500 text-center mt-2">
              Use this for testing the application
            </p>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-secondary-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-secondary-500">
                Or sign in with your credentials
              </span>
            </div>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-3 bg-error-50 border border-error-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-error-600" />
              <span className="text-sm text-error-700">{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-success-50 border border-success-200 rounded-lg flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-success-600" />
              <span className="text-sm text-success-700">{success}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-secondary-700 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="Enter your username"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-secondary-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 pr-10 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary-400 hover:text-secondary-600"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                disabled={isLoading || !formData.username || !formData.password}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={onSwitchToForgotPassword}
                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  Forgot password?
                </button>
                <button
                  type="button"
                  onClick={onSwitchToSignUp}
                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  Create account
                </button>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-secondary-200">
            <p className="text-xs text-secondary-500 text-center">
              This is a mock authentication system for development purposes.
              <br />
              In production, this will integrate with AWS Cognito.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
