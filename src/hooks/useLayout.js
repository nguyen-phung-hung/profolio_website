import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useScrollLock, useWindowScroll } from "@mantine/hooks";
import useWindowDimensions from "./useDimensions";

const LayoutContext = createContext();

//? This is layoutContext where all states of anything relating to layout

export function LayoutProvider({ children }) {
  const hasWindow = typeof window !== "undefined";
  const router = useRouter();
  const { height } = useWindowDimensions();

  const [scrollLocked, setScrollLocked] = useScrollLock();

  const [scroll, scrollTo] = useWindowScroll();

  const [firstLoading, setFirstLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState({
    loading: true,
    url: null,
  });

  //state when page loading which container an object with boolean loading and the next url in srping

  const [navIsOpen, setNavIsOpen] = useState(false);
  //state of the navigation button

  const [totalHeight, setTotalHeight] = useState();
  //height of the website or total scrollable value

  const [scrolled, setScrolled] = useState(0);
  //curent instant value of scroll. For example totalHeight is about 1200 and scrolled is 600 means that user scrolled half of the page

  const [isHovered, setIsHovered] = useState({ x: null, y: null });
  //store the link curent position for the cursor to snap

  const [cursorType, setCursorType] = useState();
  //store the cursor type

  const [imageValue, setImageValue] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [indicater, setIndicater] = useState("");

  useEffect(() => {
    if (hasWindow) {
      window.addEventListener("resize", () => {
        setTotalHeight(window.document.documentElement.scrollHeight - height);
      });
    }
  }, [hasWindow]);
  //listen to the page got resize and change the totalHeight state

  useEffect(() => {
    // setScrollLocked(true);
    router.events.on("routeChangeStart", (url) => {
      //   setScrollLocked(true);
      setIndicater("");

      setPageLoading((prev) => {
        console.log("prev", prev.url);

        if (prev.url === url) return { ...prev };

        if (prev.url === "/") {
          return { loading: false, url };
        }

        return { loading: true, url };
      });

      console.log("routeChangeStart", url);

      setNavIsOpen(false);
    });
    //Listen to the url on change where the page just starts to change and then execute any following codes.

    router.events.on("routeChangeComplete", (url) => {
      console.log("routeChangeComplete", url);

      setIndicater("");
      // scrollTo({ x: 0, y: 0 });
      setPageLoading({
        loading: false,
        url,
      });

      setIsHovered({ x: null, y: null });
    });
    //Listen to the url where the page change complete and then execute any following code

    // setTimeout(() => {
    //   setPageLoading({
    //     loading: false,
    //     url: null,
    //   });
    // }, 4000);
    //there is nothing to load so 2 seconds here to define first loading page :D

    return () => {
      router.events.off("routeChangeStart");
      router.events.off("routeChangeComplete");
    };
    //We need to turn off the listen because if this provider unmounted with the listener, memory will leak.
  }, []);

  const content = {
    firstLoading,
    setFirstLoading,
    pageLoading,
    setPageLoading,
    setScrollLocked,
    setCursorType,
    cursorType,
    setIsHovered,
    isHovered,
    scrollLocked,
    navIsOpen,
    setNavIsOpen,
    setTotalHeight,
    totalHeight,
    setScrolled,
    scrolled,
    scroll,
    scrollTo,
    setImageValue,
    imageValue,
    indicater,
    setIndicater,
  };

  return (
    <LayoutContext.Provider value={content}>{children}</LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error(`useLayout must be used within a LayoutProvider.`);
  }
  return context;
}
