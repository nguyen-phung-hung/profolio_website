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

const useStyles = createUseStyles({
  main_container: {
    position: "relative",
    width: "100%",
    height: "100vh",
    display: "grid",
    gridTemplateColumns: "repeat(25, 4%)",
    gridTemplateRows: "repeat(25, 4%)",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
    zIndex: 1,
    "&:nth-child(1)": {
      gridArea: "8 / 2 / 17 / 5",
    },
    "&:nth-child(2)": {
      gridArea: "11/ 19 / 23 /23",
    },
    "&:nth-child(3)": {
      gridArea: "8 / 10 / 19 / 17",
    },
    "&:nth-child(4)": {
      gridArea: "20 / 3/ 26 / 8",
    },
    "&:nth-child(5)": {
      gridArea: "2 / 5 / 6 / 9",
    },
    "&:nth-child(6)": {
      gridArea: "2 / 17 / 7 / 22",
    },
    "&:nth-child(7)": {
      gridArea: "4 / 18 /13 / 21",
    },
  },
  image_inner: {
    width: "100%",
    height: "100%",
    position: "relative",
  },

  element: {
    position: "relative",
    width: "10vw",
    height: "10vw",
    zIndex: 11,
    "&:nth-child(8)": {
      gridArea: "4 / 20 /13 / 21",
    },
    "&:nth-child(9)": {
      gridArea: "6 / 10 /8 / 10",
    },
    "&:nth-child(10)": {
      gridArea: "12 / 17 /12 / 18",
      transform: "rotate(70deg)",
    },
    "&:nth-child(11)": {
      gridArea: "1 / 1 /1 / 1",
      transform: "rotate(-30deg)",
      width: "40vw",
      height: "40vw",
      zIndex: 0,
    },
    "&:nth-child(12)": {
      gridArea: "18 / 8 /19 / 8",
      width: "12vw",
      height: "12vw",
      zIndex: 11,
    },
  },
  slogan_text: {
    gridArea: "22/11/23/16",
    width: "100%",
    fontWeight: 100,
    fontFamily: "Noto Serif HK, serif",
    fontSize: "1vw",
    textAlign: "center",
  },
});

const images = [
  {
    src: "/landing/cat.png",
    alt: "Skill",
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
    alt: "Water",
    link: "/water",
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
