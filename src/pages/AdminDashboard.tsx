import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Users, Calendar, MessageSquare, TrendingUp, AlertTriangle, Eye, BarChart3, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";

interface AnalyticsData {
  totalStudents: number;
  activeUsers: number;
  appointmentsThisWeek: number;
  forumPosts: number;
  averageRating: number;
  crisisInterventions: number;
}

interface AppointmentData {
  id: string;
  studentId: string;
  counselorName: string;
  date: string;
  time: string;
  type: 'online' | 'in-person' | 'phone';
  status: 'scheduled' | 'completed' | 'cancelled';
  priority: 'normal' | 'urgent';
}

interface AlertData {
  id: string;
  type: 'high-stress' | 'crisis-pattern' | 'low-engagement';
  description: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high';
  resolved: boolean;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  
  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  const [timeRange, setTimeRange] = useState("week");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  // Mock data - replace with real API data
  const analytics: AnalyticsData = {
    totalStudents: 2847,
    activeUsers: 1256,
    appointmentsThisWeek: 89,
    forumPosts: 234,
    averageRating: 4.7,
    crisisInterventions: 3
  };

  const upcomingAppointments: AppointmentData[] = [
    {
      id: "1",
      studentId: "STU-001",
      counselorName: "Dr. Sarah Johnson",
      date: "2024-01-16",
      time: "10:00 AM",
      type: "online",
      status: "scheduled",
      priority: "urgent"
    },
    {
      id: "2", 
      studentId: "STU-002",
      counselorName: "Dr. Michael Chen",
      date: "2024-01-16",
      time: "2:00 PM",
      type: "in-person",
      status: "scheduled",
      priority: "normal"
    },
    {
      id: "3",
      studentId: "STU-003",
      counselorName: "Dr. Emily Rodriguez",
      date: "2024-01-16",
      time: "4:00 PM",
      type: "phone",
      status: "scheduled",
      priority: "normal"
    }
  ];

  const recentAlerts: AlertData[] = [
    {
      id: "1",
      type: "high-stress",
      description: "Computer Engineering department showing 40% increase in stress-related appointments",
      timestamp: new Date(2024, 0, 15, 14, 30),
      severity: "high",
      resolved: false
    },
    {
      id: "2",
      type: "crisis-pattern",
      description: "Student requiring immediate intervention - crisis protocol activated",
      timestamp: new Date(2024, 0, 15, 11, 15),
      severity: "high",
      resolved: true
    },
    {
      id: "3",
      type: "low-engagement",
      description: "Pre-med students showing decreased platform engagement",
      timestamp: new Date(2024, 0, 14, 16, 45),
      severity: "medium",
      resolved: false
    }
  ];

  const departmentStats = [
    { name: "Computer Science", students: 456, utilization: 78, trend: "+12%" },
    { name: "Engineering", students: 389, utilization: 85, trend: "+8%" },
    { name: "Business", students: 324, utilization: 62, trend: "-3%" },
    { name: "Liberal Arts", students: 298, utilization: 71, trend: "+15%" },
    { name: "Pre-Med", students: 267, utilization: 89, trend: "+5%" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-primary text-primary-foreground';
      case 'completed': return 'bg-success text-success-foreground';
      case 'cancelled': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    return priority === 'urgent' 
      ? 'border-l-4 border-destructive bg-destructive/5' 
      : 'border-l-4 border-primary bg-primary/5';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Monitor platform usage, student wellbeing trends, and system health
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="cs">Computer Science</SelectItem>
              <SelectItem value="eng">Engineering</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="arts">Liberal Arts</SelectItem>
              <SelectItem value="premed">Pre-Med</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Critical Alerts */}
      {recentAlerts.filter(alert => !alert.resolved && alert.severity === 'high').length > 0 && (
        <Alert className="border-destructive bg-destructive/10">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Critical Alert:</strong> {recentAlerts.filter(alert => !alert.resolved && alert.severity === 'high').length} high-priority issues require immediate attention.
          </AlertDescription>
        </Alert>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-gradient">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Active Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{analytics.activeUsers.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">
              of {analytics.totalStudents.toLocaleString()} registered
            </p>
            <Progress value={(analytics.activeUsers / analytics.totalStudents) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-secondary" />
              Weekly Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">{analytics.appointmentsThisWeek}</div>
            <p className="text-sm text-muted-foreground">+15% from last week</p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-accent" />
              Forum Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{analytics.forumPosts}</div>
            <p className="text-sm text-muted-foreground">posts this week</p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-success" />
              Satisfaction Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">{analytics.averageRating}/5.0</div>
            <p className="text-sm text-muted-foreground">average rating</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Department Utilization */}
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Department Utilization</CardTitle>
                <CardDescription>Platform usage by academic department</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {departmentStats.map((dept, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{dept.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{dept.utilization}%</span>
                        <Badge variant={dept.trend.startsWith('+') ? 'default' : 'destructive'}>
                          {dept.trend}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={dept.utilization} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Recent Platform Activity</CardTitle>
                <CardDescription>Latest actions and engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <div className="flex-1">
                      <p className="font-medium">New counselor session booked</p>
                      <p className="text-sm text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30">
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    <div className="flex-1">
                      <p className="font-medium">Forum post flagged for review</p>
                      <p className="text-sm text-muted-foreground">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    <div className="flex-1">
                      <p className="font-medium">AI support session completed</p>
                      <p className="text-sm text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Appointments Tab */}
        <TabsContent value="appointments" className="space-y-6">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
              <CardDescription>Scheduled counseling sessions requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className={`p-4 rounded-lg ${getPriorityColor(appointment.priority)}`}>
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{appointment.time}</span>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                          {appointment.priority === 'urgent' && (
                            <Badge variant="destructive">Urgent</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Student ID: {appointment.studentId} • {appointment.counselorName}
                        </p>
                        <p className="text-sm">
                          {appointment.type === 'online' ? 'Video Call' : 
                           appointment.type === 'phone' ? 'Phone Call' : 'In-Person'}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Usage Trends
                </CardTitle>
                <CardDescription>Platform engagement over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  [Chart placeholder - integrate with actual chart library]
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Wellness Metrics</CardTitle>
                <CardDescription>Student wellbeing indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Average Session Rating</span>
                    <span className="font-medium">4.7/5.0</span>
                  </div>
                  <Progress value={94} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Crisis Interventions</span>
                    <span className="font-medium text-destructive">{analytics.crisisInterventions}</span>
                  </div>
                  <Progress value={10} className="bg-destructive/20" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Follow-up Compliance</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <Progress value={87} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>System Alerts & Notifications</CardTitle>
              <CardDescription>Issues requiring administrative attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 rounded-lg border bg-card">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className={`h-4 w-4 ${getSeverityColor(alert.severity)}`} />
                          <Badge variant={alert.resolved ? 'secondary' : 'destructive'}>
                            {alert.resolved ? 'Resolved' : alert.severity.toUpperCase()}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {alert.timestamp.toLocaleString()}
                          </span>
                        </div>
                        <p className="font-medium">{alert.description}</p>
                        <p className="text-sm text-muted-foreground">
                          Type: {alert.type.replace('-', ' ')}
                        </p>
                      </div>
                      {!alert.resolved && (
                        <Button variant="outline" size="sm">
                          Take Action
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;