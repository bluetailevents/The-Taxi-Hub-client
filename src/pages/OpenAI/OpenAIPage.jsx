// OpenAIPage.jsx
import React, { useState } from 'react';
import OpenAIChatbot from '../../components/openai/OpenAIChatbot';

function OpenAIPage() {
  const [chatHistory, setChatHistory] = useState([]);

  const handleUserMessage = (message) => {
    // Handle user messages and responses here
    // You can use OpenAI API or any other method to generate responses
    const newMessage = { role: 'user', content: message };
    setChatHistory([...chatHistory, newMessage]);
    // Call a function to generate and add the AI response to chatHistory
  };

  return (
    <div>
      <h2>OpenAI Page</h2>
      <OpenAIChatbot
        chatHistory={chatHistory}
        onUserMessage={handleUserMessage}
      />
    </div>
  );
}

export default OpenAIPage;
