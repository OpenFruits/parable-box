import { useSession } from "@clerk/nextjs";
import type { VFC } from "react";
import { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { AbstractCard } from "src/component/AbstractCard";
import { FetchLoading } from "src/component/FetchLoading";
import { NoAbstracts } from "src/component/NoAbstracts";
import type { Abstract, NewParable } from "src/type/data";
import { supabaseClient } from "src/utils/supabase";

export const AbstractDetails: VFC<{ id: string }> = (props) => {
  const { session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [abstract, setAbstract] = useState<Abstract>();

  useEffect(() => {
    const loadAbstracts = async () => {
      try {
        setIsLoading(true);
        const supabaseAccessToken = await session?.getToken({
          template: "Supabase",
        });
        const supabase = await supabaseClient(supabaseAccessToken as string);
        const { data } = await supabase.from<Abstract>("abstracts").select("*").eq("id", props.id).single();
        data && setAbstract(data);
      } catch (e) {
        alert(e);
      } finally {
        setIsLoading(false);
      }
    };
    loadAbstracts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    await supabase.from("parables").insert({ body: data.body, user_id: session.user.id, abstract_id: abstract.id });
  };

  if (isLoading) return <FetchLoading />;

  return abstract ? (
    <div>
      <AbstractCard abstract={abstract} />
      <div>
        <h2>具体例を投稿</h2>
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
    </div>
  ) : (
    <NoAbstracts />
  );
};
