import { useUser } from "@clerk/nextjs";
import type { CustomNextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { AbstractList } from "src/component/AbstractList";
import { FixedLayout } from "src/layout/FixedLayout";
import type { Abstract } from "src/type/data";

const Liked: CustomNextPage<{ abstracts: Abstract[] }> = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  const [abstracts, setAbstracts] = useState<Abstract[]>([]);

  return (
    <>
      <Head>
        <title>Liked Page</title>
      </Head>
      {!isLoaded ? (
        <>Loading...</>
      ) : (
        <>
          {isSignedIn ? (
            <div>
              <p>{user?.fullName}がいいねした投稿一覧</p>
              <AbstractList abstracts={abstracts} setAbstracts={setAbstracts} />
            </div>
          ) : (
            <p>Sign in to watch liked items.</p>
          )}
        </>
      )}
    </>
  );
};

Liked.getLayout = FixedLayout;

export default Liked;
