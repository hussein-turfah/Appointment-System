import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../common/Navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../actions/UserActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MyApp = ({ Component, pageProps, domainName }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const authPages = ["/login", "/register", "/forgot-password"];
  const isAuthPage = authPages.includes(router.pathname);
  const [token, setToken] = useState(null);

  const user = useSelector(({ UserData }) => UserData.data);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, [router.pathname, dispatch, token, user]);

  useEffect(() => {
    dispatch(getUser(token));
  }, [token, dispatch]);

  useEffect(() => {
    if (token && authPages.includes(router.pathname)) {
      dispatch(getUser(token));
      router.push("/calendar");
    } else if (!token && !authPages.includes(router.pathname)) {
      // router.push("/login");
    } else if (token) {
      dispatch(getUser(token));
    }
  }, [token, dispatch, router.pathname]);


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
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MyApp;
