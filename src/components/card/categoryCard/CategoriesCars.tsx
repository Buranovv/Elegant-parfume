import UniversalData from "@/types/universalData";

import Image from "next/image";
import "./style.scss";

const CategoriesCars = ({ name, image }: UniversalData) => {
  return (
    <div className="cCard">
      <div className="cCard__img-box">
        <Image
          src={image?.url ?? ""}
          width={200}
          height={200}
          alt=""
          priority
        />
      </div>
      <div className="cCard__body">
        <h5>{name}</h5>
      </div>
    </div>
  );
};

export default CategoriesCars;
