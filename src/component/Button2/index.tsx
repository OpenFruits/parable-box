import type { LinkProps } from "next/link";
import Link from "next/link";
import type { ComponentPropsWithRef } from "react";
import { createElement, forwardRef } from "react";

// Types
type Tag = "button" | "a" | "input";
type Element = HTMLButtonElement | HTMLAnchorElement | HTMLInputElement;

type ButtonProps = {
  tag: "button";
  type?: never;
  role?: never;
};

type AnchorProps = {
  tag: "a";
  linkProps: LinkProps;
  href?: never;
  ref?: never;
  target?: never;
  role?: never;
};

type InputProps = {
  tag: "input";
  value: ComponentPropsWithRef<"input">["value"];
  type: ComponentPropsWithRef<"input">["type"];
  children?: never;
  role?: never;
};

type Props<T extends Tag> = ComponentPropsWithRef<T> &
  (T extends "button" ? ButtonProps : T extends "a" ? AnchorProps : InputProps);

// Utils
const isExternal = (href: LinkProps["href"]) => {
  const target = typeof href === "string" ? href : href.href;
  return target?.startsWith("http") || target?.startsWith("//");
};

// Component
export const Button2 = forwardRef<Element, Props<Tag>>((props, ref) => {
  if (props.tag === "a") {
    const { linkProps, ...otherProps } = props;
    return (
      <Link {...linkProps}>
        {createElement(props.tag, {
          ref,
          ...otherProps,
          role: "button",
          target: isExternal(linkProps.href) ? "_blank" : undefined,
          rel: isExternal(linkProps.href) ? "noopener noreferrer" : undefined,
        })}
      </Link>
    );
  }

  return createElement(props.tag, { ref, type: "button", ...props });
});

Button2.displayName === "Button2";
