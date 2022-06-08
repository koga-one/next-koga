import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../services";
import { TCategory } from "./";
import Widget from "./Widget";

const Categories = () => {
  const [categories, setCategories] = useState<TCategory[]>([]);
  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);

  return (
    <Widget title="Categories">
      {categories.map((category) => (
        <Link key={category.slug} href={`/category/${category.slug}`}>
          <a>
            <div className="rounded-lg border border-katsu px-4 py-2 font-semibold backdrop-blur-md dark:border-gure dark:bg-katsu">
              <p className="dark:text-kami">{category.name}</p>
            </div>
          </a>
        </Link>
      ))}
    </Widget>
  );
};

export default Categories;
