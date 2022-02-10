import { SignInButton, SignUpButton, useSession, useUser } from "@clerk/nextjs";
import type { CustomNextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import type { VFC } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { FixedLayout } from "src/layout/FixedLayout";
import type { NewAbstract } from "src/type/data";
import { supabaseClient } from "src/utils/supabase";

const AddTodoForm: VFC = () => {
  const router = useRouter();
  const { session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewAbstract>();

  const submit: SubmitHandler<NewAbstract> = async (data) => {
    if (data.body === "") return;
    const supabaseAccessToken = await session.getToken({
      template: "Supabase",
    });
    const supabase = await supabaseClient(supabaseAccessToken as string);
    await supabase.from("abstracts").insert({ body: data.body, user_id: session.user.id });
    router.push("/");
  };

  return (
    <div>
      <h2>命題を投稿</h2>
      <form onSubmit={handleSubmit(submit)}>
        <textarea {...register("body", { required: "入力してください" })} />
        {errors.body?.message && <p>{errors.body.message}</p>}
        <br />
        <button onClick={handleSubmit(submit)} className="p-2 bg-sky-200 hover:bg-sky-300 rounded">
          投稿
        </button>
      </form>
    </div>
  );
};

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
              <AddTodoForm />
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
