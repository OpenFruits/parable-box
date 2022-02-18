import { useUser } from "@clerk/nextjs";
import type { CustomNextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { MyAbstractList } from "src/component/MyAbstractList";
import { SessionLoading } from "src/component/SessionLoading";
import { FixedLayout } from "src/layout/FixedLayout";
import type { Abstract } from "src/type/data";

const MyPost: CustomNextPage<{ abstracts: Abstract[] }> = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  const [abstracts, setAbstracts] = useState<Abstract[]>([]);

  return (
    <>
      <Head>
        <title>MyPost Page</title>
      </Head>
      {!isLoaded ? (
        <SessionLoading />
      ) : (
        <main>
          {isSignedIn ? (
            <>
              <p>{user.fullName}さんの投稿一覧</p>
              <MyAbstractList abstracts={abstracts} setAbstracts={setAbstracts} />
            </>
          ) : (
            <p>Sign in to watch liked items.</p>
          )}
        </main>
      )}
    </>
  );
};

MyPost.getLayout = FixedLayout;

export default MyPost;
