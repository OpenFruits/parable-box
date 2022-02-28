import { useSession } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import type { Abstract } from "src/type/data";
import { supabaseClient } from "src/utils/supabase";

export const useAbstract = (id: string) => {
  const { session } = useSession();
  const [abstract, setAbstract] = useState<Abstract>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAbstract = async () => {
      try {
        setIsLoading(true);
        const supabaseAccessToken = await session?.getToken({
          template: "Supabase",
        });
        const supabase = await supabaseClient(supabaseAccessToken as string);
        const { data } = await supabase.from<Abstract>("abstracts").select("*").eq("id", id).single();
        data && setAbstract(data);
      } catch (e) {
        alert(e);
      } finally {
        setIsLoading(false);
      }
    };
    loadAbstract();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { abstract, isLoading };
};
