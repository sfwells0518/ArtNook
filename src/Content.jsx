import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { PaintingsIndex } from "./PaintingsIndex";
import { PaintingsShow } from "./PaintingsShow";
import { CartedPaintingsIndex } from "./CartedPaintingsIndex";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Chat } from "./Chat";


export function Content() {
  const [paintings, setPaintings] = useState([]);
  const [isPaintingsShowVisible, setIsPaintingsShowVisible] = useState(false);
  const [currentPainting, setCurrentPainting] = useState({});

  const handleIndexPaintings = () => {
    console.log("handleIndexPaintings");
    axios.get("http://localhost:3000/paintings.json").then((response) => {
      console.log(response.data);
      setPaintings(response.data);
    });
  };

  useEffect(handleIndexPaintings, []);

  const handleShowPainting = (myPainting) => {
    setIsPaintingsShowVisible(true);
    setCurrentPainting(myPainting)
  };


  return (
    <Routes>
      <Route path="/" element={<PaintingsIndex paintings={paintings} onShowPainting={handleShowPainting} />} />
      <Route
        path="/paintings/:id"
        element={<PaintingsShow painting={currentPainting} onShowPainting={handleShowPainting} />}
      />
      <Route path="/carted_paintings" element={<CartedPaintingsIndex />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}