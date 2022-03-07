import clsx from "clsx";
import type { VFC } from "react";
import type { Abstract } from "src/type/data";

export const AbstractCard: VFC<{ abstract: Abstract; hasLink?: boolean }> = (props) => {
  return (
    <div className={clsx("relative p-3 bg-gray-100 rounded-md", props.hasLink && "bg-transparent hover:bg-gray-100")}>
      <h3 className="text-sm font-medium leading-5">{props.abstract.body}</h3>
      <ul className="flex mt-1 space-x-1 text-xs font-normal leading-4 text-gray-500">
        <li>3h ago</li>
        <li>&middot;</li>
        <li>3 likes</li>
        <li>&middot;</li>
        <li>4 parables</li>
      </ul>
    </div>
  );
};
