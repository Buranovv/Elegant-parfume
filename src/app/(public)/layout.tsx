import { Fragment } from "react";
import Header from "@/components/layout/fronLayout";
import Children from "@/types/children";

const PublicLayout = ({ children }: Children) => {
  return (
    <Fragment>
      <Header />
      <main className="publicMain">{children}</main>
    </Fragment>
  );
};

export default PublicLayout;
