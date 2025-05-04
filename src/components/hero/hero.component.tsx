import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="py-12 md:py-24 lg:py-32 xl:py-40 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Registration Opening Soon
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Welcome to Esther's Wisdom Academy
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Nurturing minds, building character, and empowering the next generation of leaders through wisdom and excellence in education.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/academy-register">
                <Button size="lg">Register Now</Button>
              </Link>
              <Link to="/courses">
                <Button variant="outline" size="lg">Explore Courses</Button>
              </Link>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden border bg-card shadow">
            <div className="h-60 md:h-80 bg-muted flex items-center justify-center">
              <span className="text-3xl font-semibold text-muted-foreground">Academy Image</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
