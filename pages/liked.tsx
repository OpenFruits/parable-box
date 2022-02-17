import { useSession, useUser } from "@clerk/nextjs";
import type { CustomNextPage } from "next";
import Head from "next/head";
import type { VFC } from "react";
import { useEffect, useState } from "react";
import { FixedLayout } from "src/layout/FixedLayout";
import type { Abstract } from "src/type/data";
import { supabaseClient } from "src/utils/supabase";

type Props = {
  abstracts: Abstract[];
  setAbstracts: React.Dispatch<React.SetStateAction<Abstract[]>>;
};

const AbstractList: VFC<Props> = (props) => {
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

const Liked: CustomNextPage<{ abstracts: Abstract[] }> = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  const [abstracts, setAbstracts] = useState<Abstract[]>([]);

  return (
    <>
      <Head>
        <title>Liked Page</title>
      </Head>
      {!isLoaded ? (
        <>Loading...</>
      ) : (
        <main>
          {isSignedIn ? (
            <div>
              <p>{user?.fullName}がいいねした投稿一覧</p>
              <AbstractList abstracts={abstracts} setAbstracts={setAbstracts} />
            </div>
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

Liked.getLayout = FixedLayout;

export default Liked;
