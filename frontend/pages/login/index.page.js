import { useRouter } from "next/router";
import styles from "./styles/index.module.scss";

export default function Login() {

  const googleAuth = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback`,
      "_self"
    );
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to my Next.js app!</h1>
      <button onClick={googleAuth}>Login with Google</button>
    </main>
  );
};

