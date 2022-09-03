import { useState, useEffect } from "react";

//?useWindowDimensions return an object with type spring currentDevices and width and height

export default function useWindowDimensions() {
  const hasWindow = typeof window !== "undefined";
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;

    if (width < 768) {
      return {
        currentDevice: "mobile",
        width,
        height,
      };
    }

    if (width >= 768 && width < 1024) {
      return {
        currentDevice: "tablet",
        width,
        height,
      };
    }

    if (width >= 1024) {
      return {
        currentDevice: "desktop",
        width,
        height,
      };
    }

    return {
      width,
      height,
    };
  }

  let fn;

  useEffect(() => {
    if (hasWindow) {
      fn = function handleResize() {
        setWindowDimensions(getWindowDimensions());
      };

      window.addEventListener("resize", fn);
      return () => window.removeEventListener("resize", fn);
    }
  }, [hasWindow]);

  return windowDimensions;
}
