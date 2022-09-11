import { useEffect, useState, useRef } from "react";
import useWindowDimensions from "../../../hooks/useDimensions";

import { gsap } from "gsap/dist/gsap";

import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import dynamic from "next/dynamic";
import LoadingTransition from "../../custom/loading/LoadingTransition";
import { useLayout } from "../../../hooks/useLayout";
import { motion } from "framer-motion";
import LogoIcon from "../../icons/logo";
import { useRouter } from "next/router";
import Navigation from "../navigation";
import SubLoading from "../../custom/loading/SubLoading";
const SmoothScroll = dynamic(() => import("../../custom/SmoothScroll"), {
  ssr: false,
});

function DefaultLayout({ children }) {
  const router = useRouter();

  const mainRef = useRef();
  const { firstLoading, setPageLoading, pageLoading } = useLayout();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (firstLoading || !pageLoading.url) {
      setPageLoading((prev) => ({ ...prev, url: router.pathname }));
    }
  }, []);

  const [device, setDevice] = useState();

  const { currentDevice } = useWindowDimensions();

  useEffect(() => {
    setDevice(currentDevice);
  }, [currentDevice]);

  return (
    <>
      {firstLoading ? <LoadingTransition /> : <SubLoading />}

      {device === "desktop" ? (
        <>
          <Navigation />
          <motion.div
            onClick={() => {
              router.push("/");
            }}
            style={{
              position: "fixed",
              // width: "6vw",
              // height: "6vw",
              top: "8%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 99,
            }}
            animate={{
              left: router.pathname === "/" ? "50%" : "5%",
              width: router.pathname === "/" ? "6vw" : "4vw",
              height: router.pathname === "/" ? "6vw" : "4vw",
              transition: {
                duration: 1,
                delay: router.pathname === "/" ? 1 : 4,
              },
            }}
            // exit={{
            //   left: router.pathname === "/" ? "50%" : "5%",
            //   transition: {
            //     duration: 1,
            //     delay: router.pathname === "/" ? 1 : 4,
            //   },
            // }}
          >
            <LogoIcon
              style={{
                width: "6vw",
                height: "6vw",
              }}
            />
          </motion.div>
          <motion.div
            style={{
              position: "fixed",
              top: "16%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontFamily: "Aboreto ,cursive",
            }}
            animate={{
              opacity: router.pathname === "/" ? 1 : 0,
              transition: {
                duration: 1,
                delay: router.pathname === "/" ? 1 : 4,
              },
            }}
          >
            Nguyen Phung Hung
          </motion.div>
          <SmoothScroll>
            <motion.main
              ref={mainRef}
              // data-scroll-container

              // key={router.pathname + "main"}
              style={{
                width: "100%",
                minHeight: "100vh",
              }}
              // exit={{
              //   opacity: 0,
              //   transition: {
              //     delay: 1,
              //     duration: 1,
              //   },
              // }}
            >
              {children}
            </motion.main>
          </SmoothScroll>
        </>
      ) : (
        <>
          <motion.main
            style={{
              width: "100%",
              minHeight: "100vh",
            }}
            exit={{
              opacity: 0,
              transition: {
                delay: 1,
                duration: 0.5,
              },
            }}
          >
            {children}
          </motion.main>
        </>
      )}
    </>
  );
}

export default DefaultLayout;
