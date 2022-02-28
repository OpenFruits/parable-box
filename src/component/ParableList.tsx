import type { VFC } from "react";
import { ParableCard } from "src/component/ParableCard";
import type { Parable } from "src/type/data";

type Props = { parables: Parable[] };

export const ParableList: VFC<Props> = (props) => {
  return (
    <ul>
      {props.parables.map((parable: Parable) => (
        <li key={parable.id}>
          <ParableCard parable={parable} />
        </li>
      ))}
    </ul>
  );
};
