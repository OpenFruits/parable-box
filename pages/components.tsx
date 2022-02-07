import type { CustomNextPage } from "next";
import Head from "next/head";
import type { VFC } from "react";
import { Button } from "src/component/Button";
import type { ButtonVariant } from "src/component/Button/type";
import { Button2 as Btn2 } from "src/component/Button2";
import { FixedLayout } from "src/layout/FixedLayout";

const BtnClass = "p-2 rounded";
const Btn2Class = `${BtnClass} bg-amber-300 hover:bg-amber-500`;

const Btn: VFC<{ variant: ButtonVariant }> = (props) => {
  return (
    <Button variant={props.variant} className={BtnClass}>
      {props.variant}
    </Button>
  );
};

const Components: CustomNextPage = () => {
  return (
    <>
      <Head>
        <title>Components Page</title>
      </Head>

      <div>
        <h2>Component Collection</h2>
        <h3>Button</h3>
        <div className="flex space-x-2">
          <Btn variant="solid-blue" />
          <Btn variant="solid-red" />
          <Btn variant="solid-gray" />
          <Btn variant="solid-white" />
          <Btn variant="solid-black" />
          <Btn variant="outline" />
          <Btn variant="ghost" />
        </div>
        <h3>Button2</h3>
        <div className="flex space-x-2">
          <Btn2 tag="button" className={Btn2Class}>
            button
          </Btn2>
          <Btn2 tag="a" linkProps={{ href: "/" }} className={Btn2Class}>
            anchor
          </Btn2>
          <form>
            <Btn2 tag="input" type="submit" value="submit" className={Btn2Class} />
          </form>
        </div>
      </div>
    </>
  );
};

Components.getLayout = FixedLayout;

export default Components;
