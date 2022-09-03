import styles from "./IntroSection.module.css";
import { motion } from "framer-motion";
import { useLayout } from "../../../hooks/useLayout";
import Image from "next/image";

function GalleryIntroSection() {
  const { imageValue } = useLayout();

  return (
    <section className={styles.container}>
      <motion.div
        initial={{
          position: "relative",
          overflow: "hidden",
          x: imageValue.x,
          y: imageValue.y,

          width: `${imageValue.width}px`,
          height: `${imageValue.height}px`,
        }}
        animate={{
          x: 0,
          y: 0,

          width: "40vw",
          height: "100vh",
          transition: {
            duration: 2,
            ease: "easeInOut",
          },
        }}
      >
        <motion.div
          initial={{
            scale: 1,
          }}
          animate={{
            scale: 1.1,
            transition: {
              duration: 3,
              ease: "easeInOut",
            },
          }}
          className={styles.relative_container}
        >
          <Image src={"/landing/scotland.png"} layout="fill" alt="cat" />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default GalleryIntroSection;
