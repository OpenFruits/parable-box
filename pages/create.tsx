import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import type { CustomNextPage } from "next";
import Head from "next/head";
import { Button2 as Btn2 } from "src/component/Button2";
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
              <div>
                <h2>命題を投稿</h2>
                <textarea name="" id=""></textarea>
                <form>
                  <Btn2 tag="input" type="submit" value="submit" className="p-2 bg-sky-200 hover:bg-sky-300 rounded" />
                </form>
              </div>
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
