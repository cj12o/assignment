import { useState } from "react";
import { products } from "../data/products";
import {
  ShoppingCart,
  Star,
  Heart,
  Sparkles,
  Loader2,
  Key,
} from "lucide-react";
import { getRecommendations } from "../services/ai";

const ProductCard = ({ product }: { product: (typeof products)[0] }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
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
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_API_KEY || "");
  const [preference, setPreference] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<number[]>([]);
  const [reasoning, setReasoning] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [error, setError] = useState("");

  const handleGetRecommendations = async () => {
    if (!apiKey) {
      setError("Please enter an OpenAI API Key");
      setShowKeyInput(true);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await getRecommendations(
        apiKey,
        preference || "general trending products",
      );
      setRecommendations(result.recommendedIds);
      setReasoning(result.reasoning);
    } catch (err: any) {
      setError(err.message || "Failed to get recommendations");
    } finally {
      setLoading(false);
    }
  };

  const recommendedProducts = products.filter((p) =>
    recommendations.includes(p.id),
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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

        {/* AI Section */}
        <div className="mb-16 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Sparkles size={120} />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Sparkles size={16} />
              AI Personal Shopper
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Not sure what to choose? Let AI help you.
            </h3>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input
                type="text"
                placeholder="What are you looking for? (e.g., 'gifts for a tech lover')"
                className="flex-grow px-6 py-4 rounded-xl border-gray-200 bg-gray-50 focus:bg-white border focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none"
                value={preference}
                onChange={(e) => setPreference(e.target.value)}
              />
              <button
                onClick={handleGetRecommendations}
                disabled={loading}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Sparkles size={20} />
                )}
                Get Recommendations
              </button>
            </div>

            {/* API Key Toggle/Input */}
            <div className="flex flex-col items-center gap-4">
              {!showKeyInput && !apiKey && (
                <button
                  onClick={() => setShowKeyInput(true)}
                  className="text-sm text-gray-500 underline hover:text-blue-600 flex items-center gap-1"
                >
                  <Key size={14} /> Enter OpenAI API Key to enable
                </button>
              )}

              {(showKeyInput || (error && !apiKey)) && (
                <div className="w-full max-w-md animate-in fade-in slide-in-from-top-2">
                  <input
                    type="password"
                    placeholder="sk-..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full px-4 py-2 text-sm rounded-lg border border-gray-200 focus:border-blue-400 outline-none"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Your key is never stored on a server.
                  </p>
                </div>
              )}

              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </div>
        </div>

        {/* Recommendations Logic/Display */}
        {recommendations.length > 0 && (
          <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-blue-600" />
              <h3 className="2xl font-bold text-gray-900">
                Recommended for You
              </h3>
            </div>
            {reasoning && (
              <p className="bg-blue-50 text-blue-800 p-4 rounded-xl mb-6 italic border border-blue-100">
                " {reasoning} "
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {recommendedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="w-full h-px bg-gray-200 my-12"></div>
          </div>
        )}

        {/* Full Product Grid */}
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-left">
          All Products
        </h3>
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
