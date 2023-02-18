import React, { useState, useEffect } from "react";
import ImageCards from "./components/ImageCards";
import ImageSearch from "./components/ImageSearch";

function App() {
  const [images, setImages] = useState([]);
  // flag
  const [isLoading, setIsLoading] = useState(true);
  // search
  const [term, setTerm] = useState("");

  // api fetching
  // instead of hard coding the api key, we put the env. here
  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [term]);

  return (
    <div className="container mx-auto pb-10">
      {/* in ImageSearch we send props. we made a function searchText. */}
      <ImageSearch searchText={(text) => setTerm(text)} />
      {!isLoading && images.length === 0 && (
        <h1 className="text-6xl text-center mx-auto mt-32">No Images Found</h1>
      )}
      {isLoading ? (
        <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
          {images.map((image) => (
            <ImageCards key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
