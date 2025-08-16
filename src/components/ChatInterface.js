import React, { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import FeedbackButtons from "./FeedbackButtons";
import GoldfinchIcon from "./GoldfinchIcon";
import { Send, User } from "lucide-react";

const ChatInterface = ({
  conversations,
  onSendMessage,
  onFeedback,
  isLoading,
}) => {
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() && !isLoading) {
      onSendMessage(inputMessage.trim());
      setInputMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-secondary-200">
      {/* Chat Header */}
      <div className="bg-primary-600 text-white px-6 py-4">
        <div className="flex items-center space-x-3">
          <GoldfinchIcon className="w-6 h-6 text-yellow-300" />
          <h2 className="text-xl font-semibold font-serif">
            Finchy - NJ UI Modernization Assistant
          </h2>
        </div>
      </div>

      {/* Messages Container */}
      <div className="h-96 overflow-y-auto p-6 space-y-4">
        {conversations.length === 0 ? (
          <div className="text-center text-secondary-500 py-12">
            <GoldfinchIcon className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
            <p className="text-xl font-semibold text-secondary-700 mb-2">
              Start a conversation about NJ UI modernization!
            </p>
            <p className="text-secondary-600 max-w-md mx-auto">
              Ask questions about modernization strategies, best practices,
              implementation approaches, or any other topics related to updating
              your user interface.
            </p>
          </div>
        ) : (
          conversations.map((conversation) => (
            <div key={conversation.id} className="space-y-3">
              {/* User Question */}
              <div className="flex justify-end">
                <div className="max-w-xs lg:max-w-md">
                  <div className="bg-primary-50 text-primary-900 rounded-lg px-4 py-3 border border-primary-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="w-4 h-4 text-primary-600" />
                      <span className="text-xs font-semibold text-primary-700">
                        You
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">
                      {conversation.question}
                    </p>
                  </div>
                </div>
              </div>

              {/* AI Answer */}
              <div className="flex justify-start">
                <div className="max-w-xs lg:max-w-md">
                  <div className="bg-secondary-50 text-secondary-900 rounded-lg px-4 py-3 border border-secondary-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <GoldfinchIcon className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs font-semibold text-secondary-700">
                        Finchy
                      </span>
                    </div>
                    <MessageBubble content={conversation.answer} />
                  </div>

                  {/* Feedback Buttons */}
                  {!conversation.feedback && (
                    <div className="mt-2">
                      <FeedbackButtons
                        conversationId={conversation.id}
                        onFeedback={onFeedback}
                      />
                    </div>
                  )}

                  {/* Feedback Status */}
                  {conversation.feedback && (
                    <div className="mt-2 text-xs">
                      {conversation.feedback.type === "thumbsUp" ? (
                        <span className="text-success-600 flex items-center space-x-1">
                          <span>👍</span>
                          <span>Thank you for the positive feedback!</span>
                        </span>
                      ) : (
                        <span className="text-error-600 flex items-center space-x-1">
                          <span>👎</span>
                          <span>
                            Thank you for the feedback. We'll improve!
                          </span>
                          {conversation.feedback.text && (
                            <span className="text-gray-600">
                              - "{conversation.feedback.text}"
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-xs lg:max-w-md">
              <div className="bg-secondary-50 text-secondary-900 rounded-lg px-4 py-3 border border-secondary-200">
                <div className="flex items-center space-x-2 mb-2">
                  <GoldfinchIcon className="w-4 h-4 text-yellow-500" />
                  <span className="text-xs font-semibold text-secondary-700">
                    Finchy
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-sm text-secondary-600 font-medium">
                    Analyzing your question...
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="border-t border-secondary-200 p-6 bg-secondary-25">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <div className="flex-1">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about NJ UI modernization strategies, best practices, or implementation approaches..."
              className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none font-sans text-base"
              rows="3"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-sm"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
