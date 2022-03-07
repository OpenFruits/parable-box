import { useUser } from "@clerk/nextjs";
import type { CustomNextPage } from "next";
import Head from "next/head";
import { AddAbstractForm } from "src/component/AddAbstractForm";
import { SessionLoading } from "src/component/Loading/SessionLoading";
import { FixedLayout } from "src/layout/FixedLayout";

const Create: CustomNextPage = () => {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <>
      <Head>
        <title>Create Page</title>
      </Head>

      {!isLoaded ? <SessionLoading /> : <>{isSignedIn ? <AddAbstractForm /> : <p>Sign in to create item.</p>}</>}
    </>
  );
};

Create.getLayout = FixedLayout;

export default Create;
