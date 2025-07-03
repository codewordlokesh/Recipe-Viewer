import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
  recipeId: String,
  recipeName: String,
  imageUrl: String,
});

export default mongoose.models.Favorite || mongoose.model("Favorite", FavoriteSchema);
export async function addFavorite(recipe) {
  const Favorite = mongoose.models.Favorite || mongoose.model("Favorite", FavoriteSchema);
  const favorite = new Favorite({
    recipeId: recipe.id,
    recipeName: recipe.name,
    imageUrl: recipe.image,
  });
  return await favorite.save();
}