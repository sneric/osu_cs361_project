import { Link } from "react-router-dom";

const House = (props) => {
  console.log("PROPS: ", props);
  const { name, price, images, id } = props;

  return (
    <Link to={`/details/${id}`} className="house">
      <div className="image-container">
        <img data-testid="thumbnail" src={images} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${name} — ${price}`}</h2>
      </div>
    </Link>
  );
};

export default House;
