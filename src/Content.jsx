import axios from "axios";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { SignUp } from "./SignUp";
import { Login } from "./LogIn";
import { LogoutLink } from "./LogoutLink";
import { useState, useEffect } from "react";
import { PaintingsIndex } from "./PaintingsIndex";
import { PaintingsShow } from "./PaintingsShow";
import { CartedPaintingsIndex } from "./CartedPaintingsIndex";
import { Chat } from "./Chat";
import { ArtistMap } from "./ArtistMap";
import { AllPaintings } from "./AllPaintings";
import { Impressionism } from "./Impressionism";
import { Surrealism } from "./Surrealism";
import { Realism } from "./Realism";
import { Abstract } from "./Abstract";
import { Modal } from "./Modal";




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

   const handleShowPaintingFromAllPaintings = (id) => {
     const painting = paintings.find((painting) => painting.id === id);
     handleShowPainting(painting);
   };

   const handleClose = () => {
     setIsPaintingsShowVisible(false);
   };
  


  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogoutLink />} />
        <Route path="/home" element={<PaintingsIndex paintings={paintings} onShowPainting={handleShowPainting} />} />
        <Route path="/all-paintings" element={<AllPaintings onShowPainting={handleShowPaintingFromAllPaintings} />} />
        <Route path="/carted_paintings" element={<CartedPaintingsIndex />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/artist-map" element={<ArtistMap />} />
        <Route path="/paintings/impressionism" element={<Impressionism />} />
        <Route path="/paintings/surrealism" element={<Surrealism />} />
        <Route path="/paintings/realism" element={<Realism />} />
        <Route path="/paintings/abstract" element={<Abstract />} />
      </Routes>

      <Modal show={isPaintingsShowVisible} onClose={handleClose}>
        <PaintingsShow product={currentPainting} />
      </Modal>
    </>
  );
}

/* Add these once components are created
  
  <Route path="/paintings/realism" element={<Realism />} />
  
*/