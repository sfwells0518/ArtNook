import { useState } from "react";

export function PaintingsIndex(props) {
  console.log(props.paintings);

  return (
    <div id="paintings-index" className="mt-4">
      <br />

      <div className="row">
        {props.paintings.map((painting) => (
          <div key={painting.id} className="col-sm-4 mb-3">
            <div className="card custom-card">
              <div className="card-body card-body-custom">
                <h4 className="card-title">{painting.name}</h4>
                <div className="image-container">
                  <img src={painting.painting_image} className="card-image" alt={painting.name} />
                </div>

                <h5 className="card-artist">{painting.artist.name}</h5>
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
