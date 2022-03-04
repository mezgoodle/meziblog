import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content="Blog page" />
        <meta
          name="description"
          content="Here you can read posts, edit and delete them"
        />
        <meta
          name="keywords"
          content="posts, react, next, fastapi, ssr, restapi"
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <title>Mezi Blog</title>
      </Head>
      <Header />
      <div className="container">{children}</div>
      <Footer />
    </>
  );
}
