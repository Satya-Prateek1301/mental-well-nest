import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import AIChatbot from "./pages/AIChatbot";
import BookingSystem from "./pages/BookingSystem";
import ResourceHub from "./pages/ResourceHub";
import PeerForum from "./pages/PeerForum";
import AdminDashboard from "./pages/AdminDashboard";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<Layout />}>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="chat" element={<AIChatbot />} />
            <Route path="booking" element={<BookingSystem />} />
            <Route path="resources" element={<ResourceHub />} />
            <Route path="forum" element={<PeerForum />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
