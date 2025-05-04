import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Begin Your Journey?</h2>
            <p className="max-w-[900px] md:text-xl/relaxed">
              Registration for the new academic year is opening soon. Secure your spot at Esther's Wisdom Academy today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild variant="secondary" size="lg">
              <Link to="/academy-register">Register Now</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;