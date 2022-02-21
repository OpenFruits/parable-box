import { useUser } from "@clerk/nextjs";
import type { CustomNextPage } from "next";
import Head from "next/head";
import { MyAbstractList } from "src/component/MyAbstractList";
import { SessionLoading } from "src/component/SessionLoading";
import { FixedLayout } from "src/layout/FixedLayout";
import type { Abstract } from "src/type/data";

const MyPost: CustomNextPage<{ abstracts: Abstract[] }> = () => {
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
