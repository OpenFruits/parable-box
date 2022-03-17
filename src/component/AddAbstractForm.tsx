import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/router";
import type { VFC } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "src/component/Button";
import type { NewAbstract } from "src/type";
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
    <div className="py-4">
      <h2>命題（抽象）を投稿</h2>
      <form onSubmit={handleSubmit(submit)}>
        <TextareaAutosize
          className="w-full border-gray-200 focus:border-blue-200 focus:ring-0 resize-none"
          {...register("body", { required: "入力してください" })}
        />
        {errors.body?.message && <p className="text-red-500">{errors.body.message}</p>}
        <br />
        <Button onClick={handleSubmit(submit)}>投稿</Button>
      </form>
    </div>
  );
};
