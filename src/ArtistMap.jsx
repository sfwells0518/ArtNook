
import { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import axios from "axios";

export function ArtistMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_Maps_API_KEY,
  });

  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/paintings.json")
      .then(async (response) => {
        const paintings = response.data;
        const artistPromises = paintings.map((painting) => geocodeArtistBirthplace(painting.artist));
        const artists = await Promise.all(artistPromises);
        setArtists(artists);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  if (!isLoaded) return <div>Loading...</div>;
  return <Map artists={artists} selectedArtist={selectedArtist} setSelectedArtist={setSelectedArtist} />;
}

async function geocodeArtistBirthplace(artist) {
  const birthplace = artist.birthplace;
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(birthplace)}&key=${
      import.meta.env.VITE_Geocoding_API_KEY
    }`
  );
  const location = response.data.results[0].geometry.location;
  return { ...artist, location };
}

function Map({ artists, selectedArtist, setSelectedArtist }) {
  return (
    <GoogleMap zoom={2} center={{ lat: 0, lng: 0 }} mapContainerClassName="map-container" options={{fullscreenControl: false}}>
      {artists.map((artist, index) => (
        <Marker
          key={index}
          position={{ lat: artist.location.lat, lng: artist.location.lng }}
          onClick={() => setSelectedArtist(artist)}
        />
      ))}

      {selectedArtist && (
        <InfoWindow
          position={{ lat: selectedArtist.location.lat, lng: selectedArtist.location.lng }}
          onCloseClick={() => setSelectedArtist(null)}
        >
          <div>
            <h2>{selectedArtist.name}</h2>
            <br></br>
            <p>{selectedArtist.birthplace}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}


