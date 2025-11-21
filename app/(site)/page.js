import Category from "../componnent/Category";
import FaqSection from "../componnent/FaqSection";
import FeaturedProvidersSection from "../componnent/FeaturedProvidersSection";
import HeroBGWrper from "../componnent/HeroBg";
import HowItWorksSection from "../componnent/HowItWorksSection";
import JoinBannerSection from "../componnent/JoinBannerSection";
import TestimonialsSection from "../componnent/TestimonialsSection";
import WhyChooseUsSection from "../componnent/WhyChooseUsSection";

const Homepage = () => {


  console.log(process.env.NEXT_PUBLIC_API_BASE_URL);


  return (
    <main className="h-fit">
      <HeroBGWrper />
      <FeaturedProvidersSection />
      <Category />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <JoinBannerSection />
      <FaqSection />
    </main>
  );
};

export default Homepage;
