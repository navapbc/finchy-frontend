// Mock LLM responses to simulate different types of answers
export const mockLLMResponse = (question) => {
  const responses = {
    // NJ UI Modernization questions
    "what is ui modernization": {
      text: "UI modernization is the process of updating and improving user interfaces to meet current design standards, accessibility requirements, and user experience expectations. It involves updating visual design, improving usability, ensuring accessibility compliance, and often migrating to modern frameworks and technologies.",
      sources: [
        {
          title: "UI Modernization Best Practices",
          url: "https://example.com/ui-modernization",
          snippet:
            "Modern UI design focuses on user-centered design principles, accessibility compliance, and responsive design patterns.",
        },
      ],
    },

    "how to modernize legacy ui": {
      text: "To modernize legacy UI, start with a comprehensive audit of current systems, identify pain points and accessibility issues, plan a phased migration approach, choose modern frameworks (like React, Vue, or Angular), implement responsive design, ensure accessibility compliance, and provide user training and support during transition.",
      sources: [
        {
          title: "Legacy UI Modernization Guide",
          url: "https://example.com/legacy-modernization",
          snippet:
            "Successful modernization requires careful planning, user research, and iterative implementation to minimize disruption.",
        },
      ],
    },

    "what are accessibility requirements": {
      text: "Accessibility requirements include WCAG 2.1 AA compliance, keyboard navigation support, screen reader compatibility, sufficient color contrast ratios, alternative text for images, semantic HTML structure, focus management, and ensuring all interactive elements are accessible to users with disabilities.",
      sources: [
        {
          title: "WCAG 2.1 Accessibility Guidelines",
          url: "https://example.com/wcag-guidelines",
          snippet:
            "Accessibility is not just a legal requirement but also improves usability for all users.",
        },
      ],
    },

    "best practices for responsive design": {
      text: "Responsive design best practices include mobile-first approach, flexible grid systems, CSS media queries, scalable images, touch-friendly interface elements, performance optimization, progressive enhancement, and testing across multiple devices and screen sizes to ensure consistent user experience.",
      sources: [
        {
          title: "Responsive Design Principles",
          url: "https://example.com/responsive-design",
          snippet:
            "Mobile-first design ensures your application works well on all devices, from smartphones to desktop computers.",
        },
      ],
    },

    "how to implement design system": {
      text: "Implementing a design system involves creating a comprehensive component library, establishing design tokens (colors, typography, spacing), documenting usage guidelines, building reusable components, maintaining consistency across applications, and providing clear documentation for developers and designers.",
      sources: [
        {
          title: "Design System Implementation",
          url: "https://example.com/design-systems",
          snippet:
            "A well-implemented design system improves consistency, reduces development time, and ensures brand alignment.",
        },
      ],
    },
  };

  // Check for exact matches first
  const lowerQuestion = question.toLowerCase();
  for (const [key, response] of Object.entries(responses)) {
    if (lowerQuestion.includes(key)) {
      return response;
    }
  }

  // Default response for unmatched questions
  return {
    text: `I understand you're asking about "${question}". This appears to be related to NJ UI modernization. While I don't have a specific answer in my current knowledge base, I can help you with general UI modernization topics like accessibility, responsive design, design systems, legacy modernization, and best practices. Feel free to ask more specific questions about these areas.`,
    sources: [
      {
        title: "NJ UI Modernization Knowledge Base",
        url: "https://example.com/nj-ui-modernization",
        snippet:
          "This response is based on general UI modernization principles and best practices.",
      },
    ],
  };
};

// Mock database operations
export const mockDatabase = {
  // Store positive feedback
  storePositiveFeedback: (question, answer) => {
    console.log("📊 Storing positive feedback in database:", {
      question,
      answer,
      feedbackType: "thumbsUp",
      timestamp: new Date().toISOString(),
      table: "feedback_logs",
    });

    // Simulate database operation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, id: Date.now() });
      }, 100);
    });
  },

  // Store negative feedback
  storeNegativeFeedback: (question, answer, feedbackText) => {
    console.log("📊 Storing negative feedback in database:", {
      question,
      answer,
      feedbackType: "thumbsDown",
      feedbackText,
      timestamp: new Date().toISOString(),
      table: "feedback_logs",
    });

    // Simulate database operation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, id: Date.now() });
      }, 100);
    });
  },

  // Get feedback statistics
  getFeedbackStats: () => {
    return {
      totalResponses: 42,
      positiveFeedback: 28,
      negativeFeedback: 14,
      improvementRate: "67%",
    };
  },
};

// Sample conversation history for demonstration
export const sampleConversations = [
  {
    id: 1,
    question: "What is UI modernization?",
    answer: mockLLMResponse("what is ui modernization"),
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    feedback: {
      type: "thumbsUp",
      timestamp: new Date(Date.now() - 3500000).toISOString(),
    },
  },
  {
    id: 2,
    question: "How to modernize legacy UI?",
    answer: mockLLMResponse("how to modernize legacy ui"),
    timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
    feedback: {
      type: "thumbsDown",
      text: "The explanation was too general and didn't provide specific implementation steps for NJ systems.",
      timestamp: new Date(Date.now() - 1700000).toISOString(),
    },
  },
];
