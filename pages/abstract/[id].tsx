import { useSession, useUser } from "@clerk/nextjs";
import type { CustomNextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import type { VFC } from "react";
import { useEffect, useState } from "react";
import { FetchLoading } from "src/component/FetchLoading";
import { SessionLoading } from "src/component/SessionLoading";
import { FixedLayout } from "src/layout/FixedLayout";
import type { Abstract } from "src/type/data";
import { supabaseClient } from "src/utils/supabase";

const AbstractDetails: VFC<{ id: string }> = (props) => {
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

const AbstractId: CustomNextPage = () => {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const abstractId = router.query.id as string;

  return (
    <>
      <Head>
        <title>Parable Box</title>
      </Head>
      {!isLoaded ? (
        <SessionLoading />
      ) : (
        <main>
          {isSignedIn ? (
            <AbstractDetails id={abstractId} />
          ) : (
            <div>
              <p>Sign in to watch liked items.</p>
            </div>
          )}
        </main>
      )}
    </>
  );
};

AbstractId.getLayout = FixedLayout;

export default AbstractId;
