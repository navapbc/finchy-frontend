// Mock Authentication Service
// This simulates AWS Cognito functionality for development
// In production, this will be replaced with actual Cognito integration

class MockAuthService {
  constructor() {
    this.isAuthenticated = false;
    this.user = null;
    this.token = null;
    this.refreshToken = null;
    this.listeners = [];
  }

  // Mock login - simulates Cognito authentication
  async signIn(username, password) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock validation
    if (!username || !password) {
      throw new Error("Username and password are required");
    }

    if (username === "demo" && password === "password") {
      // Mock successful authentication
      this.isAuthenticated = true;
      this.user = {
        id: "mock-user-123",
        username: username,
        email: `${username}@example.com`,
        name: "Demo User",
        groups: ["users", "admin"],
        attributes: {
          email_verified: true,
          sub: "mock-user-123",
        },
      };
      this.token = this.generateMockToken();
      this.refreshToken = this.generateMockRefreshToken();

      // Store in localStorage for persistence
      this.persistAuthState();

      // Notify listeners
      this.notifyListeners();

      return {
        success: true,
        user: this.user,
        token: this.token,
      };
    } else {
      throw new Error("Invalid credentials. Use demo/password for testing.");
    }
  }

  // Mock sign up - simulates Cognito user registration
  async signUp(username, email, password) {
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }

    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    // Mock successful registration
    return {
      success: true,
      message:
        "User registered successfully. Please check your email for verification.",
      userSub: "mock-user-" + Date.now(),
    };
  }

  // Mock sign out - simulates Cognito logout
  async signOut() {
    await new Promise((resolve) => setTimeout(resolve, 300));

    this.isAuthenticated = false;
    this.user = null;
    this.token = null;
    this.refreshToken = null;

    // Clear localStorage
    this.clearAuthState();

    // Notify listeners
    this.notifyListeners();

    return { success: true };
  }

  // Mock password reset
  async forgotPassword(email) {
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (!email) {
      throw new Error("Email is required");
    }

    return {
      success: true,
      message: "Password reset code sent to your email",
    };
  }

  // Mock confirm password reset
  async confirmNewPassword(email, code, newPassword) {
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!email || !code || !newPassword) {
      throw new Error("All fields are required");
    }

    if (newPassword.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    return {
      success: true,
      message: "Password updated successfully",
    };
  }

  // Mock token refresh
  async refreshToken() {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!this.refreshToken) {
      throw new Error("No refresh token available");
    }

    this.token = this.generateMockToken();
    this.persistAuthState();

    return {
      success: true,
      token: this.token,
    };
  }

  // Mock get current user
  getCurrentUser() {
    return this.user;
  }

  // Mock get current session
  getCurrentSession() {
    if (!this.isAuthenticated || !this.token) {
      return null;
    }

    return {
      accessToken: {
        jwtToken: this.token,
        payload: this.decodeToken(this.token),
      },
      refreshToken: {
        token: this.refreshToken,
      },
      isValid: () => true,
    };
  }

  // Mock check if user is authenticated
  isUserAuthenticated() {
    return this.isAuthenticated;
  }

  // Mock check if user is in a specific group
  isUserInGroup(groupName) {
    return this.user?.groups?.includes(groupName) || false;
  }

  // Helper methods
  generateMockToken() {
    const payload = {
      sub: this.user?.id || "mock-user",
      email: this.user?.email || "demo@example.com",
      groups: this.user?.groups || ["users"],
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour from now
      iat: Math.floor(Date.now() / 1000),
    };

    // Simple mock JWT encoding (not real JWT)
    return btoa(JSON.stringify(payload));
  }

  generateMockRefreshToken() {
    return "mock-refresh-token-" + Date.now();
  }

  decodeToken(token) {
    try {
      return JSON.parse(atob(token));
    } catch {
      return {};
    }
  }

  // Persistence methods
  persistAuthState() {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "mockAuth",
        JSON.stringify({
          isAuthenticated: this.isAuthenticated,
          user: this.user,
          token: this.token,
          refreshToken: this.refreshToken,
        })
      );
    }
  }

  restoreAuthState() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mockAuth");
      if (saved) {
        try {
          const authData = JSON.parse(saved);
          this.isAuthenticated = authData.isAuthenticated;
          this.user = authData.user;
          this.token = authData.token;
          this.refreshToken = authData.refreshToken;
        } catch (error) {
          console.error("Error restoring auth state:", error);
          this.clearAuthState();
        }
      }
    }
  }

  clearAuthState() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("mockAuth");
    }
  }

  // Event listener system
  addListener(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(
        (listener) => listener !== callback
      );
    };
  }

  notifyListeners() {
    this.listeners.forEach((callback) => {
      try {
        callback({
          isAuthenticated: this.isAuthenticated,
          user: this.user,
        });
      } catch (error) {
        console.error("Error in auth listener:", error);
      }
    });
  }

  // Initialize auth state
  init() {
    this.restoreAuthState();
    return {
      isAuthenticated: this.isAuthenticated,
      user: this.user,
    };
  }
}

// Create singleton instance
const mockAuthService = new MockAuthService();

export default mockAuthService;
