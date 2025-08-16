import React from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

const FeedbackButtons = ({ conversationId, onFeedback }) => {
  const handleThumbsUp = () => {
    onFeedback(conversationId, "thumbsUp");
  };

  const handleThumbsDown = () => {
    onFeedback(conversationId, "thumbsDown");
  };

  return (
    <div className="flex items-center space-x-3 bg-white rounded-lg p-3 border border-secondary-200 shadow-sm">
      <span className="text-sm text-secondary-600 font-medium">
        Was this response helpful?
      </span>

      <button
        onClick={handleThumbsUp}
        className="p-2 text-secondary-500 hover:text-success-600 hover:bg-success-50 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-success-500 focus:ring-offset-1 hover:scale-110"
        title="This answer was helpful"
      >
        <ThumbsUp className="w-5 h-5" />
      </button>

      <button
        onClick={handleThumbsDown}
        className="p-2 text-secondary-500 hover:text-error-600 hover:bg-error-50 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-error-500 focus:ring-offset-1 hover:scale-110"
        title="This answer was not helpful"
      >
        <ThumbsDown className="w-5 h-5" />
      </button>
    </div>
  );
};

export default FeedbackButtons;
