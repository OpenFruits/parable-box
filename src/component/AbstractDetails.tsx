import type { VFC } from "react";
import { AbstractCard } from "src/component/AbstractCard";
import { AddParableForm } from "src/component/AddParableForm";
import { FetchLoading } from "src/component/Loading/FetchLoading";
import { NoAbstracts } from "src/component/NoAbstracts";
import { ParableList } from "src/component/ParableList";
import { useAbstract } from "src/hooks/useAbstract";

export const AbstractDetails: VFC<{ id: string }> = (props) => {
  const { abstract, isLoading } = useAbstract(props.id);

  if (isLoading) return <FetchLoading />;

  return abstract ? (
    <div>
      <AbstractCard abstract={abstract} />
      <ParableList abstractId={abstract.id} />
      <AddParableForm abstractId={abstract.id} />
    </div>
  ) : (
    <NoAbstracts />
  );
};
