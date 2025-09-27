import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, AlertTriangle, Heart, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import chatbotBg from "@/assets/chatbot-bg.jpg";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI mental health companion. I'm here to provide immediate support, coping strategies, and wellness guidance. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date(),
      suggestions: ["I'm feeling anxious", "I'm having trouble sleeping", "I'm feeling overwhelmed", "I just need someone to talk to"]
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputMessage.trim();
    if (!messageText) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response - replace with actual AI integration
    setTimeout(() => {
      const responses = [
        {
          text: "I understand you're feeling anxious. That's completely normal and you're not alone. Let's try a quick breathing exercise: Breathe in for 4 counts, hold for 4, then breathe out for 6. Would you like me to guide you through this?",
          suggestions: ["Yes, guide me through breathing", "Tell me more coping strategies", "I need help with something else"]
        },
        {
          text: "It sounds like you're going through a challenging time. Remember, seeking help is a sign of strength. Have you considered talking to a counselor? I can help you book a confidential session.",
          suggestions: ["Book a counselor session", "Tell me about other resources", "I want to try self-help first"]
        },
        {
          text: "Sleep issues can really impact our mental health. Here are some tips: maintain a consistent sleep schedule, avoid screens 1 hour before bed, try relaxation techniques. Would you like specific guided meditations for sleep?",
          suggestions: ["Yes, show me meditations", "Tell me about sleep hygiene", "I think there's another cause"]
        }
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: randomResponse.suggestions
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const quickResponses = [
    { text: "I'm feeling anxious", icon: AlertTriangle, color: "text-warning" },
    { text: "I need breathing exercises", icon: Heart, color: "text-primary" },
    { text: "Show me coping strategies", icon: Lightbulb, color: "text-secondary" },
    { text: "I want to talk to someone", icon: User, color: "text-accent" }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="relative">
        <div 
          className="h-32 bg-cover bg-center rounded-t-2xl"
          style={{ backgroundImage: `url(${chatbotBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-primary/80 rounded-t-2xl"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center">
            <Bot className="h-12 w-12 mx-auto mb-2" />
            <h1 className="text-2xl font-bold">AI Mental Health Assistant</h1>
            <p className="text-sm opacity-90">Confidential • Available 24/7 • Immediate Support</p>
          </div>
        </div>
      </div>

      {/* Crisis Alert */}
      <Alert className="m-4 border-destructive/50 bg-destructive/10">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>In Crisis?</strong> If you're having thoughts of self-harm, please contact emergency services (911) 
          or the crisis hotline (988) immediately. This AI cannot replace professional crisis intervention.
        </AlertDescription>
      </Alert>

      {/* Quick Response Buttons */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 gap-2">
          {quickResponses.map((response, index) => (
            <Button
              key={index}
              variant="outline"
              className="text-left justify-start h-auto p-3"
              onClick={() => handleSendMessage(response.text)}
            >
              <response.icon className={`h-4 w-4 mr-2 ${response.color}`} />
              <span className="text-sm">{response.text}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
              {message.sender === 'bot' && (
                <div className="flex items-center mb-1">
                  <Bot className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm font-medium text-primary">AI Assistant</span>
                </div>
              )}
              
              <Card className={message.sender === 'user' 
                ? "bg-primary text-primary-foreground" 
                : "bg-card"
              }>
                <CardContent className="p-3">
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-2 ${
                    message.sender === 'user' 
                      ? 'text-primary-foreground/70' 
                      : 'text-muted-foreground'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </CardContent>
              </Card>

              {/* Suggestion buttons for bot messages */}
              {message.sender === 'bot' && message.suggestions && (
                <div className="mt-2 space-y-1">
                  {message.suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="text-xs h-auto p-2 text-left justify-start w-full"
                      onClick={() => handleSendMessage(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2 bg-muted p-3 rounded-lg">
              <Bot className="h-4 w-4 text-primary" />
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex space-x-2"
        >
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button type="submit" disabled={!inputMessage.trim() || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          This AI provides support but cannot replace professional medical advice.
        </p>
      </div>
    </div>
  );
};

export default AIChatbot;