import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, Bot, User, FileText, Lightbulb } from 'lucide-react';
import { ChatMessage } from '../types';
import { mockPapers } from '../data/mockData';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI research assistant. I can help you analyze research papers, extract insights, and answer questions about your uploaded documents. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (query: string): string => {
    const queryLower = query.toLowerCase();
    
    if (queryLower.includes('methodology') || queryLower.includes('method')) {
      return 'Based on the papers in your collection, I can see several key methodologies being used:\n\n• **Randomized Controlled Trials (RCTs)** - Most common in clinical studies like the CRISPR gene editing research\n• **Meta-analysis** - Used extensively in the neuroimaging machine learning study\n• **Systematic Reviews** - Particularly in the climate change and pollinator diversity research\n\nWould you like me to dive deeper into any specific methodology or help you compare methodological approaches across different studies?';
    }
    
    if (queryLower.includes('finding') || queryLower.includes('result')) {
      return 'Here are some of the most significant findings from your recent papers:\n\n🧠 **Neuroimaging & AI**: Deep learning models achieved 89.3% accuracy in brain tumor classification, with CNNs outperforming traditional ML by 12.7%\n\n🧬 **Gene Therapy**: CRISPR-Cas9 showed 23% reduction in motor symptoms with 78% of patients showing clinical improvement\n\n🌍 **Climate Impact**: 34% decline in pollinator species richness per 1°C temperature increase, with Mediterranean ecosystems most vulnerable\n\nWhich finding would you like me to analyze further or compare with related research?';
    }
    
    if (queryLower.includes('limitation') || queryLower.includes('weakness')) {
      return 'I\'ve identified several common limitations across your research collection:\n\n⚠️ **Sample Size Issues**: Many studies have limited sample sizes or lack diversity in populations\n⚠️ **Follow-up Periods**: Short-term studies (like the 12-month CRISPR trial) need longer observation periods\n⚠️ **Geographic Bias**: Research tends to focus on temperate regions, missing tropical/Arctic data\n⚠️ **Methodological Heterogeneity**: Inconsistent protocols make cross-study comparisons difficult\n\nThese limitations often represent opportunities for future replication studies. Would you like suggestions for addressing any specific limitation?';
    }
    
    if (queryLower.includes('replication') || queryLower.includes('future')) {
      return 'Based on the identified limitations, here are my top replication study suggestions:\n\n🔬 **Extended CRISPR Trials**: Conduct 5+ year follow-up studies to assess long-term safety and efficacy\n\n🌐 **Global Pollinator Studies**: Replicate climate impact research in tropical and Arctic regions with standardized protocols\n\n🧠 **Multi-center AI Validation**: Implement neuroimaging AI models across diverse medical centers with varied equipment\n\n⚖️ **Quantum Computing Benchmarks**: Develop standardized benchmarks for quantum drug discovery applications\n\nWould you like me to help design a specific replication study protocol for any of these areas?';
    }
    
    if (queryLower.includes('collaboration') || queryLower.includes('partner')) {
      return 'I\'ve identified 89 potential collaboration opportunities based on your research interests:\n\n🤝 **Complementary Expertise**: Researchers working on related problems with different methodological approaches\n🌍 **Geographic Expansion**: International collaborators who could help address geographic bias in studies\n💡 **Interdisciplinary Connections**: Opportunities to bridge different research domains (e.g., AI + Biology)\n📊 **Resource Sharing**: Labs with complementary equipment or data sets\n\nWould you like me to suggest specific collaboration opportunities based on your research focus?';
    }
    
    return 'I can help you with various aspects of research analysis:\n\n• **Paper Analysis**: Extract key insights, methodologies, and findings\n• **Comparative Studies**: Compare approaches across different papers\n• **Research Gaps**: Identify opportunities for new research\n• **Collaboration**: Find potential research partners\n• **Replication Ideas**: Suggest follow-up studies\n\nTry asking me about specific aspects like "What are the main findings?" or "Show me the limitations" or "Suggest replication studies."';
  };

  const quickQuestions = [
    'What are the key findings across all papers?',
    'Show me common limitations in the studies',
    'Suggest potential replication studies',
    'What methodologies are most commonly used?'
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex flex-col h-screen">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Research Assistant</h1>
              <p className="text-gray-600">Ask questions about your research papers and get intelligent insights</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-blue-600' 
                    : 'bg-gradient-to-r from-violet-600 to-purple-600'
                }`}>
                  {message.type === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className={`rounded-2xl p-4 ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-900'
                }`}>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex space-x-3 max-w-3xl">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="px-6 pb-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
                <Lightbulb className="h-4 w-4 text-yellow-600" />
                <span>Quick Questions</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => setInputValue(question)}
                    className="text-left p-3 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="bg-white border-t border-gray-200 p-6">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about your research papers..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12"
                disabled={isTyping}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
            >
              <Send className="h-4 w-4" />
              <span>Send</span>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            AI responses are based on your uploaded research papers and may not reflect the latest research.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;