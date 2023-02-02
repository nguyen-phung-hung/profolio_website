import { useEffect, useRef, useState } from "react";
// import styles from "../../../styles/home.css";
import { motion } from "framer-motion";
import SplitText from "../../../utils/split3.min";
import IntroImage from "./image";
import DecoratedElement from "./decorated_element";
// import styles from "./IntroSection.module.css";
import { gsap } from "gsap/dist/gsap";
import { useLayout } from "../../../hooks/useLayout";
import { createUseStyles } from "react-jss";
import landingStyles from "./LandingPageStyle";

const useStyles = createUseStyles(landingStyles);

const images = [
  {
    src: "/landing/cat.png",
    alt: "Skills",
    link: "/skills",
    color: "646464",
  },
  {
    src: "/landing/scotland.png",
    alt: "Scotland",
    link: "/gallery",
    color: "df9382",
  },
  {
    src: "/landing/building.png",
    alt: "About",
    link: "/about",
    color: "363636",
  },
  {
    src: "/landing/water.png",
    alt: "Life map",
    link: "/life-map",
    color: "58483a",
  },
  {
    src: "/landing/wheel.png",
    alt: "Wheel",
    link: "/wheel",
    color: "050505",
  },
  {
    src: "/landing/house.png",
    alt: "House",
    link: "/house",
    color: "874b39",
  },
  {
    src: "/landing/ink.png",
    alt: "Ink",
    link: "/ink",
    color: "656565",
  },
];

const elements = [
  {
    src: "/landing/element1.png",
    speed: -1,
    move: 10,
    rotate: 0,
  },
  {
    src: "/landing/element2.png",
    speed: 2,
    move: 10,
    rotate: 0,
  },

  {
    src: "/landing/element4.png",
    speed: 4,
    move: 10,
    rotate: 80,
  },
  {
    src: "/landing/black_liquid1.png",
    speed: 0.3,
    move: 5,
    rotate: -40,
  },
  {
    src: "/landing/element3.png",
    speed: 10,
    move: 20,
    rotate: 0,
  },
];

function IntroSection() {
  const mainRef = useRef();
  const textRef = useRef();
  const styles = useStyles();

  const { pageLoading } = useLayout();
  const [firstLoading, setFirstLoading] = useState(true);

  useEffect(() => {
    if (pageLoading.loading) return;
    if (!firstLoading) return;
    const mySplitText = new SplitText(textRef.current, {
      type: "words,chars",
    });

    gsap
      .fromTo(
        mySplitText.chars,
        {
          y: 100,
        },
        {
          y: 0,
          stagger: 0.02,
          duration: 1,
        }
      )
      .then(() => {
        setFirstLoading(false);
      });
  }, [pageLoading.loading]);

  return (
    <section className={styles.main_container} ref={mainRef}>
      {images.map((image, index) => (
        <IntroImage
          key={image.link}
          {...image}
          className={styles.image}
          classNameInner={styles.image_inner}
          index={index}
        />
      ))}
      {elements.map((element, index) => (
        <DecoratedElement
          key={element.src}
          {...element}
          className={styles.element}
          index={index}
        />
      ))}
      <motion.div
        className={styles.slogan_text}
        ref={textRef}
        exit={{
          opacity: 0,
          transition: {
            delay: 4,
            duration: 0.5,
          },
        }}
      >
        Make the impossible possible
      </motion.div>
    </section>
  );
}

export default IntroSection;
