import Layout from "../components/Layout";
import { EditProvider } from "../context/EditContext";
import { UserProvider } from "../context/UserContext";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <EditProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </EditProvider>
    </UserProvider>
  );
}

export default MyApp;
