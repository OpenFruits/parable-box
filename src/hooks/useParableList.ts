import { useSession } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import type { Parable } from "src/type/data";
import { supabaseClient } from "src/utils/supabase";

export const useParableList = (abstractId: number) => {
  const { session } = useSession();
  const [parables, setParables] = useState<Parable[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadParables = async () => {
      try {
        setIsLoading(true);
        const supabaseAccessToken = await session?.getToken({
          template: "Supabase",
        });
        const supabase = await supabaseClient(supabaseAccessToken as string);
        const { data: parableList } = await supabase
          .from<Parable>("parables")
          .select("*")
          .eq("abstract_id", abstractId);
        parableList && setParables(parableList);
      } catch (e) {
        alert(e);
      } finally {
        setIsLoading(false);
      }
    };
    loadParables();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { parables, isLoading };
};
