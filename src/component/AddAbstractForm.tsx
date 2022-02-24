import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/router";
import type { VFC } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
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
        <TextareaAutosize {...register("body", { required: "入力してください" })} />
        {errors.body?.message && <p className="text-red-500">{errors.body.message}</p>}
        <br />
        <button
          onClick={handleSubmit(submit)}
          className="group [transform:translateZ(0)] overflow-hidden relative before:absolute before:bottom-0 before:left-0 p-2 before:w-full before:h-full bg-sky-200 before:bg-sky-500 rounded-lg before:transition before:duration-500 before:ease-in-out before:scale-x-0 hover:before:scale-x-100 before:origin-[100%_100%] hover:before:origin-[0_0]"
        >
          <span className="relative z-0 text-black group-hover:text-gray-200 transition duration-500 ease-in-out">
            投稿
          </span>
        </button>
      </form>
    </div>
  );
};
