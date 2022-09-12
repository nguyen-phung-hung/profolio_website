import styles from "./sub_loading.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { useLayout } from "../../../hooks/useLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function SubLoading() {
  const router = useRouter();
  const { pageLoading, setScrollLocked, scrollTo } = useLayout();
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [allSet, setAllSet] = useState(true);

  const [timeOutID, setTimeOutID] = useState();
  const [timeOutID2, setTimeOutID2] = useState();

  useEffect(() => {
    if (!pageLoading.loading) {
      setScrollLocked(false);
    }

    if (pageLoading.loading) {
      setAllSet(false);
    }
    if (pageLoading.loading && !animationCompleted) {
      setAllSet(false);
    }

    if (!pageLoading.loading && animationCompleted) {
      const timeOut1 = setTimeout(() => {
        scrollTo({ x: 0, y: 0 });
      }, 500);

      setTimeOutID(timeOut1);

      const timeOut2 = setTimeout(() => {
        setAllSet(true);
      }, 1500);
      setTimeOutID2(timeOut2);
    }

    return () => {
      clearTimeout(timeOutID);
      clearTimeout(timeOutID2);
    };
  }, [pageLoading.loading, animationCompleted]);

  return (
    <AnimatePresence mode="wait">
      {!allSet && (
        <motion.div
          className={styles.container}
          initial={{
            left: "-100%",
          }}
          animate={{
            left: "0%",
            transition: {
              duration: 1,
              ease: "easeInOut",
            },
          }}
          onAnimationStart={() => {
            setAnimationCompleted(true);
          }}
          onAnimationEnd={() => {
            setAnimationCompleted(false);
          }}
          exit={{
            left: "100%",
            transition: {
              duration: 1,
              ease: "easeInOut",
            },
          }}
        ></motion.div>
      )}
    </AnimatePresence>
  );
}
export default SubLoading;
