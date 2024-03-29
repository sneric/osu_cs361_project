import House from "./House";

const Results = ({ houses }) => {

  return (
    <div className="search">
      {!houses.length ? (
        <h1>No Houses Found</h1>
      ) : (
        houses.map((house) => {
          return (
            <House
              key={house.id}
              location={house.location}
              price={house.price}
              name={house.name}
              homeStyle={house.homeStyle}
              images={house.image}
              id={house.id}
            />
          );
        })
      )}
    </div>
  );
};

export default Results;
