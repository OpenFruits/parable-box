import type { CustomNextPage, GetStaticProps } from "next";
import Head from "next/head";
import { FixedLayout } from "src/layout/FixedLayout";
import type { Abstract } from "src/type/data";
import { supabase } from "src/utils/supabase";

const Liked: CustomNextPage<{ abstracts: Abstract[] }> = (props) => {
  return (
    <>
      <Head>
        <title>Liked Page</title>
      </Head>
      <ul>
        {props.abstracts.map((abstract: Abstract) => (
          <li key={abstract.id}>{abstract.body}</li>
        ))}
      </ul>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data: abstracts } = await supabase.from<Abstract>("abstracts").select("*");

  return {
    props: { abstracts },
  };
};

Liked.getLayout = FixedLayout;

export default Liked;
