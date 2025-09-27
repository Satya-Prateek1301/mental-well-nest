import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Shield, Heart, Users, ArrowRight, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import mindmitraLogo from "@/assets/mindmitra-logo.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src={mindmitraLogo} alt="MindMitra Logo" className="h-10 w-10" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-primary">MindMitra</span>
                <span className="text-xs text-muted-foreground">Your Mental Health Companion</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="btn-hero">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up-1">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                  Your Mental Health
                  <span className="bg-gradient-primary bg-clip-text text-transparent"> Companion</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Confidential, compassionate support for students. Connect with counselors, 
                  access AI-guided wellness tools, and join a supportive peer community.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button className="btn-hero text-lg px-8 py-6">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button className="btn-hero-outline text-lg px-8 py-6">
                    Continue as Guest
                  </Button>
                </Link>
              </div>

              <div className="text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>100% Confidential & Anonymous</span>
                </div>
              </div>
            </div>
            
            <div className="relative animate-slide-up-2">
              <img 
                src={heroImage} 
                alt="Mental Health Support Community" 
                className="rounded-3xl shadow-strong w-full h-auto animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Comprehensive Mental Health Support
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to maintain your mental wellness, all in one secure platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Guided Support",
                description: "24/7 intelligent chatbot for immediate mental health first aid and coping strategies."
              },
              {
                icon: Shield,
                title: "Confidential Booking",
                description: "Private appointment scheduling with licensed counselors. Complete anonymity guaranteed."
              },
              {
                icon: Heart,
                title: "Wellness Resources",
                description: "Curated library of videos, audio guides, and educational materials for mental wellness."
              },
              {
                icon: Users,
                title: "Peer Community",
                description: "Anonymous support forum moderated by trained volunteers. Connect safely with others."
              }
            ].map((feature, index) => (
              <Card key={index} className={`card-feature animate-slide-up-${index + 1}`}>
                <CardContent className="text-center">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="space-y-8 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Prioritize Your Mental Health?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands of students who have found support, healing, and community through MindMitra.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 font-semibold">
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <img src={mindmitraLogo} alt="MindMitra Logo" className="h-8 w-8" />
              <span className="text-lg font-bold text-primary">MindMitra</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Empowering students with accessible, confidential mental health support.
            </p>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>Crisis Hotline: 988 | Emergency: 911</div>
              <div>© 2024 MindMitra. Your privacy and wellbeing are our priority.</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
