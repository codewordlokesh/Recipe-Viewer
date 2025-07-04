import { dbConnect } from "../../../lib/db";
import Favorite from '../../../models/favorites';


// GET /api/favorites/:id → get one favorite
export async function GET(request, { params }) {
  await dbConnect();

  const favorite = await Favorite.findById(params.id);
  if (!favorite) {
    return new Response("Favorite not found", { status: 404 });
  }

  return Response.json(favorite);
}

// DELETE /api/favorites/:id → delete one favorite
export async function DELETE(request, { params }) {
  await dbConnect();

  const deleted = await Favorite.findByIdAndDelete(params.id);
  if (!deleted) {
    return new Response("Favorite not found", { status: 404 });
  }

  return new Response(null, { status: 204 });
}

