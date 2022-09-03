import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../../../hooks/useDimensions";
import Link from "next/link";
import { useLayout } from "../../../hooks/useLayout";
import { useRouter } from "next/router";

function IntroImage({ className, src, alt, link, index, color }) {
  const router = useRouter();

  const containerRef = useRef();

  const { pageLoading, setImageValue, setIndicater } = useLayout();

  const { width, height } = useWindowDimensions();
  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!containerRef) return;

    function getPosition() {
      const image = containerRef.current;
      if (!image) return;
      const rect = image.getBoundingClientRect();

      function xPos() {
        return width / 2 - rect.left - rect.width / 2;
      }
      function yPos() {
        return height / 2 - rect.top - rect.height / 2;
      }

      setCoordinates({
        x: xPos(),
        y: yPos(),
      });
    }

    getPosition();

    if (window) {
      window.addEventListener("resize", () => {
        getPosition();
      });
    }

    return () => {
      if (window) {
        window.removeEventListener("resize", () => {
          getPosition();
        });
      }
    };
  }, [containerRef]);

  function onClick() {
    if (!containerRef) return;
    const image = containerRef.current;
    const rect = image.getBoundingClientRect();

    setImageValue({
      x: width / 2 - rect.width / 2,
      y: height / 2 - rect.height / 2,
      width: rect.width,
      height: rect.height,
    });
    setIndicater("");
  }

  return (
    <Link href={link}>
      <motion.div
        onClick={onClick}
        className={className}
        ref={containerRef}
        onHoverStart={() => {
          if (router.pathname === "/") {
            setHovered(true);
            setIndicater(alt);
          }
        }}
        onHoverEnd={() => {
          setHovered(false);
          setIndicater("");
        }}
        initial={{
          clipPath: `inset(100% 0% 0% 0%)`,
          opacity: 1,
        }}
        animate={
          !pageLoading.loading && {
            clipPath: `inset(0% 0% 0% 0%)`,
            scaleX: 1,
            transition: {
              delay: (index + 1) * 0.3,
              type: "spring",
              damping: 100,
              stiffness: 200,
              mass: 0.5,
            },
          }
        }
        exit={{
          x: coordinates.x,
          y: coordinates.y,
          // opacity: pageLoading.url === link ? 1 : 0,
          zIndex: pageLoading.url === link ? 10 : 1,
          transition: {
            delay: (index + 1) * 0.2,
            duration: 2.5,
            ease: "easeInOut",
          },
        }}
      >
        <motion.div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            backgroundColor: `#${color}`,
          }}
          animate={{
            scale: hovered ? 1.1 : 1,
            transition: {
              duration: hovered ? 4 : 1,
              ease: "easeInOut",
            },
          }}
          exit={{
            opacity: pageLoading.url === link ? 1 : 0,
            transition: {
              duration: 1,
              ease: "easeInOut",
              delay: 3.5,
            },
          }}
        >
          <motion.div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
            initial={{
              filter: "grayscale(1)",
              opacity: 1,
            }}
            whileHover={{
              filter: "grayscale(0)",
              transition: {
                duration: 2,
                ease: "easeInOut",
              },
            }}
            exit={{
              opacity: pageLoading.url === link ? 1 : 0,
              transition: {
                delay: 1,
                duration: 1,
              },
            }}
          >
            <Image src={src} alt={alt} layout="fill" />
          </motion.div>
        </motion.div>
      </motion.div>
    </Link>
  );
}

export default IntroImage;
