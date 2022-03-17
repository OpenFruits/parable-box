import type { VFC } from "react";
import type { Parable } from "src/type";

export const ParableCard: VFC<{ parable: Parable }> = (props) => {
  return (
    <div>
      <div className="group relative my-6">
        <div className="absolute -inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg opacity-75 blur"></div>
        <div className="relative py-3 px-6 text-gray-600 bg-white rounded-lg">
          <p>{props.parable.body}</p>
        </div>
      </div>
    </div>
  );
};
