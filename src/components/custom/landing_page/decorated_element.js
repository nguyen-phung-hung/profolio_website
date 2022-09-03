import Image from "next/image";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect } from "react";

function DecoratedElement({ className, src, index, speed, move, rotate }) {
  const hasWindow = typeof window !== "undefined";
  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);

  const springX = useSpring(motionX, {
    damping: 100,
    stiffness: 200,
    mass: 0.5,
  });

  const springY = useSpring(motionY, {
    damping: 100,
    stiffness: 200,
    mass: 0.5,
  });

  useEffect(() => {
    if (!hasWindow) return;

    window.addEventListener("mousemove", (event) => {
      const x = (window.innerWidth - event.pageX * speed) / 100;
      const y = (window.innerHeight - event.pageY * speed) / 100;

      motionX.set(x);
      motionY.set(y);
    });

    return () => {
      window.removeEventListener("mousemove", () => {
        motionX.destroy();
        motionY.destroy();
      });
    };
  }, [hasWindow]);

  return (
    <motion.div
      className={className}
      style={{
        x: springX,
        y: springY,
        rotate,
      }}
    >
      <motion.div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
        initial={{ y: 0 }}
        animate={{
          y: [move, -move, move],

          transition: {
            delay: (index + 1) * 2,
            duration: 20,
            repeat: Infinity,
            type: "spring",
            stiffness: 200,
            damping: 100,
          },
        }}
        exit={{
          scale: 0,
          rotate: 180,
          transition: {
            delay: (index + 1) * 0.2,
            duration: 1,
            ease: "easeInOut",
          },
        }}
      >
        <Image src={src} layout="fill" />
      </motion.div>
    </motion.div>
  );
}

export default DecoratedElement;
