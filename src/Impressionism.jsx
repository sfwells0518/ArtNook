import { useState, useEffect } from "react";
import axios from "axios";
import heroImage from "./assets/artnook_hero_img.png";
import { Link } from "react-router-dom";
import { PaintingsShow } from "./PaintingsShow";

export function Impressionism(props) {
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

  // Filter paintings by category name "Impressionism"
  const impressionismPaintings = paintings.filter((painting) => painting.categories[0]?.name === "Impressionism");

  return (
    <>
      <div id="category-impressionism" className="mt-4">
        <h1>Impressionism</h1>
        <br></br>
        <h2>Featured Artists</h2>
        <br></br>
        <div className="row">
          {impressionismPaintings.map((painting) => (
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

        <h2>Featured Paintings</h2>
        <br></br>
        <div className="row">
          {impressionismPaintings.map((painting) => (
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
