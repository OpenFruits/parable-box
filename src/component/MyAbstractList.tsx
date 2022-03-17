import Link from "next/link";
import type { VFC } from "react";
import { AbstractCard } from "src/component/AbstractCard";
import { FetchLoading } from "src/component/Loading/FetchLoading";
import { NoAbstracts } from "src/component/NoAbstracts";
import { useMyPostList } from "src/hooks/useMyPostList";
import type { Abstract } from "src/type";

export const MyAbstractList: VFC = () => {
  const { abstracts, isLoading } = useMyPostList();

  if (isLoading) return <FetchLoading />;

  return abstracts?.length > 0 ? (
    <ul className="py-4">
      {abstracts?.map((abstract: Abstract) => (
        <li key={abstract.id}>
          <Link href={`/abstract/${abstract.id}`}>
            <a>
              <AbstractCard abstract={abstract} hasLink />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <NoAbstracts />
  );
};
