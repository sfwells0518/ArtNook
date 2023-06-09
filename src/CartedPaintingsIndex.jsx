import axios from "axios";
import { useEffect, useState } from "react";

export function CartedPaintingsIndex() {
  const [cartedPaintings, setCartedPaintings] = useState([]);
  const getCartedPaintings = () => {
    console.log("something");
    axios.get("http://localhost:3000/carted_paintings.json").then((response) => {
      console.log(response.data);
      setCartedPaintings(response.data);
    });
  };

  useEffect(getCartedPaintings, []);
  // show that data to the user

  return (
    <div id="carted-paintings-index">
      <p>hello</p>
      {cartedPaintings.map((cartedPainting) => (
        <div key={cartedPainting.id}>
          <p>id: {cartedPainting.id}</p>
          <p>name: {cartedPainting.painting.name}</p>
          <p>price: {cartedPainting.painting.price}</p>
          <p>quantity: {cartedPainting.quantity}</p>

          <hr />
        </div>
      ))}
    </div>
  );
}
