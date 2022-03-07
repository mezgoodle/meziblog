import { useState } from "react";

import Layout from "../components/Layout";
import { EditContext } from "../context/EditContext";

function MyApp({ Component, pageProps }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");

  return (
    <EditContext.Provider
      value={{ title, setTitle, body, setBody, author, setAuthor }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </EditContext.Provider>
  );
}

export default MyApp;
