import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../common/Navbar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllDoctors } from "../actions/DoctorActions";

const MyApp = ({ Component, pageProps, domainName }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const authPages = ["/login", "/register", "/forgot-password"];
  const isAuthPage = authPages.includes(router.pathname);


  // If the user is not logged in and the page is not an auth page, redirect to the login page
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token && !isAuthPage) {
  //     router.push("/login");
  //   }
  // }, []);

  useEffect(() => {
    // get all doctors
    dispatch(getAllDoctors());
  }
  , []);


  return (
    <div className="page">
      <AnimatePresence mode="wait">
        {!isAuthPage && <Navbar />}
        <motion.div
          initial={{ y: 400 }}
          exit={{ y: 400 }}
          animate={{ y: 0 }}
          transition={{ bounce: 0, type: "spring", duration: 0.8 }}
          className="pageContent"
          style={{ top: !isAuthPage ? "3.5rem" : "0" }}
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
