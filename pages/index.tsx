import type { CustomNextPage, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { AbstractCard } from "src/component/AbstractCard";
import { FixedLayout } from "src/layout/FixedLayout";
import type { Abstract } from "src/type";
import { supabase } from "src/utils/supabase";

const Home: CustomNextPage<{ abstracts: Abstract[] }> = (props) => {
  return (
    <>
      <Head>
        <title>Parable Box</title>
      </Head>
      <ul className="py-4">
        {props.abstracts.map((abstract: Abstract) => (
          <li key={abstract.id}>
            <Link href={`/abstract/${abstract.id}`}>
              <a>
                <AbstractCard abstract={abstract} hasLink />
              </a>
            </Link>
          </li>
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

Home.getLayout = FixedLayout;

export default Home;
