import type { CustomNextPage } from "next";
import Head from "next/head";
import { Button2 as Btn2 } from "src/component/Button2";
import { FixedLayout } from "src/layout/FixedLayout";

const Create: CustomNextPage = () => {
  return (
    <>
      <Head>
        <title>Create Page</title>
      </Head>

      <div>
        <h2>命題を投稿</h2>
        <textarea name="" id=""></textarea>
        <form>
          <Btn2 tag="input" type="submit" value="submit" className="p-2 bg-sky-200 hover:bg-sky-300 rounded" />
        </form>
      </div>
    </>
  );
};

Create.getLayout = FixedLayout;

export default Create;
