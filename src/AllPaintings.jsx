import { useState, useEffect } from "react";
import axios from "axios";
import { PaintingsShow } from "./PaintingsShow";
import { Modal } from "./Modal";

export function AllPaintings() {
  const [paintings, setPaintings] = useState([]);
  const [currentPainting, setCurrentPainting] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    async function fetchPaintings() {
      try {
        const response = await axios.get("http://localhost:3000/paintings.json");
        const paintingsData = response.data;
        setPaintings(paintingsData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPaintings();
  }, []);

  const handleClick = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/paintings/${id}.json`);
      const paintingData = response.data;
      setCurrentPainting(paintingData);
      setIsModalVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setIsModalVisible(false);
    setCurrentPainting(null);
  };

  return (
    <>
      <div id="all-paintings" className="mt-4">
        <br />
        <div className="row">
          {paintings.map((painting) => (
            <div key={painting.id} className="col-sm-3 mb-4">
              <div className="card custom-card">
                <div className="card-body card-body-custom">
                  <div className="image-container">
                    <img src={painting.painting_image} className="card-image" alt={painting.name} />
                    <div className="overlay">
                      <div className="text">
                        {painting.name}
                        <br />
                        <br />
                        {painting.artist.name}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-auto text-center">
                  <button className="details-button" onClick={() => handleClick(painting.id)}>
                    See Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isModalVisible && currentPainting && (
          <Modal show={isModalVisible} onClose={handleClose}>
            <PaintingsShow painting={currentPainting} />
          </Modal>
        )}
      </div>
    </>
  );
}
