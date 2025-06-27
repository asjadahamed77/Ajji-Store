import React from "react";
import apple from "../assets/categories/apple.jpg";
import airpod from "../assets/categories/category_4.jpg";
import macbook from "../assets/categories/macbook.jpg";
import watch from "../assets/categories/watch.jpg";
import ipad from "../assets/categories/ipad.jpg";
import assessorioes from "../assets/categories/accessories.jpeg";

import { Link } from "react-router-dom";
import Title from "./Title";

const Categories = () => {
  const categories = [
    {
      name: "Phones",
      linkTo: "/products/mobile",
      image: apple,
    },
    {
      name: "MacBooks",
      linkTo: "/products/macbook",
      image: macbook,
    },
    {
      name: "Airpods",
      linkTo: "/products/airpod",
      image: airpod,
    },
    {
      name: "Watches",
      linkTo: "/products/watch",
      image: watch,
    },
    {
      name: "Ipads",
      linkTo: "/products/ipad",
      image: ipad,
    },
    {
      name: "Accessories",
      linkTo: "/products/accessory",
      image: assessorioes,
    },
  ];

  return (
    <div className="mt-8">
      <div className="overflow-hidden whitespace-nowrap py-6 mb-8 bg-white/20">
        <div className="inline-flex animate-marquee">
          <span className="mr-12 text-[95px] font-semibold bg-gradient-to-t from-white to-white/40 bg-clip-text text-transparent">
            BEST SMARTPHONE RETAILER IN SRI LANKA
          </span>

          <span className="mr-12 text-[95px] font-semibold bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
            BEST SMARTPHONE RETAILER IN SRI LANKA
          </span>
        </div>
      </div>
      <div className="mt-12">
        <Title title="The AjjiStore Catalog" />
      </div>
      {/* Display Categories */}
      <div className="flex items-center gap-8 overflow-x-scroll py-8">
        {categories.map((item, index) => (
          <Link
            onClick={() => window.scrollTo(0, 0)}
            to={item.linkTo}
            key={index}
            className="flex flex-col items-center justify-center rounded-4xl bg-white/5 p-4 min-w-fit hover:-translate-y-2 transform duration-300 transition-transform"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-[200px] h-[200px] rounded-t-2xl"
            />
            <p className="mt-4 text-xl font-medium bg-gradient-to-r from-from to-to bg-clip-text text-transparent ">{item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
