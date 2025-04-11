import { useState } from "react";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CourseCard from "@/components/course-card/course-card.component";

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");

  const courses = [
    {
      id: "1",
      title: "Foundation Mathematics",
      description: "Build a strong foundation in essential mathematics concepts for academic success.",
      level: "Elementary",
      duration: "12 weeks",
      enrollmentStatus: "Coming Soon" as const
    },
    {
      id: "2",
      title: "Advanced English Language",
      description: "Develop advanced literacy skills through comprehensive language studies.",
      level: "Intermediate",
      duration: "16 weeks",
      enrollmentStatus: "Coming Soon" as const
    },
    {
      id: "3",
      title: "Introduction to Sciences",
      description: "Explore the wonders of biology, chemistry, and physics through hands-on experiments.",
      level: "Beginner",
      duration: "14 weeks",
      enrollmentStatus: "Coming Soon" as const
    },
    {
      id: "4",
      title: "Creative Arts & Expression",
      description: "Discover artistic talents through various mediums and creative expression techniques.",
      level: "All Levels",
      duration: "10 weeks",
      enrollmentStatus: "Coming Soon" as const
    },
    {
      id: "5",
      title: "History & Cultural Studies",
      description: "Learn about world history and diverse cultural heritage through engaging lessons.",
      level: "Intermediate",
      duration: "12 weeks",
      enrollmentStatus: "Coming Soon" as const
    },
    {
      id: "6",
      title: "Computer Science Fundamentals",
      description: "Introduction to coding, computational thinking, and digital literacy.",
      level: "Advanced",
      duration: "14 weeks",
      enrollmentStatus: "Coming Soon" as const
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === "all" || course.level.toLowerCase() === levelFilter.toLowerCase();
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="container py-12 px-5">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold">Our Courses</h1>
        <p className="text-muted-foreground max-w-[800px] mx-auto">
          Explore our diverse range of courses designed to nurture academic excellence and character development.
        </p>
      </div>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="search" className="text-sm font-medium mb-1 block">Search Courses</label>
          <Input
            id="search"
            placeholder="Search by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="level-filter" className="text-sm font-medium mb-1 block">Filter by Level</label>
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger id="level-filter">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="elementary">Elementary</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mx-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No courses match your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
