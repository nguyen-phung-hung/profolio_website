import styles from "./first_section.module.css";
import SplitText from "../../../utils/split3.min";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

import { gsap, Power2 } from "gsap/dist/gsap";

const ParallaxWrapper = dynamic(
  () => import("../../animations/ParallaxWrapper"),
  {
    ssr: false,
  }
);

function FirstSection() {
  const mainTextRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const [textReaveal, setTextReveal] = useState(false);
  const [textReaveal1, setTextReveal1] = useState(false);
  const [textReaveal2, setTextReveal2] = useState(false);

  useEffect(() => {
    if (!mainTextRef) return;
    if (!textReaveal) return;
    const mySplitText = new SplitText(mainTextRef.current, {
      type: "words,chars",
    });

    gsap.fromTo(
      mySplitText.chars,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 1,
        ease: Power2.easeOut,
      }
    );
  }, [textReaveal]);
  useEffect(() => {
    if (!text1Ref) return;
    if (!textReaveal1) return;
    const mySplitText = new SplitText(text1Ref.current, {
      type: "words,chars",
    });

    gsap.fromTo(
      mySplitText.chars,
      {
        y: 100,
      },
      {
        y: 0,

        stagger: 0.04,
        duration: 1,
        ease: Power2.easeOut,
      }
    );
  }, [textReaveal1]);
  useEffect(() => {
    if (!text2Ref) return;
    if (!textReaveal2) return;
    const mySplitText = new SplitText(text2Ref.current, {
      type: "words,chars",
    });

    gsap.fromTo(
      mySplitText.chars,
      {
        y: 100,
      },
      {
        y: 0,

        stagger: 0.04,
        duration: 1,
        ease: Power2.easeOut,
      }
    );
  }, [textReaveal2]);

  return (
    <>
      <section className={styles.container}>
        <div className={styles.inner_container}>
          <motion.h1
            className={styles.title}
            ref={mainTextRef}
            onViewportEnter={() => {
              setTextReveal(true);
            }}
            viewport={{
              once: true,
            }}
          >
            PASSIONATE CREATIVE DEVELOPER
          </motion.h1>
          <motion.div
            className={styles.image}
            initial={{
              clipPath: `inset(100% 0% 0% 0%)`,
            }}
            viewport={{
              amount: "some",
              once: true,
            }}
            whileInView={{
              clipPath: `inset(0% 0% 0% 0%)`,
              transition: {
                duration: 1,
                type: "spring",
                stiffness: 20,
                damping: 10,
              },
            }}
          >
            <ParallaxWrapper
              className={styles.image_inner}
              offset={-150}
              yInitial={100}
              yFinal={800}
            >
              <Image src={"/landing/stairs.png"} layout="fill" />
            </ParallaxWrapper>
          </motion.div>
        </div>
      </section>
      <section className={styles.container1}>
        <div className={styles.inner_container1}>
          <motion.h1
            className={styles.container1_title}
            ref={text1Ref}
            onViewportEnter={() => {
              setTextReveal1(true);
            }}
            viewport={{
              once: true,
            }}
          >
            BASED IN
          </motion.h1>
          <motion.h1
            className={styles.container1_title1}
            ref={text2Ref}
            onViewportEnter={() => {
              setTextReveal2(true);
            }}
            viewport={{
              once: true,
            }}
          >
            HO CHI MINH
          </motion.h1>
          <motion.div
            className={styles.image1}
            initial={{
              clipPath: `inset(100% 0% 0% 0%)`,
            }}
            viewport={{
              amount: "some",
              once: true,
            }}
            whileInView={{
              clipPath: `inset(0% 0% 0% 0%)`,
              transition: {
                duration: 1,
                type: "spring",
                stiffness: 20,
                damping: 10,
              },
            }}
          >
            <ParallaxWrapper
              className={styles.image_inner1}
              offset={-150}
              yInitial={100}
              yFinal={800}
            >
              <Image src={"/highres_image/hochiminh.png"} layout="fill" />
            </ParallaxWrapper>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default FirstSection;