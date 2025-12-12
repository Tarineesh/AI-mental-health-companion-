import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles, Loader2 } from 'lucide-react';
import { Message } from '../types';
import { sendMessageStream } from '../services/geminiService';

interface ChatInterfaceProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, setMessages }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setIsLoading(true);

    try {
      const modelMessageId = (Date.now() + 1).toString();
      // Initialize empty model message
      setMessages(prev => [...prev, {
        id: modelMessageId,
        role: 'model',
        text: '',
        isStreaming: true
      }]);

      let fullResponse = '';
      
      const stream = sendMessageStream(userMessage.text);
      
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === modelMessageId 
            ? { ...msg, text: fullResponse }
            : msg
        ));
      }

      setMessages(prev => prev.map(msg => 
        msg.id === modelMessageId 
          ? { ...msg, isStreaming: false }
          : msg
      ));

    } catch (error) {
      console.error(error);
      // Optional: Handle error in UI
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white/50 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-sage-200">
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] md:max-w-[75%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                msg.role === 'user' ? 'bg-sage-600 text-white' : 'bg-white border border-sage-200 text-sage-600 shadow-sm'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} />}
              </div>

              {/* Bubble */}
              <div
                className={`p-4 rounded-2xl text-sm md:text-base leading-relaxed whitespace-pre-wrap shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-sage-600 text-white rounded-tr-none'
                    : 'bg-white border border-sage-100 text-slate-700 rounded-tl-none'
                }`}
              >
                {msg.text}
                {msg.isStreaming && (
                  <span className="inline-block w-2 h-2 ml-1 bg-sage-400 rounded-full animate-pulse" />
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/80 border-t border-sage-100">
        <div className="relative flex items-end gap-2 p-2 bg-sage-50 border border-sage-200 rounded-2xl focus-within:ring-2 focus-within:ring-sage-300 focus-within:border-transparent transition-all shadow-inner">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Share what's on your mind..."
            className="w-full bg-transparent border-none text-slate-700 placeholder-sage-400 focus:ring-0 resize-none max-h-32 py-2 px-2 text-sm md:text-base"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-2 rounded-xl flex-shrink-0 transition-all ${
              input.trim() && !isLoading
                ? 'bg-sage-600 text-white shadow-md hover:bg-sage-700 hover:scale-105'
                : 'bg-sage-200 text-sage-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
        <p className="text-center text-xs text-sage-400 mt-2">
          Serene is an AI companion, not a professional. In a crisis, please seek professional help.
        </p>
      </div>
    </div>
  );
};
