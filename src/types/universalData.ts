interface UniversalData {
  _id: string;
  title: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  category: string;
  createdAt: string;
  sold: number;
  newQuantity: number;
  image: {
    url: string | undefined;
  };
}

export default UniversalData;
