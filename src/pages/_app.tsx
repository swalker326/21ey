import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Amplify from "aws-amplify";
import useLoader from "../components/Loader/useLoader";
import NextNProgress from "nextjs-progressbar";
import config from "../aws-exports";
import { useRouter } from "next/router";
Amplify.configure({
  ...config,
  ssr: true,
});

function Loading() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleFinish = (url) => url === router.asPath && setLoading(false);
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeCompleted", handleFinish);
    router.events.on("routeChangeError", handleStart);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleFinish);
      router.events.off("routeChangeError", handleFinish);
    };
  });

  return loading && <div>Loading....</div>;
}
function MyApp({ Component, pageProps }: AppProps) {
  const { setShowLoader, showLoader, Loader, setCurrentFill, currentFill } =
    useLoader();
  return (
    <>
      {/* <NextNProgress
        color="#F6BE00"
        startPosition={0.5}
        stopDelayMs={200}
        height={6}
        showOnShallow={true}
      /> */}
      <Loader currentFill={currentFill} showLoader={showLoader} />
      <button onClick={() => setShowLoader(!showLoader)}>Hide Loader</button>
      <button onClick={() => setCurrentFill(currentFill + 10)}>Loader +</button>
      <button onClick={() => setCurrentFill(currentFill - 10)}>Loader -</button>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
