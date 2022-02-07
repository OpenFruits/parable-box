import type { VFC } from "react";
import { NavLinks } from "src/component/NavLinks";

const NAV_ITEMS = [
  { href: "/", label: "投稿一覧" },
  { href: "/liked", label: "お気に入り" },
  { href: "/create", label: "新規作成" },
];

export const Header: VFC = () => {
  return (
    <header>
      <h1 className="text-4xl">Parable Box</h1>
      <nav className="text-gray-500">
        {NAV_ITEMS.map((item) => {
          const { href, label } = item;
          return (
            <NavLinks key={href} href={href} activeClass="text-black">
              <a className="inline-block p-4">{label}</a>
            </NavLinks>
          );
        })}
      </nav>
    </header>
  );
};
