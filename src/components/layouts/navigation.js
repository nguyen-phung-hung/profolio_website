import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLayout } from "../../hooks/useLayout";
import HoverLink from "../animations/HoverLink";
import styles from "./navigation.module.css";
import { useState, useEffect } from "react";

import { createUseStyles } from "react-jss";
import { navigationStyles } from "./LayoutStyle.js";

const useStyles = createUseStyles(navigationStyles);

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Skills",
    href: "/skills",
  },
  {
    name: "Gallery",
    href: "/gallery",
  },
  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "Hobbies",
    href: "/hobbies",
  },
];

function Navigation() {
  const styles = useStyles();

  const router = useRouter();
  const { pageLoading } = useLayout();
  const [activeLink, setActiveLink] = useState(router.pathname);
  const [timeOutID, setTimeOutID] = useState(null);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveLink(router.pathname);
    }, 1000);

    setTimeOutID(timeout);

    return () => {
      clearTimeout(timeOutID);
    };
  }, [router.pathname]);

  return (
    <AnimatePresence mode="wait">
      {pageLoading.url !== "/" && (
        <motion.nav
          key={"nav-bar"}
          className={styles.container}
          initial={{
            opacity: 0,
            y: -30,
          }}
          animate={{
            y: 0,
            opacity: 1,
            transition: { duration: 1, delay: 4, ease: "easeInOut" },
          }}
          exit={{
            opacity: 0,
            y: -30,
            transition: { duration: 1, ease: "easeInOut" },
          }}
        >
          <AnimatePresence mode="popLayout">
            {links.map((link) => {
              return (
                activeLink !== link.href && (
                  <HoverLink
                    className={styles.link}
                    key={link.name}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.5, ease: "easeInOut" },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.5, ease: "easeInOut" },
                    }}
                  >
                    <Link href={link.href} scroll={false}>
                      {link.name}
                    </Link>
                  </HoverLink>
                )
              );
            })}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

export default Navigation;
