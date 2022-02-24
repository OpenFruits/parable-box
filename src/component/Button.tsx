import type { ButtonHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";

type ButtonType = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonType>((props, ref) => {
  const { children, ...rest } = props;

  return (
    <button
      ref={ref}
      {...rest}
      className="group [transform:translateZ(0)] overflow-hidden relative before:absolute before:bottom-0 before:left-0 p-2 before:w-full before:h-full bg-gradient-to-r before:bg-gradient-to-r from-pink-300 before:from-pink-600 to-purple-300 before:to-purple-600 rounded-lg before:transition before:duration-500 before:ease-in-out before:scale-x-0 hover:before:scale-x-100 before:origin-[100%_100%] hover:before:origin-[0_0]"
    >
      <span className="relative z-0 text-black group-hover:text-gray-200 transition duration-500 ease-in-out">
        {children}
      </span>
    </button>
  );
});

Button.displayName === "Button";
