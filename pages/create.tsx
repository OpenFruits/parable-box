import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import type { CustomNextPage } from "next";
import Head from "next/head";
import { AddAbstractForm } from "src/component/AddAbstractForm";
import { SessionLoading } from "src/component/SessionLoading";
import { FixedLayout } from "src/layout/FixedLayout";

const Create: CustomNextPage = () => {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <>
      <Head>
        <title>Create Page</title>
      </Head>

      <main>
        {!isLoaded ? (
          <SessionLoading />
        ) : (
          <>
            {isSignedIn ? (
              <AddAbstractForm />
            ) : (
              <div>
                <p>Sign in to create item.</p>
                <SignInButton />
                <br />
                <SignUpButton />
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
};

Create.getLayout = FixedLayout;

export default Create;
