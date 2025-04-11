import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Stats = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Impact</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              See how Esther's Wisdom Academy is making a difference in education.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-4xl font-bold">95%</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Student Satisfaction Rate</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-4xl font-bold">250+</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Graduates Each Year</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-4xl font-bold">20+</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Specialized Courses</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-4xl font-bold">15</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Years of Excellence</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Stats;
