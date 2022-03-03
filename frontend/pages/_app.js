import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <div className="container">
        <div class="row justify-content-center">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}

export default MyApp;
