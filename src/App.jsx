import { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

const API_KEY = "92mU-hBNjSX5WlpA3ecN6YojBpz1b_CnESRFzWRdmR4";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Error state
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    async function fetchImages() {
      setLoading(true);
      setError(null); // Hata sıfırlama
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?query=${query}&page=${page}&client_id=${API_KEY}`
        );
        const newImages = response.data.results;

        if (newImages.length === 0) {
          setError("No images found. Try another search term.");
          return;
        }

        setImages((prev) => [...prev, ...newImages]);
      } catch (err) {
        console.error(err); // Hata konsola yazılır
        setError("An error occurred while fetching images.");
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    if (newQuery === query) {
      toast.error("Enter a different search term!");
      return;
    }
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setError(null); // Hata temizleme
  };

  const handleImageClick = (image) => {
    if (selectedImage) return; // Zaten bir modal açık
    setSelectedImage(image); // Modal'ı aç
  };

  const closeModal = () => setSelectedImage(null);

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={() => setPage((prev) => prev + 1)} />
      )}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
