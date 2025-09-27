import { useState } from "react";
import { Search, Play, Download, Clock, Star, Filter, BookOpen, Video, Headphones, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'article' | 'guide';
  category: string;
  duration?: string;
  rating: number;
  downloads: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

const ResourceHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  // Mock data - replace with real API data
  const resources: Resource[] = [
    {
      id: "1",
      title: "Managing Academic Stress",
      description: "Learn effective strategies to handle academic pressure and maintain balance in your studies.",
      type: "video",
      category: "stress",
      duration: "15 min",
      rating: 4.8,
      downloads: 1240,
      difficulty: "beginner",
      tags: ["stress", "academics", "time management"]
    },
    {
      id: "2",
      title: "Guided Meditation for Anxiety",
      description: "A calming meditation session designed specifically to reduce anxiety and promote relaxation.",
      type: "audio",
      category: "anxiety",
      duration: "20 min",
      rating: 4.9,
      downloads: 2150,
      difficulty: "beginner",
      tags: ["meditation", "anxiety", "relaxation"]
    },
    {
      id: "3",
      title: "Understanding Depression: A Student's Guide",
      description: "Comprehensive guide to recognizing, understanding, and managing depression in college life.",
      type: "guide",
      category: "depression",
      duration: "Read: 25 min",
      rating: 4.7,
      downloads: 890,
      difficulty: "intermediate",
      tags: ["depression", "mental health", "self-help"]
    },
    {
      id: "4",
      title: "Sleep Hygiene for Better Mental Health",
      description: "Evidence-based tips and techniques to improve sleep quality and its impact on mental wellness.",
      type: "article",
      category: "sleep",
      duration: "12 min read",
      rating: 4.6,
      downloads: 1560,
      difficulty: "beginner",
      tags: ["sleep", "wellness", "health"]
    },
    {
      id: "5",
      title: "Breathing Exercises for Panic Attacks",
      description: "Quick and effective breathing techniques to manage panic attacks and acute anxiety.",
      type: "video",
      category: "anxiety",
      duration: "8 min",
      rating: 4.9,
      downloads: 3240,
      difficulty: "beginner",
      tags: ["breathing", "panic", "emergency"]
    },
    {
      id: "6",
      title: "Building Resilience in College",
      description: "Learn how to develop emotional resilience and bounce back from challenges during your college years.",
      type: "guide",
      category: "resilience",
      duration: "Read: 30 min",
      rating: 4.5,
      downloads: 720,
      difficulty: "advanced",
      tags: ["resilience", "coping", "growth"]
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "stress", label: "Stress Management" },
    { value: "anxiety", label: "Anxiety Support" },
    { value: "depression", label: "Depression Help" },
    { value: "sleep", label: "Sleep & Rest" },
    { value: "resilience", label: "Building Resilience" }
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'audio': return <Headphones className="h-4 w-4" />;
      case 'article': return <FileText className="h-4 w-4" />;
      case 'guide': return <BookOpen className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-success text-success-foreground';
      case 'intermediate': return 'bg-warning text-warning-foreground';
      case 'advanced': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || resource.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const featuredResources = resources.filter(resource => resource.rating >= 4.8).slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Wellness Resource Hub</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover curated mental health resources including videos, guided meditations, 
          articles, and comprehensive guides to support your wellness journey.
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="card-gradient">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources, topics, or techniques..."
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

            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
        </TabsList>

        {/* Featured Resources */}
        <TabsContent value="featured" className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Featured Resources</h2>
            <p className="text-muted-foreground">Our most popular and highly-rated content</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.map((resource) => (
              <Card key={resource.id} className="card-feature group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      {getResourceIcon(resource.type)}
                      <Badge className={getDifficultyColor(resource.difficulty)}>
                        {resource.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-warning">
                      <Star className="h-4 w-4 fill-current" />
                      <span>{resource.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {resource.title}
                  </CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{resource.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="h-4 w-4" />
                      <span>{resource.downloads.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Access Resource
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* All Resources */}
        <TabsContent value="all" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">
              All Resources ({filteredResources.length})
            </h2>
            <div className="text-sm text-muted-foreground">
              Showing {filteredResources.length} of {resources.length} resources
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="card-gradient hover:shadow-medium transition-all duration-200 group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getResourceIcon(resource.type)}
                      <span className="text-sm font-medium capitalize">{resource.type}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Star className="h-4 w-4 text-warning fill-current" />
                      <span>{resource.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>
                  
                  <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{resource.duration}</span>
                    </div>
                    <Badge className={getDifficultyColor(resource.difficulty)}>
                      {resource.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                    <Play className="mr-2 h-4 w-4" />
                    Access Resource
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Resources Found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          )}
        </TabsContent>

        {/* Video Resources */}
        <TabsContent value="video">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.filter(r => r.type === 'video').map((resource) => (
              <Card key={resource.id} className="card-feature">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Video className="h-5 w-5" />
                    <span>{resource.title}</span>
                  </CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Watch Video
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Audio Resources */}
        <TabsContent value="audio">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.filter(r => r.type === 'audio').map((resource) => (
              <Card key={resource.id} className="card-feature">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Headphones className="h-5 w-5" />
                    <span>{resource.title}</span>
                  </CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Listen Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Guide Resources */}
        <TabsContent value="guides">
          <div className="grid md:grid-cols-2 gap-6">
            {resources.filter(r => r.type === 'guide' || r.type === 'article').map((resource) => (
              <Card key={resource.id} className="card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {getResourceIcon(resource.type)}
                    <span>{resource.title}</span>
                  </CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Read {resource.type === 'guide' ? 'Guide' : 'Article'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResourceHub;