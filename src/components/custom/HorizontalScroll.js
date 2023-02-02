import React, { useRef, useState, useLayoutEffect, useCallback } from "react";
import ResizeObserver from "resize-observer-polyfill";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const HorizontalScroll = ({ children }) => {
  const scrollRef = useRef(null);
  const ghostRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [viewportW, setViewportW] = useState(0);

  useLayoutEffect(() => {
    scrollRef && setScrollRange(scrollRef.current.scrollWidth);
    spring.onChange(() => {
      ScrollTrigger.update();
    });
    ScrollTrigger.scrollerProxy(scrollRef, {
      scrollTop(value) {
        return arguments.length ? spring.set(value) : spring.get();
      },
    });

    ScrollTrigger.refresh();
  }, [scrollRef]);

  const onResize = useCallback((entries) => {
    for (let entry of entries) {
      setViewportW(entry.contentRect.width);
    }
  }, []);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => onResize(entries));
    resizeObserver.observe(ghostRef.current);
    return () => resizeObserver.disconnect();
  }, [onResize]);

  const { scrollYProgress } = useScroll();
  const transform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -scrollRange + viewportW]
  );
  const physics = { damping: 15, mass: 0.27, stiffness: 55 };
  const spring = useSpring(transform, physics);

  return (
    <>
      <motion.div
        ref={scrollRef}
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          willChange: "transform",
          x: spring,
        }}
      >
        {children}
      </motion.div>
      <motion.div
        ref={ghostRef}
        style={{ height: scrollRange, width: "100vw" }}
      />
    </>
  );
};

export default HorizontalScroll;
