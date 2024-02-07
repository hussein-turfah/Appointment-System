import { Provider } from "react-redux";
import store from "../store/configureStore";
import App from "./App";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "../styles/globals.scss";
import "../styles/fonts.scss";

config.autoAddCss = false;

const ClinIQ = ({ Component, pageProps, domainName }) => {
  // useEffect(() => {
  //   window.addEventListener("load", () => {
  //     TagManager.initialize({ gtmId: "UA-206101816-1" });
  //   });
  // }, []);

  return (
    <GoogleOAuthProvider clientId="102994286686-517isv5cejn74kh24uq0jl8rha01kmh5.apps.googleusercontent.com">
      <Provider store={store}>
        <App
          Component={Component}
          pageProps={pageProps}
          domainName={domainName}
        />
      </Provider>
    </GoogleOAuthProvider>
  );
};

ClinIQ.getInitialProps = async (context) => {
  return {
    domainName: context.ctx.req?.headers.host ?? window.location.host,
  };
};

export default ClinIQ;
