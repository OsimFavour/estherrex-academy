import CourseCard from "../course-card/course-card.component";

const FeaturedCourses = () => {
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
    }
  ];

  return (
    <section className="py-12 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Courses</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Discover our most popular programs designed to nurture knowledge and wisdom in students of all ages.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses