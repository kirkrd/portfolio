import { ReactNode } from "react";

const ListHeader = ({ children }: { children: ReactNode }) => (
  <h3 className="text-xl font-bold" >{children}</h3>
);

export default ListHeader;
