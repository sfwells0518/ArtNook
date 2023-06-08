import { useState } from "react";

export function PaintingsIndex(props) {
  console.log(props.paintings);

  return (
    <div id="paintings-index" className="mt-4">
      <center>
        <h1>ArtNook</h1>
      </center>
      <br />

      <div className="row">
        {props.paintings.map((painting) => (
          <div key={painting.id} className="col-sm-4 mb-3">
            <div className="card custom-card">
              <div className="card-body card-body-custom">
                <div className="image-container">
                  <img src={painting.painting_image} className="card-image" alt={painting.name} />
                </div>
                <h4 className="card-title">{painting.name}</h4>
                
                <subtitle>{painting.artist.name}</subtitle>
                <h6>${painting.price}</h6>
              </div>
              <div className="mt-auto text-center">
                <button
                  className="red-button"
                  onClick={() => {
                    props.onShowPainting(painting);
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
