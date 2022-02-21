import { useSession } from "@clerk/nextjs";
import type { VFC } from "react";
import { useEffect, useState } from "react";
import { FetchLoading } from "src/component/FetchLoading";
import type { Abstract } from "src/type/data";
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

  if (isLoading) return <FetchLoading />;

  return abstract ? <div>{abstract.body}</div> : <div>No Abstracts!</div>;
};
