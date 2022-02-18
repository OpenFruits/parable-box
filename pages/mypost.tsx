import { useSession, useUser } from "@clerk/nextjs";
import type { CustomNextPage } from "next";
import Head from "next/head";
import type { VFC } from "react";
import { useEffect, useState } from "react";
import { SessionLoading } from "src/component/SessionLoading";
import { FixedLayout } from "src/layout/FixedLayout";
import type { Abstract } from "src/type/data";
import { supabaseClient } from "src/utils/supabase";

type Props = {
  abstracts: Abstract[];
  setAbstracts: React.Dispatch<React.SetStateAction<Abstract[]>>;
};

const MyAbstractList: VFC<Props> = (props) => {
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
        <li key={abstract.id}>{abstract.body}</li>
      ))}
    </ul>
  ) : (
    <div>No Abstracts!</div>
  );
};

const MyPost: CustomNextPage<{ abstracts: Abstract[] }> = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  const [abstracts, setAbstracts] = useState<Abstract[]>([]);

  return (
    <>
      <Head>
        <title>MyPost Page</title>
      </Head>
      {!isLoaded ? (
        <SessionLoading />
      ) : (
        <main>
          {isSignedIn ? (
            <>
              <p>{user.fullName}さんの投稿一覧</p>
              <MyAbstractList abstracts={abstracts} setAbstracts={setAbstracts} />
            </>
          ) : (
            <p>Sign in to watch liked items.</p>
          )}
        </main>
      )}
    </>
  );
};

MyPost.getLayout = FixedLayout;

export default MyPost;
