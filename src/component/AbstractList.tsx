import { useSession } from "@clerk/nextjs";
import type { VFC } from "react";
import { useEffect, useState } from "react";
import type { Abstract } from "src/type/data";
import { supabaseClient } from "src/utils/supabase";

type Props = {
  abstracts: Abstract[];
  setAbstracts: React.Dispatch<React.SetStateAction<Abstract[]>>;
};

export const AbstractList: VFC<Props> = (props) => {
  const { session } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAbstracts = async () => {
      try {
        setIsLoading(true);
        const supabaseAccessToken = await session?.getToken({
          template: "Supabase",
        });
        const supabase = await supabaseClient(supabaseAccessToken as string);
        const { data: abstracts } = await supabase.from<Abstract>("abstracts").select("*");
        abstracts && props.setAbstracts(abstracts);
      } catch (e) {
        alert(e);
      } finally {
        setIsLoading(false);
      }
    };
    loadAbstracts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return props.abstracts?.length > 0 ? (
    <ul>
      {props.abstracts?.map((abstract: Abstract) => (
        <li key={abstract.id}>{abstract.body}</li>
      ))}
    </ul>
  ) : (
    <div>No Abstracts!</div>
  );
};
