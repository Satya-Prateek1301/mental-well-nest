import { Link } from "react-router-dom";
import { Brain, Calendar, BookOpen, Users, MessageCircle, Activity, TrendingUp, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const StudentDashboard = () => {
  // Mock data - replace with real data when backend is connected
  const moodScore = 75;
  const weeklyGoals = [
    { task: "Daily meditation", progress: 85, completed: 6, total: 7 },
    { task: "Sleep 8 hours", progress: 71, completed: 5, total: 7 },
    { task: "Exercise routine", progress: 57, completed: 4, total: 7 }
  ];

  const quickActions = [
    {
      title: "Chat with AI Assistant",
      description: "Get immediate support and coping strategies",
      icon: Brain,
      color: "bg-primary",
      link: "/chat",
      urgent: false
    },
    {
      title: "Book Counselor Session",
      description: "Schedule a confidential appointment",
      icon: Calendar,
      color: "bg-secondary",
      link: "/booking",
      urgent: false
    },
    {
      title: "Explore Resources",
      description: "Videos, guides, and wellness tools",
      icon: BookOpen,
      color: "bg-accent",
      link: "/resources",
      urgent: false
    },
    {
      title: "Peer Support Forum",
      description: "Connect with others anonymously",
      icon: Users,
      color: "bg-success",
      link: "/forum",
      urgent: false
    }
  ];

  const recentActivity = [
    { action: "Completed breathing exercise", time: "2 hours ago", type: "wellness" },
    { action: "Posted in anxiety support forum", time: "1 day ago", type: "community" },
    { action: "Watched stress management video", time: "2 days ago", type: "learning" }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back, John!</h1>
            <p className="text-muted-foreground">How are you feeling today?</p>
          </div>
          <Button className="btn-hero">
            <Activity className="mr-2 h-4 w-4" />
            Quick Mood Check
          </Button>
        </div>
      </div>

      {/* Mood & Wellness Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-gradient">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Heart className="mr-2 h-5 w-5 text-primary" />
              Current Mood
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="text-3xl font-bold text-primary">{moodScore}/100</div>
              <div className="flex-1">
                <Progress value={moodScore} className="h-2" />
                <p className="text-sm text-muted-foreground mt-1">Good progress this week!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-secondary" />
              Weekly Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary mb-2">5 days</div>
            <p className="text-sm text-muted-foreground">
              You've been consistent with your wellness routine
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <MessageCircle className="mr-2 h-5 w-5 text-accent" />
              Support Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="mb-2">Active Support</Badge>
            <p className="text-sm text-muted-foreground">
              Your support network is strong
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.link}>
              <Card className="card-feature hover:scale-105 transition-transform duration-200 h-full">
                <CardContent className="text-center space-y-4">
                  <div className={`${action.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto`}>
                    <action.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                    <p className="text-muted-foreground text-sm">{action.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Weekly Goals Progress */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="text-xl">This Week's Wellness Goals</CardTitle>
          <CardDescription>Track your progress towards a healthier mindset</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {weeklyGoals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{goal.task}</span>
                <span className="text-sm text-muted-foreground">
                  {goal.completed}/{goal.total} days
                </span>
              </div>
              <Progress value={goal.progress} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="text-xl">Recent Activity</CardTitle>
          <CardDescription>Your wellness journey highlights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
                <Badge variant={activity.type === 'wellness' ? 'default' : 'secondary'}>
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;