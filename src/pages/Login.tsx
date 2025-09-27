import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import mindmitraLogo from "@/assets/mindmitra-logo.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: ""
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - replace with actual authentication when backend is connected
    toast({
      title: "Login Successful",
      description: "Welcome back to MindMitra!",
    });
    navigate("/dashboard");
  };

  const handleGuestLogin = () => {
    toast({
      title: "Guest Access Granted",
      description: "You have limited access to resources and forums.",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center space-x-3 mb-8">
          <img src={mindmitraLogo} alt="MindMitra Logo" className="h-12 w-12" />
          <div className="text-center">
            <div className="text-2xl font-bold text-white">MindMitra</div>
            <div className="text-sm text-white/80">Your Mental Health Companion</div>
          </div>
        </Link>

        <Card className="card-gradient shadow-strong">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to continue your mental wellness journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role">I am a</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="counselor">Counselor</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email or College ID</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your email or student ID"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="btn-hero w-full">
                Sign In
              </Button>
            </form>

            {/* Guest Access */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <Button onClick={handleGuestLogin} variant="outline" className="w-full">
              Continue as Guest
              <span className="ml-2 text-xs">(Limited Access)</span>
            </Button>

            {/* Links */}
            <div className="text-center space-y-2">
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot your password?
              </Link>
              <div className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline font-medium">
                  Sign up here
                </Link>
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="text-xs text-muted-foreground text-center bg-muted/50 p-3 rounded-lg">
              <Brain className="h-4 w-4 inline mr-1" />
              Your privacy is our priority. All sessions are confidential and secure.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;