import { ChartPieIcon } from "@heroicons/react/solid";
import type { VFC } from "react";

export const AppLogo: VFC = () => {
  return (
    <ChartPieIcon className="w-10 h-10 text-black bg-gradient-to-r from-pink-600 hover:from-pink-900 to-purple-600 rounded-md" />
  );
};
