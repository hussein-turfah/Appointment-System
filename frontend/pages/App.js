import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../common/Navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllDoctors } from "../actions/DoctorActions";
import { getUser } from "../actions/UserActions";

const MyApp = ({ Component, pageProps, domainName }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const authPages = ["/login", "/register", "/forgot-password"];
  const isAuthPage = authPages.includes(router.pathname);

  const [token, setToken] = useState(null);

  // If the user is not logged in and the page is not an auth page, redirect to the login page
  // useEffect(() => {
  //   if (!token && !isAuthPage) {
  //     router.push("/login");
  //   } 
  //   else if (token && isAuthPage) {
  //     router.push("/");
  //   }
  // }, [router, isAuthPage]);

  useEffect(() => {
    if (token) {
      dispatch(getAllDoctors());
      // dispatch(getUser());
    }
  }, [dispatch, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

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
          style={{ top: isAuthPage && "0" }}
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
