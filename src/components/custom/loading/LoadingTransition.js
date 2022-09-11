import styles from "./loading.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { useLayout } from "../../../hooks/useLayout";
import Image from "next/image";
import LoadingCircle from "./LoadingCircle";
import { useEffect, useRef, useState } from "react";
import SplitText from "../../../utils/split3.min";
import { gsap } from "gsap/dist/gsap";
import { Back } from "gsap/dist/gsap";
import LogoIcon from "../../icons/logo";

function LoadingTransition() {
  const textRef = useRef();
  const { pageLoading, setPageLoading, setFirstLoading } = useLayout();
  const [loading, setLoading] = useState(true);

  const [circleIsLoading, setCircleIsLoading] = useState(true);
  let mySplitText;
  useEffect(() => {
    if (!textRef) return;
  }, [textRef]);

  useEffect(() => {
    mySplitText = new SplitText(textRef.current, {
      type: "words,chars",
    });
    gsap.from(mySplitText.chars, {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.02,
      ease: Back.easeOut,
    });
    document.addEventListener("keydown", (input) => {
      if (input.key === "e" || input.key === "E") {
        setLoading(false);
      }
    });
    return () => {
      document.removeEventListener("keydown", () => {});
    };
  }, []);

  useEffect(() => {
    if (!circleIsLoading) {
    }
  }, [circleIsLoading]);

  return (
    <>
      <AnimatePresence
        onExitComplete={() => {
          setFirstLoading(false);
        }}
      >
        {pageLoading.loading && (
          <motion.div
            className={styles.container}
            initial={{
              left: "0%",
            }}
            // animate={{
            //   left: "100%",
            //   transition: {
            //     duration: 2,
            //     damping: 100,
            //     stiffness: 400,
            //     mass: 1,
            //     type: "spring",
            //   },
            // }}
            exit={{
              left: "100%",
              transition: {
                duration: 2,
                damping: 100,
                stiffness: 400,
                mass: 1,
                type: "spring",
              },
            }}
          >
            <LoadingCircle
              className={styles.loading_circle}
              setCircleIsLoading={setCircleIsLoading}
              pageLoading={pageLoading}
              setPageLoading={setPageLoading}
              loading={loading}
            />
            <AnimatePresence>
              {loading && (
                <motion.div
                  ref={textRef}
                  layout
                  className={styles.center_text}
                  exit={{
                    opacity: 0,
                    transition: {
                      duration: 1,
                    },
                  }}
                >
                  <motion.div className={styles.center_text_name} layout>
                    <LogoIcon className={styles.logo} />
                  </motion.div>
                  <motion.div className={styles.center_text_city} layout>
                    NGUYEN PHUNG HUNG
                  </motion.div>
                  {!circleIsLoading && (
                    <motion.div
                      className={styles.press_e}
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        transition: {
                          duration: 0.5,
                        },
                      }}
                    >
                      Press e to continue
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default LoadingTransition;
