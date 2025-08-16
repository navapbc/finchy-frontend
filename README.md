# Finchy - NJ UI Modernization Chatbot

A modern, responsive frontend application for a RAG (Retrieval-Augmented Generation) LLM system focused on NJ UI modernization, with integrated feedback collection and US Web Design System (USWDS) compliance.

## Features

### 🚀 Core Functionality

- **Chat Interface**: Clean, modern chat UI with real-time message display
- **Text Input**: Multi-line text input for asking questions
- **AI Responses**: Simulated LLM responses with source citations
- **Feedback System**: Thumbs up/down rating system for responses

### 👍 Feedback Collection

- **Positive Feedback**: Thumbs up stores question, answer, and rating
- **Negative Feedback**: Thumbs down triggers additional feedback modal
- **Detailed Feedback**: Text input for describing what was wrong
- **Database Storage**: Mock database operations for all feedback data

### 🎨 User Experience

- **USWDS Compliance**: Follows US Web Design System guidelines and color schemes
- **Responsive Design**: Works on desktop and mobile devices
- **Loading States**: Visual feedback during AI processing
- **Conversation History**: Persistent chat history during session
- **Modern UI**: Built with Tailwind CSS, USWDS fonts, and Lucide React icons

## Mock Data & Testing

The application includes comprehensive mock data to demonstrate functionality:

### Sample Questions to Try:

- "What is UI modernization?"
- "How to modernize legacy UI?"
- "What are accessibility requirements?"
- "Best practices for responsive design"
- "How to implement design system?"

### Mock Responses Include:

- **Text Content**: Realistic AI-generated responses
- **Source Citations**: Simulated knowledge base sources
- **Fallback Responses**: Generic responses for unmatched questions

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Quick Start

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm start
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── ChatInterface.js      # Main chat UI component
│   ├── MessageBubble.js      # Message display component
│   ├── FeedbackButtons.js    # Thumbs up/down buttons
│   └── FeedbackModal.js      # Negative feedback modal
├── utils/
│   └── mockData.js          # Mock LLM responses & database
├── App.js                   # Main application component
├── index.js                 # React entry point
└── index.css               # Global styles & Tailwind
```

## Database Schema (Mock)

The application simulates storing feedback data with this structure:

```javascript
{
  question: "User's question",
  answer: "AI response content",
  feedbackType: "thumbsUp" | "thumbsDown",
  feedbackText: "Additional feedback (for thumbs down)",
  timestamp: "ISO timestamp",
  table: "feedback_logs"
}
```

## Key Components

### ChatInterface

- Manages conversation state and message flow
- Handles user input and AI responses
- Integrates feedback collection

### FeedbackButtons

- Thumbs up/down rating buttons
- Triggers feedback collection workflow
- Visual feedback states

### FeedbackModal

- Appears when thumbs down is clicked
- Collects detailed feedback text
- Shows original question and answer for context

## Customization

### Styling

- Uses Tailwind CSS for consistent design
- Custom color scheme in `tailwind.config.js`
- Responsive breakpoints for mobile/desktop

### Mock Data

- Modify `src/utils/mockData.js` to add new responses
- Update database simulation functions
- Add new conversation examples

### API Integration

- Replace mock functions with real API calls
- Update response handling for actual LLM output
- Implement real database operations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Available Scripts

- `npm start` - Start development server
- `npm test` - Run test suite
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App

### Code Style

- ESLint configuration for code quality
- Prettier for consistent formatting
- Component-based architecture
- Functional components with hooks

## Future Enhancements

- **Real API Integration**: Connect to actual RAG LLM backend
- **User Authentication**: User accounts and conversation history
- **Advanced Feedback**: Rating scales, categories, and analytics
- **Export Features**: Download conversation logs and feedback data
- **Multi-language Support**: Internationalization for global users

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
