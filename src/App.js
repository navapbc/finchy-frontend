import React, { useState, useEffect } from "react";
import ChatInterface from "./components/ChatInterface";
import FeedbackModal from "./components/FeedbackModal";
import Header from "./components/Header";
import LoginModal from "./components/LoginModal";
import FinchyIcon from "./components/FinchyIcon";
import { LogIn } from "lucide-react";
import { mockLLMResponse } from "./utils/mockData";
import mockAuthService from "./services/mockAuthService";

function App() {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Initialize authentication on component mount
  useEffect(() => {
    const initAuth = () => {
      const authState = mockAuthService.init();
      setIsAuthenticated(authState.isAuthenticated);
      setUser(authState.user);
    };

    initAuth();

    // Listen for authentication state changes
    const unsubscribe = mockAuthService.addListener((authState) => {
      setIsAuthenticated(authState.isAuthenticated);
      setUser(authState.user);
    });

    return unsubscribe;
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const result = await mockAuthService.signIn(username, password);
      if (result.success) {
        setIsAuthenticated(true);
        setUser(result.user);
        setShowLoginModal(false);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await mockAuthService.signOut();
      setIsAuthenticated(false);
      setUser(null);
      // Clear conversations on logout
      setConversations([]);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleSendMessage = async (message) => {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const response = mockLLMResponse(message);
      const newConversation = {
        id: Date.now(),
        question: message,
        answer: response,
        timestamp: new Date().toISOString(),
        feedback: null,
      };

      setConversations((prev) => [...prev, newConversation]);
      setIsLoading(false);
    }, 1000);
  };

  const handleFeedback = (
    conversationId,
    feedbackType,
    feedbackText = null
  ) => {
    try {
      const updatedConversations = conversations.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            feedback: {
              type: feedbackType,
              text: feedbackText,
              timestamp: new Date().toISOString(),
            },
          };
        }
        return conv;
      });

      setConversations(updatedConversations);

      // Store feedback in mock database
      const conversation = conversations.find((c) => c.id === conversationId);
      if (conversation) {
        console.log("Storing feedback in database:", {
          question: conversation.question,
          answer:
            typeof conversation.answer === "object" && conversation.answer?.text
              ? conversation.answer.text
              : conversation.answer,
          feedbackType,
          feedbackText,
          timestamp: new Date().toISOString(),
        });
      }

      if (feedbackType === "thumbsDown") {
        console.log("Setting current feedback:", {
          conversationId,
          question: conversation.question,
          answer: conversation.answer,
          answerType: typeof conversation.answer,
          hasText: conversation.answer?.text,
        });

        setCurrentFeedback({
          conversationId,
          question: conversation.question,
          answer: conversation.answer,
        });
        setShowFeedbackModal(true);
      }
    } catch (error) {
      console.error("Error handling feedback:", error);
    }
  };

  const handleFeedbackSubmit = (feedbackText) => {
    try {
      if (currentFeedback) {
        const updatedConversations = conversations.map((conv) => {
          if (conv.id === currentFeedback.conversationId) {
            return {
              ...conv,
              feedback: {
                ...conv.feedback,
                text: feedbackText,
              },
            };
          }
          return conv;
        });

        setConversations(updatedConversations);

        // Store additional feedback in mock database
        console.log("Storing additional feedback in database:", {
          question: currentFeedback.question,
          answer:
            typeof currentFeedback.answer === "object" &&
            currentFeedback.answer?.text
              ? currentFeedback.answer.text
              : currentFeedback.answer,
          feedbackType: "thumbsDown",
          feedbackText,
          timestamp: new Date().toISOString(),
        });
      }

      setShowFeedbackModal(false);
      setCurrentFeedback(null);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <Header
        isAuthenticated={isAuthenticated}
        user={user}
        onLogin={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />

      <div className="max-w-6xl mx-auto p-6">
        {isAuthenticated ? (
          <>
            <ChatInterface
              conversations={conversations}
              onSendMessage={handleSendMessage}
              onFeedback={handleFeedback}
              isLoading={isLoading}
            />

            {showFeedbackModal && (
              <FeedbackModal
                onClose={() => setShowFeedbackModal(false)}
                onSubmit={handleFeedbackSubmit}
                conversation={currentFeedback}
              />
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <FinchyIcon className="w-24 h-24 mx-auto mb-6 text-yellow-400" />
              <h2 className="text-3xl font-bold text-secondary-900 mb-4 font-serif">
                Welcome to Finchy
              </h2>
              <p className="text-lg text-secondary-600 mb-8">
                Your NJ UI Modernization Assistant is ready to help. Please sign
                in to get started.
              </p>
              <button
                onClick={() => setShowLoginModal(true)}
                className="inline-flex items-center space-x-2 px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 font-semibold shadow-sm text-lg"
              >
                <LogIn className="w-6 h-6" />
                <span>Sign In to Continue</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
          onSwitchToSignUp={() => console.log("Switch to sign up")}
          onSwitchToForgotPassword={() =>
            console.log("Switch to forgot password")
          }
        />
      )}
    </div>
  );
}

export default App;
