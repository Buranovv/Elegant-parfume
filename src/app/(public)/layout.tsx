import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import Header from "@/components/layout/fronLayout";
import Children from "@/types/children";

const PublicLayout = ({ children }: Children) => {
  return (
    <Fragment>
      <ToastContainer />
      <Header />
      <main className="publicMain">{children}</main>
    </Fragment>
  );
};

export default PublicLayout;
