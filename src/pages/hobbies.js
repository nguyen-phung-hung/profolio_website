import { motion } from "framer-motion";

function HobbiesPage() {
  return (
    <motion.div
      style={{
        width: "100vw",
        minHeight: "100vh",
      }}
      key="hobbies-page"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0,
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          delay: 1,
          duration: 1,
        },
      }}
    ></motion.div>
  );
}

export default HobbiesPage;
