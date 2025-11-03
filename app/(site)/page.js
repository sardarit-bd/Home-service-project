import Category from "../componnent/Category";
import FaqSection from "../componnent/FaqSection";
import FeaturedProvidersSection from "../componnent/FeaturedProvidersSection";
import HeroSection from "../componnent/Hero";
import HowItWorksSection from "../componnent/HowItWorksSection";
import JoinBannerSection from "../componnent/JoinBannerSection";
import TestimonialsSection from "../componnent/TestimonialsSection";
import WhyChooseUsSection from "../componnent/WhyChooseUsSection";

const Homepage = () => {


  console.log(process.env.NEXT_PUBLIC_API_BASE_URL);


  return (
    <main className="h-fit">
      <HeroSection />
      <Category />
      <HowItWorksSection />
      <FeaturedProvidersSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <JoinBannerSection />
      <FaqSection />
    </main>
  );
};

export default Homepage;
