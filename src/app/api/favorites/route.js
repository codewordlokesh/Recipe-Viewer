import { dbConnect } from "../../lib/db";
import Favorite from "../../models/favorites";

// GET /api/favorites → get all favorite recipes
export async function GET() {
  await dbConnect();
  const favorites = await Favorite.find({});
  return Response.json(favorites);
}

// POST /api/favorites → add a new favorite
export async function POST(request) {
  await dbConnect();
  const { recipeId, recipeName, imageUrl } = await request.json();
  const newFav = await Favorite.create({ recipeId, recipeName, imageUrl });
  return Response.json(newFav);
}

// DELETE /api/favorites → delete favorite via body (not ideal, use [id] route instead)
export async function DELETE(request) {
  await dbConnect();
  const { id } = await request.json();
  const deleted = await Favorite.findByIdAndDelete(id);
  return Response.json(deleted);
}

