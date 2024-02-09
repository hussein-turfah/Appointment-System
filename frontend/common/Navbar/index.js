import styles from "./styles/index.module.scss";
import { motion } from "framer-motion";
import {
  faBriefcase,
  faUserGroup,
  faUser,
  faUsers,
  faCalendarDays,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import Tab from "./components/tab";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Nav() {
  const [active, setActive] = useState("calendar");
  const router = useRouter();

  useEffect(() => {
    setActive(router.pathname.split("/")[1]);
  }, [router.pathname]);

  return (
    <>
      <motion.div
        initial={{ y: -80 }}
        exit={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ bounce: 0, type: "spring", duration: 0.8 }}
        className={styles.container}
      >
        <div>
          {/* <div>Logo</div> */}
          <h1>TABIB CLINIC</h1>
        </div>
        <div className={styles.tabs}>
          <Tab
            text={"Calendar"}
            icon={faCalendarDays}
            active={active === "calendar"}
            setActive={setActive}
          />
          <Tab
            text={"Patients"}
            icon={faUserGroup}
            active={active === "patients"}
            setActive={setActive}
          />
          <Tab
            text={"Invoice"}
            icon={faMoneyBill}
            active={active === "services"}
            setActive={setActive}
          />
          <Tab
            text={"Users"}
            icon={faUsers}
            active={active === "users"}
            setActive={setActive}
          />
          <Tab
            text={"Zeinab Mohsen"}
            icon={faUser}
            active={active === "zeinab mohsen"}
            setActive={setActive}
          />
        </div>
      </motion.div>
    </>
  );
}
