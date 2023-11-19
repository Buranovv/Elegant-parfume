import UniversalData from "@/types/universalData";
import crud from "./crud";

const useProducts = crud<UniversalData>("product");

export default useProducts;
