import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../features/openai/openaiSlice';

function OpenAIChatbot() {
  const dispatch = useDispatch();
  const chatHistory = useSelector((state) => state.openai.chatHistory);
  const isLoading = useSelector((state) => state.openai.isLoading);

  const handleUserMessage = (message) => {
    dispatch(sendMessage(message));
  };

  return (
    <div className="chatbot">
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
      </div>
      <div className="user-input">
        <input
          type="text"
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (e.target.value.trim() !== '') {
                handleUserMessage(e.target.value);
                e.target.value = '';
              }
            }
          }}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}

export default OpenAIChatbot;
