import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import type { VFC } from "react";
import { AppLogo } from "src/component/AppLogo";
import { NavLinks } from "src/component/NavLinks";

const NAV_ITEMS = [
  { href: "/", label: "TimeLine" },
  { href: "/liked", label: "Liked" },
  { href: "/create", label: "Add New" },
  { href: "/mypost", label: "My Post" },
];

export const Header: VFC = () => {
  const { isSignedIn } = useUser();

  return (
    <header>
      <div className="flex justify-between items-center m-4">
        <AppLogo />
        <div>
          {isSignedIn ? (
            <div className="flex gap-x-2">
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
            <NavLinks key={href} href={href} activeClass="text-black bg-gray-100">
              <a className="inline-block relative after:absolute after:bottom-0 after:left-0 p-4 after:w-full after:h-[2px] after:bg-black after:transition-transform after:duration-300 after:ease-in-out after:scale-x-0 hover:after:scale-x-100 after:origin-bottom-right hover:after:origin-bottom-left">
                {label}
              </a>
            </NavLinks>
          );
        })}
      </nav>
    </header>
  );
};
