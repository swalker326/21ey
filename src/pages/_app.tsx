import type { AppProps } from "next/app";
import Amplify from "aws-amplify";
import NextNProgress from "nextjs-progressbar";
import config from "../aws-exports";
import { ThemeWrapper } from "../context/ThemeContext";
import { GlobalStyles } from "../styles/GlobalStyles";

Amplify.configure({
  ...config,
  ssr: true,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeWrapper>
        <GlobalStyles />
        <NextNProgress
          color="#F6BE00"
          startPosition={0.5}
          stopDelayMs={200}
          height={6}
          showOnShallow={true}
        />
        <Component {...pageProps} />
      </ThemeWrapper>
    </>
  );
}

export default MyApp;
