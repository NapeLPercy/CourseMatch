
//import "./Home.css";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Showcase from "./Showcase";
import FAQ from "../components/data-display/FAQ";
import Testimonials from "./Testimonials";
// Home Component
export default function Home() {
  return (
    <>
    <Hero/>
    <HowItWorks/>
    <Testimonials/>
    <FAQ/>
    </>
  );
}