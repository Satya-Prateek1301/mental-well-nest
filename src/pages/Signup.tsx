import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Brain, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import mindmitraLogo from "@/assets/mindmitra-logo.png";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    collegeId: "",
    role: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    subscribeUpdates: false
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Please ensure both passwords match.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.agreeToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms of service to continue.",
        variant: "destructive"
      });
      return;
    }

    // Mock signup - replace with actual registration when backend is connected
    toast({
      title: "Account Created Successfully!",
      description: "Welcome to MindMitra. Let's start your wellness journey.",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
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
            <CardTitle className="text-2xl">Join MindMitra</CardTitle>
            <CardDescription>
              Create your account and start your mental wellness journey today
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

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  required
                />
              </div>

              {/* Email and College ID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@university.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="collegeId">
                    College ID 
                    <span className="text-xs text-muted-foreground ml-1">(Optional)</span>
                  </Label>
                  <Input
                    id="collegeId"
                    type="text"
                    placeholder="Student ID"
                    value={formData.collegeId}
                    onChange={(e) => setFormData({...formData, collegeId: e.target.value})}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
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

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData({...formData, agreeToTerms: checked as boolean})}
                />
                <div className="text-sm">
                  <label htmlFor="terms" className="text-muted-foreground cursor-pointer">
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>

              {/* Newsletter Subscription */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="updates"
                  checked={formData.subscribeUpdates}
                  onCheckedChange={(checked) => setFormData({...formData, subscribeUpdates: checked as boolean})}
                />
                <label htmlFor="updates" className="text-sm text-muted-foreground cursor-pointer">
                  Send me wellness tips and platform updates
                </label>
              </div>

              <Button type="submit" className="btn-hero w-full">
                Create Account
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in here
              </Link>
            </div>

            {/* Privacy Notice */}
            <div className="text-xs text-muted-foreground text-center bg-muted/50 p-3 rounded-lg space-y-2">
              <div className="flex items-center justify-center space-x-1">
                <Brain className="h-4 w-4" />
                <span className="font-medium">100% Confidential & Secure</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-3 w-3 text-success" />
                  <span>End-to-end encryption</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-3 w-3 text-success" />
                  <span>Anonymous forum participation</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-3 w-3 text-success" />
                  <span>HIPAA compliant</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;