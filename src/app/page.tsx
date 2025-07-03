"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

// Define the shape of each meal
type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export default function Home() {
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((res) => setMeals(res.data.meals || []));
  }, []);

  return (
    <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {meals.map((meal) => (
        <div key={meal.idMeal} className="border p-4 rounded shadow-md">
          <img src={meal.strMealThumb} alt={meal.strMeal} className="rounded mb-2" />
          <h2 className="text-xl font-bold">{meal.strMeal}</h2>
          <Link href={`/recipe/${meal.idMeal}`} className="text-blue-500 mt-2 block">
            View Recipe
          </Link>
        </div>
      ))}
    </main>
  );
}
