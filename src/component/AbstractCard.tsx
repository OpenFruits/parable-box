import type { VFC } from "react";
import type { Abstract } from "src/type/data";

export const AbstractCard: VFC<{ abstract: Abstract }> = (props) => {
  return <div>{props.abstract.body}</div>;
};
