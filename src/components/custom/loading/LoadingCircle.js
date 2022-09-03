import { useEffect, useState, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useSpring,
  useTransform,
} from "framer-motion";

export default function LoadingCircle({
  className,
  setCircleIsLoading,
  pageLoading,
  setPageLoading,
  loading,
}) {
  const pathRef = useRef();

  return (
    <>
      <motion.svg className={className} viewBox="0 0 200 200">
        <AnimatePresence
          onExitComplete={() => {
            setPageLoading({ ...pageLoading, loading: false });
          }}
        >
          {loading && (
            <motion.path
              ref={pathRef}
              fill="none"
              strokeWidth="0.5"
              stroke="white"
              //   strokeDasharray="0 1"
              d="M 100, 100
          m -100, 0
          a 100,100 0 1,1 200,0
          a 100,100 0 1,1 -200,0"
              style={{
                rotate: 90,
                scaleX: -1,
              }}
              initial={{ pathLength: 0 }}
              onAnimationComplete={() => {
                setCircleIsLoading(false);
              }}
              animate={{
                // animationDirection: "reverse",
                pathLength: 1.01,
                transition: {
                  ease: "easeInOut",
                  duration: 2,
                  //   damping: 200,
                  //   stiffness: 150,
                  //   mass: 10,
                  //   type: "spring",
                },
              }}
              exit={{
                pathLength: 0,
                scaleX: 1,
                transition: {
                  ease: "easeInOut",
                  duration: 1.5,
                },
              }}
            />
          )}
        </AnimatePresence>
        <g />
      </motion.svg>
    </>
  );
}
