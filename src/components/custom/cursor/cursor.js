import { useEffect, useRef } from "react";
import styles from "./cursor.module.css";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useLayout } from "../../../hooks/useLayout";

function CustomCursor() {
  const cursorRef = useRef(null);

  const { isHovered, cursorType, scrolled, indicater } = useLayout();

  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);
  const indicatorX = useMotionValue(0);
  const indicatorY = useMotionValue(0);

  const hoveredX = useMotionValue();
  const hoveredY = useMotionValue();

  const x = useSpring(isHovered.x ? hoveredX : motionX, {
    stiffness: 600,
    damping: 90,
    mass: 0.25,
  });

  const y = useSpring(isHovered.y ? hoveredY : motionY, {
    stiffness: 600,
    damping: 100,
    mass: 0.25,
  });

  const indicatorSpringX = useSpring(indicatorX, {
    stiffness: 300,
    damping: 100,
    mass: 0.5,
  });

  const indicatorSpringY = useSpring(indicatorY, {
    stiffness: 300,
    damping: 100,
    mass: 0.5,
  });

  useEffect(() => {
    document.addEventListener("mousemove", (event) => {
      const { clientX, clientY } = event;
      const mouseX = clientX - (cursorRef?.current?.clientWidth ?? 0) / 2;
      const mouseY = clientY - (cursorRef?.current?.clientHeight ?? 0) / 2;
      motionX.set(mouseX);
      motionY.set(mouseY);
      indicatorX.set(mouseX + 50);
      indicatorY.set(mouseY + 50);
      //   cursorRef.current.style.transform = `translate3d(${mouseX}px,${mouseY}px,0)`;
    });

    return () => {
      document.removeEventListener("mousemove", () => {
        console.log("remove");
        motionX.set(0);
        motionY.set(0);
        indicatorX.set(0);
        indicatorY.set(0);
      });
    };
  }, [motionX, motionY]);

  function animate() {
    let animate;

    // if (scrolled > 0.95) {
    //   animate = {
    //     backgroundColor: "#fff",
    //   };
    // }
    if (isHovered.x || isHovered.y) {
      animate = {
        ...animate,
        width: "6px",
        height: "6px",
        transition: { duration: 0.4 },
      };
      return animate;
    }
    return {
      ...animate,
      width: "5vw",
      height: "5vw",
      transition: { duration: 0.4 },
    };
  }

  useEffect(() => {
    animate();
  }, [cursorType]);

  useEffect(() => {
    if (isHovered.x) {
      hoveredX.set(isHovered.x);
      hoveredY.set(isHovered.y);
    }
    if (!isHovered.x && !isHovered.y) {
      hoveredX.set(null);
      hoveredY.set(null);
    }
  }, [hoveredX, hoveredY, isHovered.x, isHovered.y]);

  return (
    <>
      <motion.div
        className={styles.indicator}
        style={{
          x: indicatorSpringX,
          y: indicatorSpringY,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={indicater}
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.4 },
            }}
            exit={{
              opacity: 0,
              scale: 0,
              transition: { duration: 0.2 },
            }}
          >
            {indicater}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <motion.div
        className={styles.app_cursor}
        ref={cursorRef}
        style={{
          x: x,
          y: y,
          // opacity: firstLoading ? 0 : 1,
        }}
        animate={animate}
      >
        <div className={styles.vertical_line} />
        <div className={styles.horizontal_line} />
      </motion.div>
    </>
  );
}

export default CustomCursor;
