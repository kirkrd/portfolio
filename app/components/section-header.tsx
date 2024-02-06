import { ReactNode } from "react";

const SectionHeader = ({ children }: { children: ReactNode }) => (
  <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{children} </h2>
);

export default SectionHeader
