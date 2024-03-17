import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import BoughtHouseContext from "../BoughtHouseContext";
import Modal from "./Modal";
import ErrorBoundary from "../ErrorBoundary";
import getHouse from "../endpoints/getHouse";
import Carousel from "./PictureMap";

const Details = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const results = useQuery(["details", id], getHouse);
  // eslint-disable-next-line no-unused-vars
  const [_, setBoughtHouse] = useContext(BoughtHouseContext);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const house = results.data;
  
  return (
    <div className="details">
      <Carousel images={house.images} />
      <div>
        <h1>{house.name}</h1>
        <h2>{`Location: ${house.location}`}</h2>
        <h2>{`Price: ${house.price}`}</h2>
        <p>
          <b>Description: </b>
          {house.description}
        </p>
        <button onClick={() => setShowModal(true)}>Buy {house.name}</button>
        <p>
          <b></b> 
        </p>
        <div className="buttons">
          <button onClick={() => navigate("/")}>Back to Home Page</button>
        </div>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to buy {house.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setBoughtHouse(house);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
