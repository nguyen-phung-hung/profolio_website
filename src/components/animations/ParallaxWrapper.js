import { useState, useRef, useLayoutEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

function ParallaxWrapper({
  children,
  offset,
  className,
  style,
  onClick,
  animate,
  onHoverStart,
  onHoverEnd,
  initialstate,
  yInitial = 0,
  yFinal = 0,
}) {
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const ref = useRef(null);

  const { scrollY } = useScroll();

  // start animating our element when we've scrolled it into view
  const initial = elementTop - clientHeight + yInitial ?? 0;
  // end our animation when we've scrolled the offset specified
  const final = elementTop + offset + yFinal ?? 0;

  const yRange = useTransform(scrollY, [initial, final], [offset, -offset]);
  const y = useSpring(yRange, { stiffness: 400, damping: 90 });

  useLayoutEffect(() => {
    const element = ref.current;
    // save our layout measurements in a function in order to trigger
    // it both on mount and on resize
    const onResize = () => {
      // use getBoundingClientRect instead of offsetTop in order to
      // get the offset relative to the viewport
      setElementTop(
        element.getBoundingClientRect().top + window.scrollY ||
          window.pageYOffset
      );
      setClientHeight(window.innerHeight);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [ref]);

  return (
    <motion.div
      ref={ref}
      style={{ y, ...style }}
      className={className}
      onClick={onClick}
      initial={initialstate}
      animate={animate}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      {children}
    </motion.div>
  );
}

export default ParallaxWrapper;
