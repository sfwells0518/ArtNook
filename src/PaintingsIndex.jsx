import { useState, useEffect } from "react";
import axios from "axios";
import heroImage from "./assets/artnook_hero_img.png";
import { Link, useNavigate } from "react-router-dom";
import { PaintingsShow } from "./PaintingsShow";
import { Impressionism } from "./Impressionism";

export function PaintingsIndex(props) {
  console.log(props.paintings);

  const [paintings, setPaintings] = useState([]);
  const navigate = useNavigate();

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

  const handleClick = async (id, category) => {
    try {
      const response = await axios.get(`http://localhost:3000/paintings.json`);
      const data = response.data;
      console.log(data);
      navigate(`/paintings/${category.toLowerCase()}`); // Navigate to the category-specific page
    } catch (error) {
      console.error(error);
    }
  };

  const paintingsByCategory = paintings.reduce((acc, painting) => {
    const category = painting.categories[0]?.name;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(painting);
    return acc;
  }, {});

  const paintingsFromCategories = [];

  Object.keys(paintingsByCategory).forEach((category) => {
    const paintingsInCategory = paintingsByCategory[category];
    if (paintingsInCategory.length > 0) {
      let randomPainting;

      // Try to get the painting index from localStorage
      const savedIndex = localStorage.getItem(category);
      if (savedIndex !== null && savedIndex < paintingsInCategory.length) {
        // If there's a saved index for this category and it's valid, use it
        randomPainting = paintingsInCategory[savedIndex];
      } else {
        // If there's no saved index for this category, generate one and save it
        const randomIndex = Math.floor(Math.random() * paintingsInCategory.length);
        localStorage.setItem(category, randomIndex);
        randomPainting = paintingsInCategory[randomIndex];
      }

      paintingsFromCategories.push(randomPainting);
    }
  });


  return (
    <>
      <div className="hero-container">
        <img src={heroImage} alt="Hero" />
        <div className="hero-text">
          <div className="hero-text-line">your gateway to</div>
          <div className="hero-text-line">the world of art</div>
          <Link to="/all-paintings">
            <button className="all-paintings-button">Browse All Paintings</button>
          </Link>
        </div>
      </div>

      <div className="all-categories-header">
        <h1> Featured Artistic Movements </h1>
        <h3>Experience the beauty and diversity of art across different styles.</h3>
      </div>
      <div className="underline"></div>
      <div id="paintings-index" className="mt-4">
        <br />
        <div className="row">
          {paintingsFromCategories.map((painting) => (
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
                  <button className="shop-button" onClick={() => handleClick(painting.id, painting.categories[0].name)}>
                    {painting.categories[0].name}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
