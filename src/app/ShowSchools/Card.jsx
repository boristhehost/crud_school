import { IMAGE_DIRECTORY_PATH } from "../constants";
import "./Card.scss";

const Card = (props) => {
  const { image, city, name, address } = props;

  // const imageURL = `${IMAGE_DIRECTORY_PATH.replace("src/app/", "")}/${
  //   // image.name.split(".")[0]
  //   image.name
  // }`;
  return (
    <div className="Card">
      <div className="image">
        <img src={image.imageUrl} alt="image" />
      </div>
      <div className="description">
        <h4>{name}</h4>
        <p>{address}</p>

        <p>{city}</p>
      </div>
    </div>
  );
};

export default Card;
