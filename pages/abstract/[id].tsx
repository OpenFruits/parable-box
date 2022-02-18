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

const AbstractList: VFC<Props> = (props) => {
  const { session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line react/destructuring-assignment
  const { abstracts, setAbstracts } = props;

  useEffect(() => {
    const loadAbstracts = async () => {
      try {
        setIsLoading(true);
        const supabaseAccessToken = await session?.getToken({
          template: "Supabase",
        });
        const supabase = await supabaseClient(supabaseAccessToken as string);
        const { data: abstracts } = await supabase.from<Abstract>("abstracts").select("*");
        abstracts && setAbstracts(abstracts);
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

  return abstracts?.length > 0 ? (
    <ul>
      {abstracts?.map((abstract: Abstract) => (
        <li key={abstract.id}>{abstract.body}</li>
      ))}
    </ul>
  ) : (
    <div>No Abstracts!</div>
  );
};

const AbstractDetail: CustomNextPage = () => {
  const { isSignedIn, isLoaded } = useUser();
  const [abstracts, setAbstracts] = useState<Abstract[]>([]);

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
            <AbstractList abstracts={abstracts} setAbstracts={setAbstracts} />
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

AbstractDetail.getLayout = FixedLayout;

export default AbstractDetail;
