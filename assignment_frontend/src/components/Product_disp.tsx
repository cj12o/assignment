import React from "react";
import { products } from "../data/products";
import { ShoppingCart, Star, Heart } from "lucide-react";

const ProductCard = ({ product }: { product: (typeof products)[0] }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
        />

        {/* Overlay Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 text-gray-600 hover:text-red-500 transition-colors">
            <Heart size={18} />
          </button>
        </div>

        {/* Category Tag */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-gray-800 shadow-sm">
          {product.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-900 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold text-yellow-700">
              {product.rating}
            </span>
          </div>
        </div>

        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase font-medium">
              Price
            </span>
            <span className="text-xl font-bold text-gray-900">
              ${product.price}
            </span>
          </div>

          <button className="flex items-center gap-2 bg-gray-900 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl transition-colors duration-300 active:scale-95 shadow-lg shadow-gray-200">
            <ShoppingCart size={18} />
            <span className="font-medium">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Product_disp = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            New Arrivals
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl text-center">
            Discover our latest collection of premium products, designed to
            elevate your lifestyle with style and functionality.
          </p>
          <div className="mt-4 w-24 h-1 bg-blue-600 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product_disp;
