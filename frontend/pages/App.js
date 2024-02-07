import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../common/Navbar";

const MyApp = ({ Component, pageProps, domainName }) => {
  return (
    <div className="page">
      <AnimatePresence mode="wait">
        <Navbar />
        <motion.div
          initial={{ y: 400 }}
          exit={{ y: 400 }}
          animate={{ y: 0 }}
          transition={{ bounce: 0, type: "spring", duration: 0.8 }}
          className="pageContent"
        >
          <Component
            key={"pageContent"}
            {...pageProps}
            domainName={domainName}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MyApp;
