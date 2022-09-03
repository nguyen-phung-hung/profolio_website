import { useLayout } from "../../hooks/useLayout";
import { motion } from "framer-motion";
import { useRef } from "react";

//?The custom curor will snap into the right side of the link

function HoverLink({
  initial,
  animate,
  exit,
  className,
  children,
  onClick,
  onHoverStart,
  onHoverEnd,
  style,
  gap,
}) {
  const ref = useRef();

  const { setIsHovered } = useLayout();

  return (
    <motion.div
      layout
      style={style}
      ref={ref}
      initial={initial}
      animate={animate}
      exit={exit}
      className={className}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onHoverStart={() => {
        setIsHovered({
          x: gap
            ? ref?.current?.getBoundingClientRect().x +
              ref?.current?.getBoundingClientRect().width +
              gap
            : ref?.current?.getBoundingClientRect().x +
              ref?.current?.getBoundingClientRect().width,
          y: gap
            ? ref?.current?.getBoundingClientRect().y - gap
            : ref?.current?.getBoundingClientRect().y,
        });
      }}
      onHoverEnd={() => {
        setIsHovered({ x: null, y: null });
      }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

export default HoverLink;
