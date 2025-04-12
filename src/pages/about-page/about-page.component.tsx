import { Card, CardContent } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <div className="container py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">About Esther's Wisdom Academy</h1>
          <p className="text-muted-foreground mt-2">Our story, mission, and values.</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <p>
            Esther's Wisdom Academy was founded in 2010 with a clear vision: to create an educational 
            environment that nurtures not only academic excellence but also character and wisdom. 
            Named after its founder, Esther Johnson, a dedicated educator with over 30 years of 
            experience, the academy began as a small tutoring center and has grown into a 
            comprehensive educational institution serving hundreds of students.
          </p>
          <p>
            Over the years, we have remained committed to our founding principles while adapting 
            to the evolving educational landscape, incorporating innovative teaching methodologies 
            and technology to enhance learning experiences.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p>
            At Esther's Wisdom Academy, our mission is to empower students through holistic education 
            that develops critical thinking, character, and a lifelong love of learning. We aim to 
            prepare students not just for academic success, but for life as responsible, 
            compassionate, and wise individuals who will make positive contributions to society.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-2">Excellence</h3>
                <p className="text-sm text-muted-foreground">We pursue excellence in all aspects of education, challenging students to reach their highest potential.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-2">Integrity</h3>
                <p className="text-sm text-muted-foreground">We promote honesty, ethics, and accountability in everything we do.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-2">Wisdom</h3>
                <p className="text-sm text-muted-foreground">We emphasize the application of knowledge with discernment and good judgment.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-2">Community</h3>
                <p className="text-sm text-muted-foreground">We foster a supportive and inclusive environment where everyone feels valued and respected.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Team</h2>
          <p>
            Our dedicated faculty and staff are the heart of Esther's Wisdom Academy. Our teachers 
            are not only experts in their subject areas but are also passionate about guiding 
            students on their educational journeys. With small class sizes and personalized 
            attention, our educators can truly get to know each student and tailor their 
            approach to individual learning styles and needs.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Campus</h2>
          <p>
            Located in the heart of the city, our campus provides a safe, modern, and inspiring 
            environment for learning. Our facilities include well-equipped classrooms, science 
            laboratories, a comprehensive library, art studios, and outdoor recreational areas. 
            We believe that the physical environment plays an important role in fostering 
            effective learning and community building.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
