import { useUser } from "@clerk/nextjs";
import type { CustomNextPage } from "next";
import Head from "next/head";
import { SessionLoading } from "src/component/Loading/SessionLoading";
import { MyAbstractList } from "src/component/MyAbstractList";
import { FixedLayout } from "src/layout/FixedLayout";

const MyPost: CustomNextPage = () => {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <>
      <Head>
        <title>MyPost Page</title>
      </Head>

      {!isLoaded ? (
        <SessionLoading />
      ) : (
        <div>{isSignedIn ? <MyAbstractList /> : <p>Sign in to watch liked items.</p>}</div>
      )}
    </>
  );
};

MyPost.getLayout = FixedLayout;

export default MyPost;
