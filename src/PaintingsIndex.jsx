import { useState } from "react";
import axios from "axios";

export function PaintingsIndex(props) {
  console.log(props.paintings);

  const handleClick = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/paintings/${id}.json`);
      const data = response.data;
      console.log(data);
      window.location.href = "/paintings/:id";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="paintings-index" className="mt-4">
      <br />

      <div className="row">
        {props.paintings.map((painting) => (
          <div key={painting.id} className="col-sm-6 mb-2">
            <div className="card custom-card">
              <div className="card-body card-body-custom">
                <h4 className="card-title">{painting.name}</h4>
                <h5 className="card-artist">{painting.artist.name}</h5>
                <div className="image-container">
                  <img src={painting.painting_image} className="card-image" alt={painting.name} />
                </div>
                <br></br>
                <h6>${painting.price}</h6>
              </div>
              <div className="mt-auto text-center">
                <button className="red-button" onClick={() => handleClick(painting.id)}>
                  Explore
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
