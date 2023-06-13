export function PaintingsShow({ painting }) {
  return (
    <div className="paintings-show">
      <h2>{painting.name}</h2>
      <br></br>
      <h3>{painting.artist.name}</h3>
      <br></br>
      <div className="painting-images">
        <img src={painting.painting_image} alt={`Painting ${painting.name}`} className="painting-image" />
      </div>
      <br></br>
      <p>{painting.description}</p>
      <br></br>
      <h6>Price: ${painting.price}</h6>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <button className="add-to-cart-button">Add to Cart</button>
      </div>
    </div>
  );
}
