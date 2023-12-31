import FavList from "@/components/list/FavList";
import "./style.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elegant parfume | Favorite",
  description: "Generated by create next app",
};

const FavouritesPage = () => {
  return (
    <main className="publicMain">
      <div className="container">
        <FavList />
      </div>
    </main>
  );
};

export default FavouritesPage;
