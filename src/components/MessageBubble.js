import React from "react";

const MessageBubble = ({ content }) => {
  // Check if content is an object with text and sources
  if (typeof content === "object" && content.text) {
    return (
      <div className="space-y-3">
        <p className="text-sm leading-relaxed">{content.text}</p>

        {content.sources && content.sources.length > 0 && (
          <div className="bg-info-50 border border-info-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-info-800 mb-3 flex items-center">
              <span className="mr-2">📚</span>
              Sources & References
            </h4>
            <div className="space-y-3">
              {content.sources.map((source, index) => (
                <div
                  key={index}
                  className="text-sm bg-white p-3 rounded border border-info-200"
                >
                  <div className="font-semibold text-info-900 mb-1">
                    {source.title}
                  </div>
                  <div className="text-info-600 text-xs mb-2 break-all">
                    {source.url}
                  </div>
                  {source.snippet && (
                    <div className="text-info-700 text-xs italic bg-info-25 p-2 rounded">
                      "{source.snippet}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // If content is just a string, display it directly
  return <p className="text-sm leading-relaxed">{content}</p>;
};

export default MessageBubble;
