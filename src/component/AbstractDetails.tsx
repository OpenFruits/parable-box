import { useSession } from "@clerk/nextjs";
import type { VFC } from "react";
import { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { AbstractCard } from "src/component/AbstractCard";
import { Button } from "src/component/Button";
import { FetchLoading } from "src/component/Loading/FetchLoading";
import { NoAbstracts } from "src/component/NoAbstracts";
import { ParableList } from "src/component/ParableList";
import type { Abstract, NewParable, Parable } from "src/type/data";
import { supabaseClient } from "src/utils/supabase";

export const AbstractDetails: VFC<{ id: string }> = (props) => {
  const { session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [abstract, setAbstract] = useState<Abstract>();
  const [parables, setParables] = useState<Parable[]>();

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
        const { data: parableList } = await supabase.from<Parable>("parables").select("*").eq("abstract_id", data.id);
        parableList && setParables(parableList);
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
      {parables.length !== 0 && <ParableList parables={parables} />}
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
    </div>
  ) : (
    <NoAbstracts />
  );
};
