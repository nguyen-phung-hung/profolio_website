import AboutIntroSection from "../components/custom/about_page/IntroSection";
import { motion } from "framer-motion";
import FirstSection from "../components/custom/about_page/FirstSection";

function AboutPage() {
  return (
    <motion.div
      style={{
        width: "100vw",
        minHeight: "100vh",
      }}
      key="about-page"
      exit={{
        opacity: 0,
        transition: {
          delay: 1,
          duration: 1,
        },
      }}
    >
      <AboutIntroSection />
      <FirstSection />
      <div
        style={{
          width: "100vw",
          height: "100vh",
        }}
      ></div>
    </motion.div>
  );
}

export default AboutPage;
