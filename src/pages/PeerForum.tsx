import { useState } from "react";
import { MessageSquare, Plus, Search, ThumbsUp, ThumbsDown, Flag, Clock, Eye, Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  isAnonymous: boolean;
  timestamp: Date;
  upvotes: number;
  downvotes: number;
  replies: number;
  views: number;
  tags: string[];
  isModerator?: boolean;
}

const PeerForum = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    isAnonymous: true,
    tags: ""
  });
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);
  const { toast } = useToast();

  // Mock data - replace with real API data
  const forumPosts: ForumPost[] = [
    {
      id: "1",
      title: "Dealing with exam anxiety - what works for you?",
      content: "I've been struggling with severe anxiety during exams. My mind goes blank and I can't think clearly. Has anyone found effective strategies that actually work during high-pressure situations?",
      category: "anxiety",
      author: "Anonymous Student",
      isAnonymous: true,
      timestamp: new Date(2024, 0, 15, 14, 30),
      upvotes: 23,
      downvotes: 1,
      replies: 12,
      views: 156,
      tags: ["anxiety", "exams", "coping"]
    },
    {
      id: "2",
      title: "Finding motivation after a difficult semester",
      content: "Last semester was really tough for me personally. I'm having trouble getting motivated for this new semester. How do you rebuild momentum when you're starting from a low point?",
      category: "motivation",
      author: "Anonymous Student",
      isAnonymous: true,
      timestamp: new Date(2024, 0, 14, 10, 15),
      upvotes: 18,
      downvotes: 0,
      replies: 8,
      views: 89,
      tags: ["motivation", "recovery", "semester"]
    },
    {
      id: "3",
      title: "Sleep schedule completely messed up - help!",
      content: "I've been staying up until 3-4 AM and waking up at noon. It's affecting my classes and mental health. Any tips for getting back to a normal sleep schedule?",
      category: "sleep",
      author: "Anonymous Student", 
      isAnonymous: true,
      timestamp: new Date(2024, 0, 13, 16, 45),
      upvotes: 15,
      downvotes: 0,
      replies: 15,
      views: 203,
      tags: ["sleep", "schedule", "health"]
    },
    {
      id: "4",
      title: "Reminder: You're not alone in this journey ❤️",
      content: "I wanted to share that therapy really helped me this past year. If you're on the fence about seeking help, please know that it's okay to not be okay. There are people who care and want to help you succeed.",
      category: "support",
      author: "Peer Moderator",
      isAnonymous: false,
      timestamp: new Date(2024, 0, 12, 9, 20),
      upvotes: 45,
      downvotes: 0,
      replies: 6,
      views: 312,
      tags: ["support", "therapy", "encouragement"],
      isModerator: true
    }
  ];

  const categories = [
    { value: "all", label: "All Topics" },
    { value: "anxiety", label: "Anxiety Support" },
    { value: "depression", label: "Depression Help" },
    { value: "stress", label: "Stress Management" },
    { value: "sleep", label: "Sleep Issues" },
    { value: "motivation", label: "Motivation & Goals" },
    { value: "relationships", label: "Relationships" },
    { value: "support", label: "General Support" }
  ];

  const handleNewPost = () => {
    if (!newPost.title.trim() || !newPost.content.trim() || !newPost.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Mock post creation - replace with actual API call
    toast({
      title: "Post Created Successfully!",
      description: "Your post has been published anonymously to the community.",
    });

    setNewPost({
      title: "",
      content: "",
      category: "",
      isAnonymous: true,
      tags: ""
    });
    setShowNewPostDialog(false);
  };

  const filteredPosts = forumPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      anxiety: "bg-warning/20 text-warning-foreground border-warning/30",
      depression: "bg-destructive/20 text-destructive-foreground border-destructive/30",
      stress: "bg-primary/20 text-primary-foreground border-primary/30",
      sleep: "bg-accent/20 text-accent-foreground border-accent/30",
      motivation: "bg-success/20 text-success-foreground border-success/30",
      relationships: "bg-secondary/20 text-secondary-foreground border-secondary/30",
      support: "bg-muted text-muted-foreground border-muted"
    };
    return colors[category] || colors.support;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Peer Support Forum</h1>
          <p className="text-muted-foreground mt-2">
            Connect anonymously with fellow students for mutual support and shared experiences
          </p>
        </div>
        
        <Dialog open={showNewPostDialog} onOpenChange={setShowNewPostDialog}>
          <DialogTrigger asChild>
            <Button className="btn-hero">
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create a New Post</DialogTitle>
              <DialogDescription>
                Share your experience or ask for support. All posts are anonymous by default.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Post Title *</label>
                <Input
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  placeholder="What's on your mind?"
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Category *</label>
                <Select value={newPost.category} onValueChange={(value) => setNewPost({...newPost, category: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c.value !== "all").map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Your Message *</label>
                <Textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  placeholder="Share your thoughts, experiences, or questions..."
                  className="mt-1 min-h-[120px]"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Tags (optional)</label>
                <Input
                  value={newPost.tags}
                  onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                  placeholder="e.g., anxiety, coping, help"
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Separate tags with commas to help others find your post
                </p>
              </div>
              
              <Alert className="bg-primary/10 border-primary/20">
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Your post will be published anonymously. Please follow community guidelines and be respectful.
                </AlertDescription>
              </Alert>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowNewPostDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleNewPost}>
                  Post Anonymously
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Community Guidelines Alert */}
      <Alert className="bg-muted/50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Community Guidelines:</strong> Be respectful, supportive, and kind. No medical advice, harmful content, or personal attacks. 
          If you're in crisis, please contact emergency services (911) or crisis hotline (988) immediately.
        </AlertDescription>
      </Alert>

      {/* Search and Filter */}
      <Card className="card-gradient">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts, topics, or tags..."
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Forum Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="card-gradient hover:shadow-medium transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2">
                    <Badge className={getCategoryColor(post.category)}>
                      {categories.find(c => c.value === post.category)?.label || post.category}
                    </Badge>
                    {post.isModerator && (
                      <Badge variant="default" className="bg-primary/20 text-primary">
                        <Shield className="h-3 w-3 mr-1" />
                        Moderator
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg hover:text-primary cursor-pointer transition-colors">
                    {post.title}
                  </CardTitle>
                </div>
                
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Flag className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {post.content}
              </p>
              
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>{post.author}</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.timestamp.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>{post.views}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-success hover:text-success">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {post.upvotes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      {post.downvotes}
                    </Button>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {post.replies} Replies
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Posts Found</h3>
            <p className="text-muted-foreground">
              {searchQuery 
                ? "Try adjusting your search terms or browse different categories."
                : "Be the first to start a conversation in this category!"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeerForum;