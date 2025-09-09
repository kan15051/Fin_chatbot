import React, { useState, useEffect, useRef } from 'react';
// ... rest of your application code
// Define the shape of a message object for type safety
interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const App: React.FC = () => {
  // State to hold the list of messages in the chat
  const [messages, setMessages] = useState<Message[]>([]);
  // State for the message currently being typed by the user
  const [input, setInput] = useState<string>('');
  // Ref to the chat container, used for auto-scrolling
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // A simple way to alternate between user and AI messages for demonstration
  const [isUserTurn, setIsUserTurn] = useState<boolean>(true);

  // Function to handle sending a new message
  const handleSendMessage = async () => {
    if (input.trim() !== '') {
      // Add the user's message to the chat list
      const newMessage: Message = { text: input, sender: 'user' };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInput('');

      const response = await fetch("http://localhost:3000/api/messages", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({message: newMessage}),
      });

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      // Simulate an AI response after a short delay
      setTimeout(() => {
        const aiMessage: Message = { text: "Hello! How can I help you today?", sender: 'ai' };
        setMessages(prevMessages => [...prevMessages, aiMessage]);
      }, 500);
    }
  };

  // Scroll to the bottom of the chat container whenever a new message is added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle Enter key press to send the message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg flex flex-col h-[80vh] md:h-[600px]">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Chat with AI</h1>
        </div>

        {/* Chat Messages Container */}
        <div
          ref={chatContainerRef}
          className="flex-grow p-4 overflow-y-auto space-y-4"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-lg shadow-sm ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input Area */}
        <div className="p-4 border-t border-gray-200 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <button
            onClick={handleSendMessage}
            disabled={input.trim() === ''}
            className="p-3 bg-blue-500 text-white rounded-full disabled:bg-blue-300 transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;