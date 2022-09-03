import locomotiveScroll from "locomotive-scroll/dist/locomotive-scroll";
import { useEffect } from "react";

export default function useLocoScroll() {
  const hasWindow = typeof window !== "undefined";

  const scrollEl = document.querySelector("#main-container");

  useEffect(() => {
    const locoScroll = new locomotiveScroll({
      el: scrollEl,
      smooth: true,
      multiplier: 1,
      class: "is-reveal",
    });
  }, [hasWindow]);
}
