import type { VFC } from "react";
import type { Abstract } from "src/type/data";

export const AbstractCard: VFC<{ abstract: Abstract }> = (props) => {
  return (
    <div>
      <div className="group relative my-6">
        <div className="absolute -inset-0 bg-gradient-to-r from-pink-600 hover:from-pink-900 to-purple-600 hover:to-purple-900 rounded-lg opacity-75 group-hover:opacity-100 blur transition duration-200 group-hover:duration-200"></div>
        <div className="relative py-3 px-6 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-white rounded-lg">
          <div>{props.abstract.body}</div>
        </div>
      </div>
    </div>
  );
};
