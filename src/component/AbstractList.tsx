import { useSession } from "@clerk/nextjs";
import Link from "next/link";
import type { VFC } from "react";
import { useEffect, useState } from "react";
import { AbstractCard } from "src/component/AbstractCard";
import { FetchLoading } from "src/component/Loading/FetchLoading";
import { NoAbstracts } from "src/component/NoAbstracts";
import type { Abstract } from "src/type/data";
import { supabaseClient } from "src/utils/supabase";

export const AbstractList: VFC = () => {
  const { session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [abstracts, setAbstracts] = useState<Abstract[]>([]);

  useEffect(() => {
    const loadAbstracts = async () => {
      try {
        setIsLoading(true);
        const supabaseAccessToken = await session?.getToken({
          template: "Supabase",
        });
        const supabase = await supabaseClient(supabaseAccessToken as string);
        const { data } = await supabase.from<Abstract>("abstracts").select("*");
        data && setAbstracts(data);
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

  return abstracts?.length > 0 ? (
    <ul>
      {abstracts?.map((abstract: Abstract) => (
        <li key={abstract.id}>
          <Link href={`/abstract/${abstract.id}`}>
            <a>
              <AbstractCard abstract={abstract} />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <NoAbstracts />
  );
};
