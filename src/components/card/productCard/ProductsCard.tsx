import UniversalData from "@/types/universalData";

import "./style.scss";
import Image from "next/image";

const ProductsCard = ({
  //   _id,
  title,
  description,
  image,
  price,
  sold,
  quantity,
}: UniversalData) => {
  return (
    <div className="card">
      <div className="card__img-box">
        <Image src={image.url ?? ""} width={200} height={200} alt="" />
      </div>
      <div className="card__body">
        <div className="card__title">
          <h5>{title}</h5>
        </div>
        <p className="card__description">{description}</p>
        <div className="card__quantity">
          <p>Sotildi: {sold}</p>
          <p>Miqdori: {quantity}</p>
        </div>
        <button className="card__btn">Savatchaga qo`shish {price} so`m</button>
      </div>
    </div>
  );
};

export default ProductsCard;
