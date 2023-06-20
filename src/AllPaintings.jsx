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
        let shuffledPaintings;
        const storedOrder = localStorage.getItem("paintingsOrder");
        if (storedOrder) {
          shuffledPaintings = JSON.parse(storedOrder);
        } else {
          const response = await axios.get("http://localhost:3000/paintings.json");
          const paintingsData = response.data;
          shuffledPaintings = shuffleArray([...paintingsData]);
          localStorage.setItem("paintingsOrder", JSON.stringify(shuffledPaintings));
        }

        setPaintings(shuffledPaintings);
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

  // Function to shuffle the array
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <>
      <div id="all-paintings" className="mt-4">
        <h1>All Paintings</h1>
        <h3>See details to learn more about each piece.</h3>
        <div className="underline"></div>
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
