import type { VFC } from "react";
import { AppIcon } from "src/component/AppIcon";

export const AppLogo: VFC = () => {
  return (
    <div className="flex space-x-2 font-mono text-4xl font-semibold text-slate-800">
      <AppIcon />
      <p>Parable</p>
      <p>Box</p>
      <small>（開発中）</small>
    </div>
  );
};
