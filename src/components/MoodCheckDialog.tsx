import { useState } from "react";
import { Heart, Smile, Meh, Frown, Angry } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface MoodCheckDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MoodCheckDialog = ({ open, onOpenChange }: MoodCheckDialogProps) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [stressLevel, setStressLevel] = useState<number | null>(null);
  const { toast } = useToast();

  const moodOptions = [
    { value: 5, icon: Smile, label: "Great", color: "text-success" },
    { value: 4, icon: Heart, label: "Good", color: "text-primary" },
    { value: 3, icon: Meh, label: "Okay", color: "text-warning" },
    { value: 2, icon: Frown, label: "Not Great", color: "text-destructive" },
    { value: 1, icon: Angry, label: "Terrible", color: "text-destructive" }
  ];

  const stressLevels = [
    { value: 1, label: "Very Low", color: "bg-success" },
    { value: 2, label: "Low", color: "bg-primary" },
    { value: 3, label: "Moderate", color: "bg-warning" },
    { value: 4, label: "High", color: "bg-destructive" },
    { value: 5, label: "Very High", color: "bg-destructive" }
  ];

  const handleSubmit = () => {
    if (selectedMood === null || stressLevel === null) {
      toast({
        title: "Please Complete Check-in",
        description: "Please select both your mood and stress level.",
        variant: "destructive"
      });
      return;
    }

    // Mock submission - replace with actual API call
    toast({
      title: "Mood Check Completed!",
      description: "Thank you for sharing. Your wellness data has been updated.",
    });

    // Provide personalized suggestions based on mood
    setTimeout(() => {
      if (selectedMood <= 2 || stressLevel >= 4) {
        toast({
          title: "We're Here for You",
          description: "Would you like to try a breathing exercise or chat with our AI assistant?",
        });
      }
    }, 2000);

    // Reset form and close
    setSelectedMood(null);
    setStressLevel(null);
    setNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Quick Mood Check</DialogTitle>
          <DialogDescription>
            Take a moment to check in with yourself. This helps us provide better support.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Mood Selection */}
          <div>
            <Label className="text-base font-medium">How are you feeling right now?</Label>
            <div className="grid grid-cols-5 gap-2 mt-3">
              {moodOptions.map((mood) => (
                <Button
                  key={mood.value}
                  variant={selectedMood === mood.value ? "default" : "outline"}
                  className="h-auto p-3 flex flex-col items-center space-y-2"
                  onClick={() => setSelectedMood(mood.value)}
                >
                  <mood.icon className={`h-6 w-6 ${selectedMood === mood.value ? '' : mood.color}`} />
                  <span className="text-xs">{mood.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Stress Level */}
          <div>
            <Label className="text-base font-medium">What's your stress level?</Label>
            <div className="grid grid-cols-5 gap-2 mt-3">
              {stressLevels.map((level) => (
                <Button
                  key={level.value}
                  variant={stressLevel === level.value ? "default" : "outline"}
                  className="h-auto p-3 flex flex-col items-center space-y-2"
                  onClick={() => setStressLevel(level.value)}
                >
                  <div className={`w-4 h-4 rounded-full ${stressLevel === level.value ? 'bg-white' : level.color}`} />
                  <span className="text-xs text-center">{level.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Optional Notes */}
          <div>
            <Label htmlFor="notes" className="text-base font-medium">
              Anything you'd like to note? (Optional)
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What's on your mind today?"
              className="mt-2"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit} 
            className="w-full"
            disabled={selectedMood === null || stressLevel === null}
          >
            Complete Check-in
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoodCheckDialog;