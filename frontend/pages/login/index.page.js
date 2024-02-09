import { useRouter } from "next/router";
import styles from "./styles/index.module.scss";
import SignInForm from "./signInForm";
import WorkTimeTable from "../users/components/workTime";


export default function Login() {


  return (
    // <main className={styles.main}>
    //   <h1 className={styles.title}>Welcome to my Next.js app!</h1>
    //   <h1 className="text-3xl font-bold underline">
    //   Hello world!
    // </h1>
    //   <button onClick={googleAuth}>Login with Google</button>
    // </main>
    <SignInForm />
    // <WorkTimeTable />
  
  );
};

