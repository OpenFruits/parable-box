import { useSession } from "@clerk/nextjs";
import Link from "next/link";
import type { VFC } from "react";
import { useEffect, useState } from "react";
import type { Abstract } from "src/type/data";
import { supabaseClient } from "src/utils/supabase";

type Props = {
  abstracts: Abstract[];
  setAbstracts: React.Dispatch<React.SetStateAction<Abstract[]>>;
};

export const MyAbstractList: VFC<Props> = (props) => {
  const { session } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMyAbstracts = async () => {
      try {
        setIsLoading(true);
        const supabaseAccessToken = await session?.getToken({
          template: "Supabase",
        });
        const supabase = await supabaseClient(supabaseAccessToken as string);
        const { data: abstracts } = await supabase
          .from<Abstract>("abstracts")
          .select("*")
          // eslint-disable-next-line @typescript-eslint/naming-convention
          .match({ user_id: session.user.id });
        abstracts && props.setAbstracts(abstracts);
      } catch (e) {
        alert(e);
      } finally {
        setIsLoading(false);
      }
    };
    loadMyAbstracts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return props.abstracts?.length > 0 ? (
    <ul>
      {props.abstracts?.map((abstract: Abstract) => (
        <li key={abstract.id}>
          <Link href={`/abstract/${abstract.id}`}>
            <a>{abstract.body}</a>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <div>No Abstracts!</div>
  );
};
