import DefaultLayout from "../components/layouts/default";
import SkillIntroSection from "../components/custom/skill_page/IntroSection";
import { motion } from "framer-motion";

SkillPage.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

function SkillPage() {
  return (
    <motion.div
      style={{
        width: "100vw",
        minHeight: "100vh",
      }}
      key="about-page"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0,
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          delay: 1,
          duration: 1,
        },
      }}
    >
      <SkillIntroSection />
    </motion.div>
  );
}

export default SkillPage;
