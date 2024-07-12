import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <div className="w-11/12 mx-auto max-w-screen-xl">{children}</div>;
};

export default Container;
