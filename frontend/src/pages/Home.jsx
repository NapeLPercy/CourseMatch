//import "./Home.css";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Showcase from "./Showcase";
import FAQ from "../components/data-display/FAQ";
import Testimonials from "./Testimonials";
import { Helmet } from "react-helmet-async";
// Home Component
export default function Home() {
  return (
    <>
      <Helmet>
        <title>CourseMatch South Africa | Find Your Perfect Course by APS Score</title>
        <meta
          name="description"
          content="Discover university courses in South Africa based on your APS score."
        />
        <link rel="canonical" href="https://coursematchapp.co.za/" />
      </Helmet>
      <Hero />
      <HowItWorks />
      <Testimonials />
      <FAQ />
    </>
  );
}
