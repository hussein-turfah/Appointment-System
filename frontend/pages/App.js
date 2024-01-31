import { AnimatePresence } from "framer-motion";


const MyApp = ({ Component, pageProps, domainName }) => {
  return (
    <div className="page">
      <AnimatePresence mode="wait">
        <Component key={"pageContent"} {...pageProps} domainName={domainName} />
      </AnimatePresence>
    </div>
  );
};

export default MyApp;
