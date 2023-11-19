import { Fragment } from "react";
import Header from "@/components/layout/fronLayout";
import Children from "@/types/children";
import Footer from "@/components/layout/fronLayout/Footer";

const PublicLayout = ({ children }: Children) => {
  return (
    <Fragment>
      <Header />
      <main className="publicMain">{children}</main>
      <Footer />
    </Fragment>
  );
};

export default PublicLayout;
