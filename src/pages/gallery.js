import GalleryIntroSection from "../components/custom/gallery_page/IntroSection";
import { motion } from "framer-motion";

function GalleryPage() {
  return (
    <motion.div
      style={{
        width: "100vw",
        minHeight: "100vh",
      }}
      key="gallery-page"
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
      <GalleryIntroSection />
    </motion.div>
  );
}

export default GalleryPage;
