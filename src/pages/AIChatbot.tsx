import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, AlertTriangle, Heart, Lightbulb, RefreshCw } from "lucide-react";
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

    // Enhanced AI response system with context-aware replies
    setTimeout(() => {
      let response;
      const userMessage = messageText.toLowerCase();
      
      // Anxiety-related responses
      if (userMessage.includes('anxious') || userMessage.includes('anxiety') || userMessage.includes('worried') || userMessage.includes('nervous')) {
        const anxietyResponses = [
          {
            text: "I understand you're feeling anxious. That's completely normal and you're not alone. Let's try a quick grounding technique: Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This can help bring you back to the present moment.",
            suggestions: ["Guide me through breathing", "More grounding techniques", "I need to talk to someone"]
          },
          {
            text: "Anxiety can feel overwhelming, but you're taking a positive step by reaching out. Try the 4-7-8 breathing technique: Breathe in for 4 counts, hold for 7, exhale for 8. Repeat 3-4 times. This activates your body's relaxation response.",
            suggestions: ["Tell me more breathing exercises", "What causes my anxiety?", "Book a counselor session"]
          },
          {
            text: "Your anxiety is valid, and it's okay to feel this way. Sometimes anxiety is our mind's way of trying to protect us. Have you noticed any specific triggers? Understanding patterns can help us develop better coping strategies.",
            suggestions: ["Help identify triggers", "Coping strategies", "I want professional help"]
          }
        ];
        response = anxietyResponses[Math.floor(Math.random() * anxietyResponses.length)];
      }
      // Stress-related responses
      else if (userMessage.includes('stress') || userMessage.includes('overwhelmed') || userMessage.includes('pressure')) {
        const stressResponses = [
          {
            text: "I hear that you're feeling stressed and overwhelmed. That's a common experience, especially in academic settings. Let's break this down: What's the biggest thing causing you stress right now? Sometimes naming it can help us tackle it step by step.",
            suggestions: ["Academic stress help", "Time management tips", "I need a break"]
          },
          {
            text: "Stress can feel like carrying a heavy weight. One effective technique is the 'stress container' method: Imagine putting your worries in a container and setting it aside for now. You can revisit them later when you're in a better headspace to handle them.",
            suggestions: ["More stress techniques", "Help with priorities", "Talk to a counselor"]
          },
          {
            text: "When we're overwhelmed, everything can seem urgent. Let's use the Eisenhower Matrix: divide your tasks into urgent/important, important/not urgent, urgent/not important, and neither. This can help you focus on what truly matters.",
            suggestions: ["Help me organize tasks", "Study techniques", "I need support"]
          }
        ];
        response = stressResponses[Math.floor(Math.random() * stressResponses.length)];
      }
      // Sleep-related responses
      else if (userMessage.includes('sleep') || userMessage.includes('insomnia') || userMessage.includes('tired') || userMessage.includes('exhausted')) {
        const sleepResponses = [
          {
            text: "Sleep issues can really impact our mental health and daily functioning. Good sleep hygiene is crucial: try to maintain consistent sleep/wake times, avoid screens 1 hour before bed, and create a relaxing bedtime routine. What's your current sleep pattern like?",
            suggestions: ["Sleep hygiene tips", "Relaxation techniques", "Why can't I sleep?"]
          },
          {
            text: "Being tired can make everything feel harder. Try the '4-7-8' breathing technique before bed, or progressive muscle relaxation: tense and release each muscle group from your toes to your head. A cool, dark room can also help signal to your brain that it's time to rest.",
            suggestions: ["Bedtime routine ideas", "Relaxation exercises", "Still can't sleep"]
          }
        ];
        response = sleepResponses[Math.floor(Math.random() * sleepResponses.length)];
      }
      // Depression-related responses
      else if (userMessage.includes('depress') || userMessage.includes('sad') || userMessage.includes('hopeless') || userMessage.includes('empty')) {
        const depressionResponses = [
          {
            text: "I'm really glad you reached out. Depression can make everything feel heavy and hopeless, but please know that these feelings, while very real, are temporary. You matter, and there are people who want to help you through this. Have you been able to talk to anyone else about how you're feeling?",
            suggestions: ["I need professional help", "Coping with depression", "Support resources"]
          },
          {
            text: "Depression can make even small tasks feel overwhelming. Sometimes it helps to start with tiny steps: getting dressed, stepping outside for fresh air, or reaching out to one person. These aren't cure-alls, but they can create small moments of accomplishment. What feels manageable for you right now?",
            suggestions: ["Small daily goals", "Connect with counselor", "Just need someone to listen"]
          }
        ];
        response = depressionResponses[Math.floor(Math.random() * depressionResponses.length)];
      }
      // Breathing exercise requests
      else if (userMessage.includes('breathing') || userMessage.includes('breathe')) {
        response = {
          text: "Great choice! Breathing exercises are very effective. Let's do the box breathing technique together: \n\n1. Breathe in slowly for 4 counts\n2. Hold your breath for 4 counts\n3. Exhale slowly for 4 counts\n4. Hold empty for 4 counts\n\nRepeat this cycle 4-6 times. Focus on the counting and the sensation of your breath. You've got this!",
          suggestions: ["Another breathing exercise", "I feel better", "More relaxation techniques"]
        };
      }
      // Positive/greeting responses
      else if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('good') || userMessage.includes('better')) {
        const positiveResponses = [
          {
            text: "Hello! It's wonderful to connect with you. I'm here to provide support, listen, and help you explore coping strategies. How are you feeling today? Remember, there's no judgment here - this is your safe space.",
            suggestions: ["I'm doing well", "Having a tough day", "Just want to chat"]
          },
          {
            text: "Hi there! I'm so glad you're here. Taking time to check in with yourself shows real self-awareness and strength. What's on your mind today? Whether it's something specific or you just want to talk, I'm here to listen.",
            suggestions: ["Feeling anxious", "Academic stress", "Just exploring"]
          }
        ];
        response = positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
      }
      // Default responses for other topics
      else {
        const generalResponses = [
          {
            text: "Thank you for sharing that with me. It takes courage to open up about what you're experiencing. I'm here to listen and support you. Can you tell me a bit more about what's going on? Sometimes talking through our thoughts can help us process them better.",
            suggestions: ["Tell me more", "I need coping strategies", "Connect me with help"]
          },
          {
            text: "I hear you, and I want you to know that your feelings are valid. Mental health is just as important as physical health, and seeking support is a sign of strength, not weakness. What kind of support feels most helpful to you right now?",
            suggestions: ["Immediate coping help", "Long-term support", "Crisis resources"]
          },
          {
            text: "Thank you for trusting me with your thoughts. Everyone's mental health journey is unique, and there's no 'right' way to feel. What you're experiencing matters. Would you like to explore some coping strategies, or would you prefer to talk more about what's on your mind?",
            suggestions: ["Coping strategies", "Keep talking", "Professional resources"]
          }
        ];
        response = generalResponses[Math.floor(Math.random() * generalResponses.length)];
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: response.suggestions
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

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: "Hello! I'm your AI mental health companion. I'm here to provide immediate support, coping strategies, and wellness guidance. How are you feeling today?",
        sender: 'bot',
        timestamp: new Date(),
        suggestions: ["I'm feeling anxious", "I'm having trouble sleeping", "I'm feeling overwhelmed", "I just need someone to talk to"]
      }
    ]);
  };

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
        <div className="absolute inset-0 flex items-center justify-between text-white px-6">
          <div className="text-center flex-1">
            <Bot className="h-12 w-12 mx-auto mb-2" />
            <h1 className="text-2xl font-bold">AI Mental Health Assistant</h1>
            <p className="text-sm opacity-90">Confidential • Available 24/7 • Immediate Support</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20"
            onClick={clearChat}
          >
            <RefreshCw className="h-5 w-5" />
          </Button>
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