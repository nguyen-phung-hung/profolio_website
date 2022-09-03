import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const [isComplete, setIsComplete] = useState(false);
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
  const pathLength = useSpring(yRange, { stiffness: 400, damping: 90 });

  useEffect(() => yRange.onChange((v) => setIsComplete(v >= 1)), [yRange]);

  return (
    <>
      <svg
        className="progress-icon"
        viewBox="0 0 200 200"
        style={{ position: "fixed", top: 0, left: 50, width: "100px" }}
      >
        <motion.path
          fill="none"
          strokeWidth="5"
          stroke="black"
          strokeDasharray="0 1"
          d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
          style={{
            pathLength,
            rotate: 90,
            translateX: 5,
            translateY: 5,
            scaleX: -1,
          }}
        />
        <motion.path
          fill="none"
          strokeWidth="5"
          stroke="black"
          d="M14,26 L 22,33 L 35,16"
          initial={false}
          strokeDasharray="0 1"
          animate={{ pathLength: isComplete ? 1 : 0 }}
        />
      </svg>
    </>
  );
}
