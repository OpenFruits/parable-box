import type { VFC } from "react";
import type { Abstract } from "src/type/data";

export const AbstractCard: VFC<{ abstract: Abstract }> = (props) => {
  return (
    <div className="group relative my-6">
      <div className="absolute -inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200"></div>
      <div className="relative py-3 px-6 text-black bg-gray-100 rounded-lg">{props.abstract.body}</div>
    </div>
  );
};
