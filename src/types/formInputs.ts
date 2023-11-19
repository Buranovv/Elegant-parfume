import PhotoData from "@/types/photo";

interface UseFormInputs {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  password: string;
  image: PhotoData | null;
  title: string;
  category: { _id: string; name: string } | string;
  price: string;
  quantity: string;
  description: string;
}

export default UseFormInputs;
