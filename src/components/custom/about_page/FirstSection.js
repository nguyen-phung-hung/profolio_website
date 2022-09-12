import SplitText from "../../../utils/split3.min";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import { createUseStyles } from "react-jss";
import { firstSectionStyles } from "./AboutPageStyle";
import { gsap, Power2 } from "gsap/dist/gsap";
import { useLayout } from "../../../hooks/useLayout";
import ArrowForwardIcon from "../../icons/ArrowForward";

const ParallaxWrapper = dynamic(
  () => import("../../animations/ParallaxWrapper"),
  {
    ssr: false,
  }
);
const useStyles = createUseStyles(firstSectionStyles);

function FirstSection() {
  const styles = useStyles();

  const { setCursorType } = useLayout();

  const mainTextRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const [textReaveal, setTextReveal] = useState(false);
  const [textReaveal1, setTextReveal1] = useState(false);
  const [textReaveal2, setTextReveal2] = useState(false);
  const [hovered, setHovered] = useState(false);

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
          <ParallaxWrapper className={styles.container1_slogan} offset={-50}>
            {"Where the journey of curiosities & explorations began"}
          </ParallaxWrapper>
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
          <div className={styles.container1_para}>
            <p>
              The city where I live is known for its drastic change in the last
              decade, particularly in the digital field. I am a developer and
              happened to be born in the midst of this transition.
            </p>
            <p>
              The race for the digital world is as fierce as ever before and
              will continue to post challenges for fellow developers to adapt
              and to change in the blink of an eye.
            </p>
          </div>
          <ParallaxWrapper offset={100}>
            <motion.a
              href="https://www.subsica.com/hometown"
              className={styles.container1_link}
              target="_blank"
              onMouseEnter={() => {
                setCursorType("inline-hover");
                setHovered(true);
              }}
              onMouseLeave={() => {
                setCursorType(null);
                setHovered(false);
              }}
            >
              <AnimatePresence mode="popLayout">
                {hovered ? (
                  <motion.div
                    className={styles.container1_link_text}
                    key="text-link-section1"
                    initial={{
                      x: -100,
                    }}
                    animate={{
                      x: 0,
                      transition: {
                        duration: 0.5,
                        delay: 0.2,
                      },
                    }}
                    exit={{
                      x: 100,
                      transition: {
                        duration: 0.5,
                      },
                    }}
                  >
                    View
                  </motion.div>
                ) : (
                  <motion.div
                    className={styles.arrow_icon}
                    key="arrow-forward-section1"
                    initial={{
                      x: -100,
                    }}
                    animate={{
                      x: 0,
                      transition: {
                        duration: 0.5,
                        delay: 0.2,
                      },
                    }}
                    exit={{
                      x: 100,
                      transition: {
                        duration: 0.5,
                      },
                    }}
                  >
                    <ArrowForwardIcon />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence mode="wait">
                {hovered && (
                  <motion.div
                    className={styles.icon_background}
                    initial={{
                      left: "-100%",
                    }}
                    animate={{
                      left: "0%",
                      transition: {
                        duration: 0.5,
                      },
                    }}
                    exit={{
                      left: "100%",
                      transition: {
                        duration: 0.5,
                      },
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.a>
          </ParallaxWrapper>
        </div>
      </section>
    </>
  );
}

export default FirstSection;
