export function PaintingsShow({ painting }) {
  return (
    <div className="paintings-show">
      <h4>{painting.categories[0]?.name}</h4>
      <h2>{painting.name}</h2>
      <br></br>
      <h3>{painting.artist.name}</h3>
      <br></br>
      <div className="painting-images">
        <img src={painting.painting_image} alt={`Painting ${painting.name}`} className="painting-image" />
      </div>
      <br></br>
      <p>{painting.description}</p>
    </div>
  );
}
