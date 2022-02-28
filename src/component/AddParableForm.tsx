import { useSession } from "@clerk/nextjs";
import type { VFC } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "src/component/Button";
import type { NewParable } from "src/type/data";
import { supabaseClient } from "src/utils/supabase";

export const AddParableForm: VFC<{ abstractId: number }> = (props) => {
  const { session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewParable>();

  const submit: SubmitHandler<NewParable> = async (data) => {
    if (data.body === "") return;
    const supabaseAccessToken = await session.getToken({
      template: "Supabase",
    });
    const supabase = await supabaseClient(supabaseAccessToken as string);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    await supabase
      .from("parables")
      // eslint-disable-next-line @typescript-eslint/naming-convention
      .insert({ body: data.body, user_id: session.user.id, abstract_id: props.abstractId });
  };

  return (
    <div>
      <h2>具体例を投稿</h2>
      <form onSubmit={handleSubmit(submit)}>
        <TextareaAutosize
          className="border-gray-200 focus:border-blue-200 focus:ring-0 resize-none"
          {...register("body", { required: "入力してください" })}
        />
        {errors.body?.message && <p className="text-red-500">{errors.body.message}</p>}
        <br />
        <Button onClick={handleSubmit(submit)}>投稿</Button>
      </form>
    </div>
  );
};
