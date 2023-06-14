import { useState, useEffect } from "react";
import axios from "axios";
import heroImage from "./assets/artnook_hero_img.png";
import { Link } from "react-router-dom";
import { PaintingsShow } from "./PaintingsShow";

export function Surrealism(props) {
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

  // Filter paintings by category name "Surrealism"
  const surrealismPaintings = paintings.filter((painting) => painting.categories[0]?.name === "Surrealism");

  return (
    <>
      <div id="category-surrealism" className="mt-4">
        <h1>Surrealism</h1>
        <br />
        <div className="row">
          {surrealismPaintings.map((painting) => (
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
