
import React, { useState } from 'react';
import { ChevronLeft, X, SendIcon } from 'lucide-react';

interface AiChatAssistantProps {
  onClose: () => void;
  articleTitle?: string;
}

const AiChatAssistant: React.FC<AiChatAssistantProps> = ({ onClose, articleTitle }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([
    { text: `Hello! What would you like to know about "${articleTitle || 'the news'}"?`, isUser: false }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    setMessages([...messages, { text: input, isUser: true }]);
    
    // Simulate AI response (this is just UI, no real backend)
    setTimeout(() => {
      const responses = [
        "I'm sorry, I can only provide a static UI response as this is a frontend demo.",
        "That's an interesting question! If this were a real assistant, I'd provide more details about this topic.",
        `This news article covers important events related to ${articleTitle}. What specific aspects are you interested in?`,
        "I'd need a backend integration to provide you with a proper response to that question."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { text: randomResponse, isUser: false }]);
    }, 1000);
    
    setInput('');
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      <div className="bg-news-800 text-white flex justify-between items-center p-4">
        <button 
          className="flex items-center"
          onClick={onClose}
        >
          <ChevronLeft className="w-6 h-6 mr-2" />
          <span>Back to feed</span>
        </button>
        <h2 className="text-lg font-semibold">AI News Assistant</h2>
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                message.isUser 
                  ? 'bg-news-600 text-white rounded-tr-none' 
                  : 'bg-muted text-foreground rounded-tl-none'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <form 
        onSubmit={handleSendMessage}
        className="border-t p-4 flex gap-2"
      >
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something about this news..."
          className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-news-500"
        />
        <button 
          type="submit"
          className="bg-news-600 text-white p-2 rounded-full"
          disabled={!input.trim()}
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default AiChatAssistant;
