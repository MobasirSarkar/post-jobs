import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
}>;

const MainWidthWrapper = ({ children, className }: Props) => {
  return (
    <main className={cn(`m-auto my-10 max-w-5xl space-y-10 px-3`, className)}>
      {children}
    </main>
  );
};

export default MainWidthWrapper;
