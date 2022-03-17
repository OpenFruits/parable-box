import { useUser } from "@clerk/nextjs";
import type { CustomNextPage } from "next";
import Head from "next/head";
import { AbstractList } from "src/component/AbstractList";
import { SessionLoading } from "src/component/Loading/SessionLoading";
import { FixedLayout } from "src/layout/FixedLayout";
import type { Abstract } from "src/type";

const Liked: CustomNextPage<{ abstracts: Abstract[] }> = () => {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <>
      <Head>
        <title>Liked Page</title>
      </Head>
      {!isLoaded ? <SessionLoading /> : <>{isSignedIn ? <AbstractList /> : <p>Sign in to watch liked items.</p>}</>}
    </>
  );
};

Liked.getLayout = FixedLayout;

export default Liked;
