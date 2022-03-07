import { useUser } from "@clerk/nextjs";
import type { CustomNextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { AbstractDetails } from "src/component/AbstractDetails";
import { SessionLoading } from "src/component/Loading/SessionLoading";
import { FixedLayout } from "src/layout/FixedLayout";

const AbstractId: CustomNextPage = () => {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const abstractId = router.query.id;

  return (
    <>
      <Head>
        <title>Parable Box</title>
      </Head>
      {!isLoaded ? (
        <SessionLoading />
      ) : (
        <div>{isSignedIn ? <AbstractDetails id={abstractId as string} /> : <p>Sign in to watch detail.</p>}</div>
      )}
    </>
  );
};

AbstractId.getLayout = FixedLayout;

export default AbstractId;
