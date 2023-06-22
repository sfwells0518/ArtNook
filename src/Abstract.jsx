import { useState, useEffect } from "react";
import axios from "axios";
import heroImage from "./assets/artnook_hero_img.png";
import { Link } from "react-router-dom";
import { PaintingsShow } from "./PaintingsShow";

export function Abstract(props) {
  const [paintings, setPaintings] = useState([]);

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

  // Filter paintings by category name "Abstract"
  const abstractPaintings = paintings.filter((painting) => painting.categories[0]?.name === "Abstract");

  return (
    <>
      <div id="category-abstract" className="mt-4">
        <h1>Abstract</h1>
        <div className="category-description">
          <h3>
            A style of art that does not attempt to represent an accurate depiction of visual reality, often using
            shapes, forms, colors, and gestural marks to convey emotions or ideas.
          </h3>
        </div>
        <div className="underline"></div>
        <h2 style={{ textAlign: "left" }}>
          <div className="featured-artists" style={{ marginTop: "20px", marginBottom: "35px" }}>
            Featured Artists
          </div>
        </h2>
        <div className="row">
          {abstractPaintings.map((painting) => (
            <div key={painting.id} className="col-sm-3 mb-4">
              <div className="card custom-card">
                <div className="artist-image-container">
                  <img src={painting.artist.artist_image} className="card-image" alt={painting.artist.name} />
                  <div className="overlay">
                    <div className="text">
                      <h2>Fun Fact</h2>
                      {painting.artist.fun_fact}
                    </div>
                  </div>
                </div>
                <div className="card-body card-body-custom">
                  <div className="text">
                    <h2>{painting.artist.name}</h2>
                    <h3>{painting.artist.date_of_birth}</h3>
                    <h4>{painting.artist.birthplace}</h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <h2 style={{ textAlign: "left" }}>
          <div className="featured-paintings" style={{ marginTop: "20px", marginBottom: "35px" }}>
            Featured Paintings
          </div>
        </h2>
        <div className="row">
          {abstractPaintings.map((painting) => (
            <div key={painting.id} className="col-sm-6 mb-2">
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
                        <br></br>
                        <br></br>
                        {painting.description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
