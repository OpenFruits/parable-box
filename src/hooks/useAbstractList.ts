import { useSession } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import type { Abstract } from "src/type";
import { supabaseClient } from "src/utils/supabase";

export const useAbstractList = () => {
  const { session } = useSession();
  const [abstracts, setAbstracts] = useState<Abstract[]>();
  const [isLoading, setIsLoading] = useState(true);

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

  return { abstracts, isLoading };
};
