import Layout from "../components/Layout";
import { EditProvider } from "../context/EditContext";

function MyApp({ Component, pageProps }) {
  return (
    <EditProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </EditProvider>
  );
}

export default MyApp;
