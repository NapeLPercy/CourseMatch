//import "./Home.css";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Showcase from "./Showcase";
import FAQ from "../components/data-display/FAQ";
import Testimonials from "./Testimonials";
import SEO from "../components/ui/SEO";
import { homeFaqs } from "../Utils/textData/SeoFaqs";
// Home Component
export default function Home() {
  return (
    <>
      <SEO
        title="CourseMatch South Africa | Find Your Perfect Course"
        description="Discover university courses in South Africa based on your APS score."
        url="https://coursematchapp.co.za/"
        faq={homeFaqs}
      />

      <Hero />
      <HowItWorks />
      <Testimonials />
      <FAQ />
    </>
  );
}
