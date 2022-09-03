import AboutIntroSection from "../components/custom/about_page/IntroSection";
import { motion } from "framer-motion";

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
    </motion.div>
  );
}

export default AboutPage;
