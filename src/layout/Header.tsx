import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import type { VFC } from "react";
import { NavLinks } from "src/component/NavLinks";

const NAV_ITEMS = [
  { href: "/", label: "投稿一覧" },
  { href: "/liked", label: "お気に入り" },
  { href: "/create", label: "新規作成" },
  { href: "/mypost", label: "自分の投稿" },
];

export const Header: VFC = () => {
  const { isSignedIn, user } = useUser();

  return (
    <header>
      <div className="flex justify-between">
        <h1 className="text-4xl">Parable Box</h1>
        <div>
          {isSignedIn ? (
            <div className="flex gap-x-2">
              <p>{user.fullName}</p>
              <UserButton />
            </div>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
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
