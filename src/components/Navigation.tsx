import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Bot, 
  Calendar, 
  BookOpen, 
  Users, 
  Settings,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/chat", icon: Bot, label: "AI Support" },
    { path: "/booking", icon: Calendar, label: "Book Session" },
    { path: "/resources", icon: BookOpen, label: "Resources" },
    { path: "/forum", icon: Users, label: "Peer Forum" },
    { path: "/admin", icon: Shield, label: "Admin", adminOnly: true },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  // Mock user role - replace with actual user context when backend is connected
  const userRole: "student" | "counselor" | "admin" = "admin"; // Change to test admin features

  return (
    <nav className="w-64 bg-card border-r border-border min-h-screen p-4">
      <div className="space-y-2">
        {navItems.map((item) => {
          // Hide admin routes for non-admin users
          if (item.adminOnly && userRole !== "admin") return null;

          const Icon = item.icon;
          const isActive = currentPath === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 transition-transform duration-200",
                isActive ? "scale-110" : "group-hover:scale-105"
              )} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Emergency Contact */}
      <div className="mt-8 p-4 bg-destructive/10 rounded-xl border border-destructive/20">
        <h3 className="font-semibold text-destructive mb-2">Need Immediate Help?</h3>
        <p className="text-sm text-muted-foreground mb-3">
          If you're in crisis, please contact emergency services immediately.
        </p>
        <div className="space-y-1 text-sm">
          <div className="font-medium">Emergency: 911</div>
          <div className="font-medium">Crisis Hotline: 988</div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;