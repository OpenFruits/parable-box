import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/router";
import type { VFC } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { NewAbstract } from "src/type/data";
import { supabaseClient } from "src/utils/supabase";

export const AddAbstractForm: VFC = () => {
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
    // eslint-disable-next-line @typescript-eslint/naming-convention
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
