import { AnimatePresence, motion } from "framer-motion";
import Providers from "../components/core/Providers";
import CustomCursor from "../components/custom/cursor/cursor";
import DefaultLayout from "../components/layouts/default";
import "../styles/globals.css";

function MyApp({ Component, pageProps, router }) {
  const getLayout = Component?.getLayout || ((page) => page);

  return (
    <Providers>
      {<CustomCursor />}
      <DefaultLayout>
        <AnimatePresence mode="wait">
          <motion.div
            key={router.pathname}
            exit={{
              x: 0,
              transition: {
                duration: 0,
              },
            }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </DefaultLayout>
    </Providers>
  );
}

export default MyApp;
