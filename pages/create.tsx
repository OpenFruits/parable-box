import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import type { CustomNextPage } from "next";
import Head from "next/head";
import { AddAbstractForm } from "src/component/AddAbstractForm";
import { FixedLayout } from "src/layout/FixedLayout";

const Create: CustomNextPage = () => {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <>
      <Head>
        <title>Create Page</title>
      </Head>

      <div>
        {!isLoaded ? (
          <>Loading...</>
        ) : (
          <main>
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
          </main>
        )}
      </div>
    </>
  );
};

Create.getLayout = FixedLayout;

export default Create;
