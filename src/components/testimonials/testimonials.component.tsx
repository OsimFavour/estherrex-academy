import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  initials: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Parent",
      content: "Esther's Wisdom Academy has transformed my child's approach to learning. The teachers are dedicated and the curriculum is excellent.",
      initials: "SJ",
    },
    {
      id: "2",
      name: "Michael Thompson",
      role: "Student",
      content: "I've never enjoyed learning as much as I do at Esther's Academy. The supportive environment helped me excel beyond my expectations.",
      initials: "MT",
    },
    {
      id: "3",
      name: "Dr. Rebecca Lee",
      role: "Education Specialist",
      content: "The holistic approach to education at Esther's Wisdom Academy is exemplary. They truly understand how to nurture both academic excellence and character.",
      initials: "RL",
    },
  ];

  return (
    <section className="py-12 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Our Community Says</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Hear from parents, students, and educators about their experiences with Esther's Wisdom Academy.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-card">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <blockquote className="mt-4 text-muted-foreground">
                  "{testimonial.content}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
