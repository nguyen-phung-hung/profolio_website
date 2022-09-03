import styles from "./IntroSection.module.css";
import { motion } from "framer-motion";
import { useLayout } from "../../../hooks/useLayout";
import Image from "next/image";

function AboutIntroSection() {
  const { imageValue, pageLoading } = useLayout();
  const hasWindow = typeof window !== "undefined";

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
        animate={
          !pageLoading.loading && {
            x: hasWindow
              ? window.innerWidth / 2 - (window.innerWidth * 0.8) / 2
              : 0,
            y: hasWindow ? window.innerHeight / 1.25 : 0,

            width: "80vw",
            height: "100vh",
            transition: {
              duration: 2,
              ease: "easeInOut",
            },
          }
        }
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
          <Image
            src={"/highres_image/building.png"}
            layout="fill"
            alt="Building"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default AboutIntroSection;
