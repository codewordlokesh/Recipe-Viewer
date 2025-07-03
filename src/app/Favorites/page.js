"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    const res = await axios.get("/api/favorites");
    setFavorites(res.data);
  };

  const deleteFavorite = async (id) => {
    await axios.delete(`/api/favorites/${id}`);
    fetchFavorites();
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Favorite Recipes</h1>
      {favorites.length === 0 && <p>No favorites yet.</p>}
      {favorites.map((fav) => (
        <div key={fav._id} className="border p-4 rounded mb-4">
          <img src={fav.imageUrl} className="w-32 rounded mb-2" />
          <h2 className="text-xl font-semibold">{fav.recipeName}</h2>
          <button
            onClick={() => deleteFavorite(fav._id)}
            className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
