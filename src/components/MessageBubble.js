import React from "react";
import { FileText, ExternalLink } from "lucide-react";

const MessageBubble = ({ content, onViewPDFs }) => {
  // Function to detect PDF mentions and add links
  const renderContentWithPDFLinks = (text) => {
    // Check for common PDF-related terms
    const pdfTerms = [
      'unemployment insurance', 'NJ UI', 'New Jersey', 'documentation', 
      'policy', 'guidelines', 'manual', 'handbook', 'procedures'
    ];
    
    let processedText = text;
    pdfTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      processedText = processedText.replace(regex, (match) => {
        return `<span class="text-primary-600 font-medium">${match}</span>`;
      });
    });
    
    return processedText;
  };

  // Check if content is an object with text and sources
  if (typeof content === "object" && content.text) {
    return (
      <div className="space-y-3">
        <div 
          className="text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: renderContentWithPDFLinks(content.text) }}
        />



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
                  <button
                    onClick={onViewPDFs}
                    className="text-info-600 text-xs mb-2 break-all hover:text-info-800 hover:underline cursor-pointer text-left w-full"
                  >
                    {source.url}
                  </button>
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
  return (
    <div className="space-y-3">
      <div 
        className="text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: renderContentWithPDFLinks(content) }}
      />
      

    </div>
  );
};

export default MessageBubble;
