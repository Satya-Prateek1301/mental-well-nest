import { useState } from "react";
import { User, Shield, Bell, Globe, Moon, Sun, Smartphone, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "john.doe@university.edu",
    collegeId: "STU123456",
    phone: "+1 (555) 123-4567",
    isAnonymous: true
  });

  const [privacy, setPrivacy] = useState({
    shareWithCounselors: true,
    allowForumNotifications: true,
    dataAnalyticsOptIn: false,
    sessionRecording: false
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    forumReplies: true,
    wellnessCheckIns: true,
    emergencyAlerts: true
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    biometricAuth: false,
    sessionTimeout: "30"
  });

  const [preferences, setPreferences] = useState({
    language: "en",
    theme: "system",
    timezone: "America/New_York"
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const { toast } = useToast();

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleSavePrivacy = () => {
    toast({
      title: "Privacy Settings Updated", 
      description: "Your privacy preferences have been saved.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Preferences Updated",
      description: "Your notification settings have been saved.",
    });
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const handleDeleteAccount = () => {
    // This would show a confirmation dialog in a real app
    toast({
      title: "Account Deletion Requested",
      description: "Please check your email to confirm account deletion.",
      variant: "destructive"
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account, privacy, and platform preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information. Some details may remain private based on your privacy settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profile.fullName}
                    onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="collegeId">College ID</Label>
                  <Input
                    id="collegeId"
                    value={profile.collegeId}
                    onChange={(e) => setProfile({...profile, collegeId: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <Label className="text-base">Anonymous Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Hide your identity in forum posts and group activities
                  </p>
                </div>
                <Switch
                  checked={profile.isAnonymous}
                  onCheckedChange={(checked) => setProfile({...profile, isAnonymous: checked})}
                />
              </div>

              <Button onClick={handleSaveProfile} className="w-full md:w-auto">
                Save Profile Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Privacy & Data Control
              </CardTitle>
              <CardDescription>
                Control how your data is used and shared within the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-base">Share Progress with Counselors</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow counselors to view your wellness metrics and forum activity
                    </p>
                  </div>
                  <Switch
                    checked={privacy.shareWithCounselors}
                    onCheckedChange={(checked) => setPrivacy({...privacy, shareWithCounselors: checked})}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-base">Forum Activity Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when others interact with your posts
                    </p>
                  </div>
                  <Switch
                    checked={privacy.allowForumNotifications}
                    onCheckedChange={(checked) => setPrivacy({...privacy, allowForumNotifications: checked})}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-base">Anonymous Analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Help improve the platform by sharing anonymous usage data
                    </p>
                  </div>
                  <Switch
                    checked={privacy.dataAnalyticsOptIn}
                    onCheckedChange={(checked) => setPrivacy({...privacy, dataAnalyticsOptIn: checked})}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-base">Session Recording</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow recording of counseling sessions for quality assurance
                    </p>
                  </div>
                  <Switch
                    checked={privacy.sessionRecording}
                    onCheckedChange={(checked) => setPrivacy({...privacy, sessionRecording: checked})}
                  />
                </div>
              </div>

              <Alert className="bg-primary/10 border-primary/20">
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  All data is encrypted and stored securely. Your privacy is our top priority, and you can change these settings at any time.
                </AlertDescription>
              </Alert>

              <Button onClick={handleSavePrivacy} className="w-full md:w-auto">
                Save Privacy Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how and when you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-3">Communication Methods</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <Label className="text-base">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive updates via email</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) => setNotifications({...notifications, emailNotifications: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <Label className="text-base">Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">Browser and app notifications</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) => setNotifications({...notifications, pushNotifications: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <Label className="text-base">SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">Text message alerts</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.smsNotifications}
                        onCheckedChange={(checked) => setNotifications({...notifications, smsNotifications: checked})}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-3">Notification Types</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <Label className="text-base">Appointment Reminders</Label>
                        <p className="text-sm text-muted-foreground">Reminders about upcoming sessions</p>
                      </div>
                      <Switch
                        checked={notifications.appointmentReminders}
                        onCheckedChange={(checked) => setNotifications({...notifications, appointmentReminders: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <Label className="text-base">Forum Replies</Label>
                        <p className="text-sm text-muted-foreground">When someone replies to your posts</p>
                      </div>
                      <Switch
                        checked={notifications.forumReplies}
                        onCheckedChange={(checked) => setNotifications({...notifications, forumReplies: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <Label className="text-base">Wellness Check-ins</Label>
                        <p className="text-sm text-muted-foreground">Daily mood and wellness reminders</p>
                      </div>
                      <Switch
                        checked={notifications.wellnessCheckIns}
                        onCheckedChange={(checked) => setNotifications({...notifications, wellnessCheckIns: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg bg-destructive/5">
                      <div>
                        <Label className="text-base">Emergency Alerts</Label>
                        <p className="text-sm text-muted-foreground">Critical safety notifications (cannot be disabled)</p>
                      </div>
                      <Switch
                        checked={notifications.emergencyAlerts}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveNotifications} className="w-full md:w-auto">
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Protect your account with enhanced security features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Password Change */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  />
                </div>
                <Button onClick={handleChangePassword} variant="outline">
                  Change Password
                </Button>
              </div>

              <Separator />

              {/* Security Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Advanced Security</h3>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={security.twoFactorAuth}
                    onCheckedChange={(checked) => setSecurity({...security, twoFactorAuth: checked})}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-base">Biometric Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Use fingerprint or face recognition on supported devices
                    </p>
                  </div>
                  <Switch
                    checked={security.biometricAuth}
                    onCheckedChange={(checked) => setSecurity({...security, biometricAuth: checked})}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Session Timeout</Label>
                  <Select value={security.sessionTimeout} onValueChange={(value) => setSecurity({...security, sessionTimeout: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Automatically log out after period of inactivity
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions that will permanently affect your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center p-4 border border-destructive rounded-lg bg-destructive/5">
                <div>
                  <h3 className="font-medium text-destructive">Delete Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Platform Preferences
              </CardTitle>
              <CardDescription>
                Customize your experience and interface settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={preferences.language} onValueChange={(value) => setPreferences({...preferences, language: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="hi">हिन्दी</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select value={preferences.theme} onValueChange={(value) => setPreferences({...preferences, theme: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center space-x-2">
                          <Sun className="h-4 w-4" />
                          <span>Light</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center space-x-2">
                          <Moon className="h-4 w-4" />
                          <span>Dark</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select value={preferences.timezone} onValueChange={(value) => setPreferences({...preferences, timezone: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="w-full md:w-auto">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;