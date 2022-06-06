import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../services";
import { TCategory } from "./";

const Categories = () => {
  const [categories, setCategories] = useState<TCategory[]>([]);
  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);

  return (
    <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
      <h3 className="mb-8 border-b p-4 text-xl font-semibold">Categories</h3>
      {categories.map((category) => (
        <Link key={category.slug} href={`/category/${category.slug}`}>
          <span className="mb-3 block cursor-pointer pb-3">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
