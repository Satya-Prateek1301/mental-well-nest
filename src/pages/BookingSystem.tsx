import { useState } from "react";
import { Calendar, Clock, Video, MapPin, Phone, Shield, CheckCircle, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface Counselor {
  id: string;
  name: string;
  specializations: string[];
  rating: number;
  experience: string;
  nextAvailable: string;
  sessionTypes: ('online' | 'in-person' | 'phone')[];
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

const BookingSystem = () => {
  const [selectedCounselor, setSelectedCounselor] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [sessionType, setSessionType] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const { toast } = useToast();

  // Mock data - replace with real API data
  const counselors: Counselor[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specializations: ["Anxiety", "Depression", "Stress Management"],
      rating: 4.9,
      experience: "8 years",
      nextAvailable: "Tomorrow",
      sessionTypes: ["online", "in-person", "phone"]
    },
    {
      id: "2", 
      name: "Dr. Michael Chen",
      specializations: ["Academic Stress", "Social Anxiety", "Life Transitions"],
      rating: 4.8,
      experience: "6 years",
      nextAvailable: "Today",
      sessionTypes: ["online", "phone"]
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      specializations: ["Trauma", "PTSD", "Relationship Issues"],
      rating: 4.9,
      experience: "10 years",
      nextAvailable: "Next Week",
      sessionTypes: ["online", "in-person"]
    }
  ];

  // Mock available dates and times
  const availableDates = [
    "2024-01-15",
    "2024-01-16", 
    "2024-01-17",
    "2024-01-18",
    "2024-01-19"
  ];

  const timeSlots: TimeSlot[] = [
    { id: "1", time: "09:00 AM", available: true },
    { id: "2", time: "10:00 AM", available: false },
    { id: "3", time: "11:00 AM", available: true },
    { id: "4", time: "02:00 PM", available: true },
    { id: "5", time: "03:00 PM", available: true },
    { id: "6", time: "04:00 PM", available: false },
  ];

  const handleBooking = () => {
    // Mock booking - replace with actual API call
    toast({
      title: "Appointment Booked Successfully!",
      description: "You'll receive a confirmation email shortly. The counselor will contact you 15 minutes before your session.",
    });
    
  // Reset form
  setStep(1);
  setSelectedCounselor("");
  setSelectedDate(undefined);
  setSelectedTime("");
  setSessionType("");
  setReason("");
  };

  const getSessionIcon = (type: string) => {
    switch (type) {
      case 'online': return <Video className="h-4 w-4" />;
      case 'phone': return <Phone className="h-4 w-4" />;
      case 'in-person': return <MapPin className="h-4 w-4" />;
      default: return null;
    }
  };

  const getSessionTypeLabel = (type: string) => {
    switch (type) {
      case 'online': return 'Video Call';
      case 'phone': return 'Phone Call';
      case 'in-person': return 'In-Person';
      default: return type;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Book a Counseling Session</h1>
        <p className="text-muted-foreground">
          Schedule a confidential appointment with a licensed mental health professional
        </p>
      </div>

      {/* Privacy Notice */}
      <Alert className="bg-primary/10 border-primary/20">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>100% Confidential:</strong> Your identity and session details are completely private. 
          No information is shared with your institution or anyone else without your explicit consent.
        </AlertDescription>
      </Alert>

      {/* Step 1: Select Counselor */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Choose Your Counselor</h2>
          <div className="grid gap-4">
            {counselors.map((counselor) => (
              <Card 
                key={counselor.id} 
                className={`cursor-pointer transition-all duration-200 ${
                  selectedCounselor === counselor.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:shadow-medium'
                }`}
                onClick={() => setSelectedCounselor(counselor.id)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-xl font-semibold">{counselor.name}</h3>
                        <p className="text-muted-foreground">{counselor.experience} experience</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {counselor.specializations.map((spec) => (
                          <Badge key={spec} variant="secondary">{spec}</Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <span>★ {counselor.rating}</span>
                        </div>
                        <div>Next available: {counselor.nextAvailable}</div>
                      </div>
                      
                      <div className="flex space-x-2">
                        {counselor.sessionTypes.map((type) => (
                          <div key={type} className="flex items-center space-x-1 text-sm">
                            {getSessionIcon(type)}
                            <span>{getSessionTypeLabel(type)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {selectedCounselor === counselor.id && (
                      <CheckCircle className="h-6 w-6 text-primary" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Button 
            className="btn-hero w-full" 
            disabled={!selectedCounselor}
            onClick={() => setStep(2)}
          >
            Continue to Schedule
          </Button>
        </div>
      )}

      {/* Step 2: Select Date, Time & Type */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Schedule Your Session</h2>
            <Button variant="outline" onClick={() => setStep(1)}>
              Back to Counselors
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Date Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarDays className="mr-2 h-5 w-5" />
                  Select Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>

            {/* Time Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Select Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.id}
                      variant={selectedTime === slot.time ? "default" : "outline"}
                      disabled={!slot.available}
                      className="h-auto p-3"
                      onClick={() => setSelectedTime(slot.time)}
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Session Type */}
          <Card>
            <CardHeader>
              <CardTitle>Session Type</CardTitle>
              <CardDescription>Choose how you'd like to have your session</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={sessionType} onValueChange={setSessionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select session type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">
                    <div className="flex items-center space-x-2">
                      <Video className="h-4 w-4" />
                      <span>Video Call (Recommended)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="phone">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>Phone Call</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="in-person">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>In-Person (Campus Counseling Center)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Button 
            className="btn-hero w-full" 
            disabled={!selectedDate || !selectedTime || !sessionType}
            onClick={() => setStep(3)}
          >
            Continue to Details
          </Button>
        </div>
      )}

      {/* Step 3: Additional Details */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Session Details</h2>
            <Button variant="outline" onClick={() => setStep(2)}>
              Back to Schedule
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>What would you like to discuss?</CardTitle>
              <CardDescription>
                Optional: Help your counselor prepare for your session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="reason">Brief description (optional)</Label>
                <Textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g., Academic stress, relationship issues, anxiety, etc."
                  className="min-h-[100px]"
                />
                <p className="text-sm text-muted-foreground">
                  Your counselor will review this before your session to better support you.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Booking Summary */}
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Counselor:</span>
                <span className="font-medium">
                  {counselors.find(c => c.id === selectedCounselor)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span className="font-medium">
                  {selectedDate ? format(selectedDate, "PPP") : ''}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Time:</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Session Type:</span>
                <div className="flex items-center space-x-1">
                  {getSessionIcon(sessionType)}
                  <span className="font-medium">{getSessionTypeLabel(sessionType)}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-medium">50 minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Cost:</span>
                <span className="font-medium text-success">Free for Students</span>
              </div>
            </CardContent>
          </Card>

          <Button className="btn-hero w-full" onClick={handleBooking}>
            Confirm Booking
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookingSystem;