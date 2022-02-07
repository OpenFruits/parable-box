import "../src/style/index.css";

import { ClerkProvider } from "@clerk/nextjs";
import type { CustomAppProps } from "next/app";
import Head from "next/head";

const MyApp = (props: CustomAppProps) => {
  const getLayout =
    props.Component.getLayout ||
    ((page) => {
      return page;
    });

  return (
    <>
      <Head>
        <meta name="description" content="Starter Template by Next.js and TailwindCSS." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ClerkProvider>{getLayout(<props.Component {...props.pageProps} />)}</ClerkProvider>
    </>
  );
};

export default MyApp;
