import React, { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import GoldfinchIcon from "./GoldfinchIcon";

const FeedbackModal = ({ onClose, onSubmit, conversation }) => {
  const [feedbackText, setFeedbackText] = useState("");

  // Debug logging
  console.log("FeedbackModal received conversation:", conversation);

  // Helper function to safely extract answer text
  const getAnswerText = (answer) => {
    console.log("getAnswerText called with:", answer, "type:", typeof answer);
    if (!answer) return "No response available";
    if (typeof answer === "string") return answer;
    if (typeof answer === "object" && answer.text) return answer.text;
    return "Response format not supported";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedbackText.trim()) {
      onSubmit(feedbackText.trim());
    }
  };

  const handleClose = () => {
    setFeedbackText("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-secondary-200 bg-primary-50">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-error-100 rounded-full">
              <AlertCircle className="w-7 h-7 text-error-600" />
            </div>
            <h3 className="text-xl font-semibold text-primary-900 font-serif">
              Help Us Improve
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="text-secondary-400 hover:text-secondary-600 transition-colors p-2 rounded-full hover:bg-secondary-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-secondary-700 mb-6 text-base leading-relaxed">
            We're sorry the previous answer wasn't helpful. Please let us know
            what was wrong or what you were looking for so we can improve our
            responses.
          </p>

          {/* Original Question and Answer */}
          <div className="bg-secondary-50 rounded-lg p-5 mb-6 border border-secondary-200">
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-secondary-900 mb-2 uppercase tracking-wide">
                Your Question:
              </h4>
              <p className="text-sm text-secondary-700 bg-white p-3 rounded border border-secondary-200">
                {conversation?.question}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-secondary-900 mb-2 uppercase tracking-wide flex items-center">
                <GoldfinchIcon className="w-4 h-4 text-yellow-500 mr-2" />
                Finchy's Response:
              </h4>
              <p className="text-sm text-secondary-700 bg-white p-3 rounded border border-secondary-200">
                {getAnswerText(conversation?.answer)}
              </p>
            </div>
          </div>

          {/* Feedback Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="feedback"
                className="block text-sm font-semibold text-secondary-900 mb-3"
              >
                What was wrong with this response?
              </label>
              <textarea
                id="feedback"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Please describe what was incorrect, unclear, or missing..."
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none font-sans text-base"
                rows="4"
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-6 py-3 border border-secondary-300 text-secondary-700 rounded-lg hover:bg-secondary-50 focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!feedbackText.trim()}
                className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-sm"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
