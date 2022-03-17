import type { VFC } from "react";
import { FetchLoading } from "src/component/Loading/FetchLoading";
import { NoParables } from "src/component/NoParables";
import { ParableCard } from "src/component/ParableCard";
import { useParableList } from "src/hooks/useParableList";
import type { Parable } from "src/type";

export const ParableList: VFC<{ abstractId: number }> = (props) => {
  const { parables, isLoading } = useParableList(props.abstractId);

  if (isLoading) return <FetchLoading />;

  if (parables.length === 0) return <NoParables />;

  return (
    <ul>
      {parables.map((parable: Parable) => (
        <li key={parable.id}>
          <ParableCard parable={parable} />
        </li>
      ))}
    </ul>
  );
};
