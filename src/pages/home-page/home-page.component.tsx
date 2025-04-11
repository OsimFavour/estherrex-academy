import CTASection from "@/components/cta-section/cta-section.component";
import FeaturedCourses from "@/components/featured-card/featured-card.component";
import Hero from "@/components/hero/hero.component";
import Stats from "@/components/stats/stats.component";
import Testimonials from "@/components/testimonials/testimonials.component";


const HomePage = () => {
  return (
    <main>
      <Hero />
      <FeaturedCourses />
      <Stats />
      <Testimonials />
      <CTASection />
    </main>
  );
};

export default HomePage;