import type { CustomNextPage, GetStaticProps } from "next";
import Head from "next/head";
import { FluidLayout } from "src/layout/FluidLayout";
import { supabase } from "src/utils/supabase";

type Abstract = {
  id: number;
  body: string;
  user_id: string;
  created_at: string;
};
const Home: CustomNextPage<{ abstracts: Abstract[] }> = (props) => {
  return (
    <>
      <Head>
        <title>Parable Box</title>
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

Home.getLayout = FluidLayout;

export default Home;
