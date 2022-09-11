//?300vh section

import styles from "./IntroSection.module.css";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useLayout } from "../../../hooks/useLayout";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, Power2 } from "gsap/dist/gsap";
import SplitText from "../../../utils/split3.min";
import useWindowDimensions from "../../../hooks/useDimensions";
import SparklesIcon from "../../icons/sparkles";

const defaultSpring = {
  stiffness: 400,
  damping: 90,
};

const introSections = [
  {
    title: "Open minded",
    content:
      "Think outside the box is one of my ultimate mottoes in this ever changing world. Think, adapt and overcome is my way of life.",
  },
  {
    title: "Creative",
    content:
      "Always looking for new ways to solve problems and applying unusual yet effective solutions.",
  },

  {
    title: "Reliable",
    content:
      "People around me can always count on me not only for work but also for personal matters.",
  },
];

function AboutIntroSection() {
  const { imageValue, pageLoading } = useLayout();
  const hasWindow = typeof window !== "undefined";
  const mainTextRef = useRef(null);

  const { height } = useWindowDimensions();

  const { scrollY } = useScroll();

  const textYRange = useTransform(scrollY, [0, height], [0, height / 2]);
  const textScaleRange = useTransform(scrollY, [0, height], [1, 1.2]);
  const aboutSectionYRange = useTransform(
    scrollY,
    [height, height * 2.5],
    [0, height * 1.5]
  );

  const textYRangeSpring = useSpring(textYRange, defaultSpring);
  const textScaleRangeSpring = useSpring(textScaleRange, defaultSpring);
  const aboutSectionYRangeSpring = useSpring(aboutSectionYRange, {
    stiffness: 800,
    damping: 200,
  });

  useEffect(() => {
    if (pageLoading.loading) return;

    const mySplitText = new SplitText(mainTextRef.current, {
      type: "words,chars",
    });
    setTimeout(() => {
      gsap.fromTo(
        mySplitText.chars,
        {
          y: -100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 1.5,
          ease: Power2.easeOut,
        }
      );
    }, 500);
  }, [pageLoading.loading]);

  return (
    <>
      <section className={styles.container}>
        <motion.div
          className={styles.main_text_container}
          style={{
            y: textYRangeSpring,
            scale: textScaleRangeSpring,
          }}
          ref={mainTextRef}
          initial={{
            opacity: 0,
          }}
          animate={
            !pageLoading.loading && {
              opacity: 1,
              transition: {
                delay: 0.5,
                ease: "easeInOut",
                duration: 0,
              },
            }
          }
        >
          ABOUT ME
        </motion.div>

        <motion.div
          className={styles.image_container}
          initial={{
            position: "absolute",
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
            style={{
              zIndex: 1,
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
      <motion.section
        className={styles.container2}
        style={{
          y: aboutSectionYRangeSpring,
        }}
      >
        <h3 className={styles.container2_header}>
          {"Brief description about me..."}
        </h3>
        <div className={styles.container2_inner}>
          {introSections.map((section, index) => {
            return (
              <motion.div
                className={styles.section_container2}
                key={section.content}
              >
                <div className={styles.section_container2_number}>
                  0{index + 1}
                </div>
                <div className={styles.section_innercontainer2}>
                  <h2 className={styles.section_container2_title}>
                    {section.title}
                    {index === 0 && <SparklesIcon className={styles.icon} />}
                  </h2>
                  <p className={styles.section_container2_content}>
                    {section.content}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
      <section
        className={styles.container}
        style={{
          zIndex: -1,
        }}
      ></section>
      <section className={styles.container3}></section>
    </>
  );
}

export default AboutIntroSection;
