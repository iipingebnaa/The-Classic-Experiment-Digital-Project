"use client";

import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { API } from "@/config/api";
import { ITEM_IDS } from "@/constants/items";

interface Item {
  id: string;
  name: string;
  price: string;
}

interface Category {
  title: string;
  image: string;
  items: Item[];
}

interface BackendItem {
  _id: string;
  unit_price: number;
}

// Hardcoded categories
const PRICING_DATA = [
  {
    title: "Baskets",
    image: "/assets/images/white-laundry-basket-with-clean-clothes.png",
    items: [
      { id: ITEM_IDS.SMALL_BASKET, name: "1kg - 3kg Small Basket", price: "" },
      { id:ITEM_IDS.MEDIUM_BASKET, name: "4kg - 7kg Medium Basket", price: "" },
      { id:ITEM_IDS.LARGE_BASKET, name: "8kg - 10kg Large/big Basket", price: "" },
    ],
  },
  {
    title: "Basket Iron Only",
    image: "/assets/images/steam-iron-pressing-clothes-in-laundry-basket.png",
    items: [
      { id: ITEM_IDS.SMALL_BASKET_IRON_ONLY, name: "Small", price: "" },
      { id: ITEM_IDS.MEDIUM_BASKET_IRON_ONLY, name: "Medium", price: "" },
      { id: ITEM_IDS.LARGE_BASKET_IRON_ONLY, name: "Large", price: "" },
    ],
  },
{
      title: "Ladies' wear",
      image: "/assets/images/women-s-clothing-laundry-items-hanging-neatly.jpg",
      items: [
        { id: ITEM_IDS.L_SHIRT_LONG_SLEEVE, name: "Shirt short sleeve", price: "" },
        { id: ITEM_IDS.L_SHIRT_LONG_SLEEVE, name: "Shirt long sleeve", price: "" },
        { id: ITEM_IDS.L_TSHIRT, name: "T-shirt", price: "" },
        { id: ITEM_IDS.L_TOP, name: "Top", price: "" },
        { id: ITEM_IDS.L_TROUSER_OR_JEANS, name: "Trouser/jeans", price: "" },
        { id: ITEM_IDS.L_JERSEY, name: "Jersey", price: "" },
        { id: ITEM_IDS.L_JACKET, name: "Jacket", price: "" },
        { id: ITEM_IDS.L_PULLOVER_OR_SWEATER, name: "Pullover/sweater", price: "" },
        { id: ITEM_IDS.L_SHORTS, name: "Shorts", price: "" },
        { id: ITEM_IDS.L_PYJAMAS_2PC, name: "Pyjamas (2pcs)", price: "" },
        { id: ITEM_IDS.L_SOCKS_PER_PAIR, name: "Socks (per pair)", price: "" },
        { id: ITEM_IDS.SKIRT, name: "Skirt", price: "" },
        { id: ITEM_IDS.SWIMSUIT, name: "Swimsuit", price: "" },
        { id: ITEM_IDS.DRESS, name: "Dress", price: "" },
      ],
    },
    {
      title: "Men's wear",
      image: "/assets/images/men-s-clothing-shirts-and-pants-neatly-folded.jpg",
      items: [
        { id: ITEM_IDS.M_SHIRT_SHORT_SLEEVE, name: "Shirt short sleeve", price: "" },
        { id: ITEM_IDS.M_SHIRT_LONG_SLEEVE, name: "Shirt long sleeve", price: "" },
        { id: ITEM_IDS.M_TSHIRT, name: "T-shirt", price: "" },
        { id: ITEM_IDS.M_TROUSER_OR_JEANS, name: "Trouser/jean", price: "" },
        { id: ITEM_IDS.M_SHORTS, name: "Shorts", price: "" },
        { id: ITEM_IDS.VESTS_OR_UNDERPANTS, name: "Vests/under pants", price: "" },
        { id: ITEM_IDS.M_SOCKS_PER_PAIR, name: "Socks (pair)", price: "" },
        { id: ITEM_IDS.M_PYJAMAS_2PC, name: "Pyjamas (2pcs)", price: "" },
        { id: ITEM_IDS.M_JERSEY, name: "Jersey", price: "" },
        { id: ITEM_IDS.M_JACKET, name: "Jacket", price: "" },
        { id: ITEM_IDS.M_PULLOVER_OR_SWEATER, name: "Sweater/pullover", price: "" },
      ],
    },
    {
      title: "Blankets/Duvet inners",
      image: "/assets/images/cozy-blankets-and-duvet-inners-folded-on-shelf.webp",
      items: [
        { id: ITEM_IDS.SINGLE, name: "Single", price: "" },
        { id: ITEM_IDS.DOUBLE, name: "Double", price: "" },
        { id: ITEM_IDS.QUEEN_OR_KING_COMFORTERS, name: "Queen Comforters / king", price: "" },
        { id: ITEM_IDS.WINTER_BLANKET, name: "Winter Blanket", price: "" },
        { id: ITEM_IDS.HAND_TOWEL, name: "Hand towel", price: "" },
        { id: ITEM_IDS.BATH_TOWEL, name: "Bath towel", price: "" },
      ],
    },
    {
      title: "Beddings",
      image: "/assets/images/clean-bed-sheets-and-pillowcases-neatly-stacked.png",
      items: [
        { id: ITEM_IDS.SMALL_THROW, name: "Small Throw", price: "" },
        { id: ITEM_IDS.MEDIUM_THROW, name: "Medium Throw", price: "" },
        { id: ITEM_IDS.HEAVY_THROW, name: "Heavy Throw", price: "" },
        { id: ITEM_IDS.FLATSHEET_OR_FITTEDSHEET, name: "Flat sheet / Fitted sheet", price: "" },
        { id: ITEM_IDS.DUVET_COVER, name: "Duvet cover", price: "" },
        { id: ITEM_IDS.PILLOWCASE, name: "Pillowcase", price: "" },
        { id: ITEM_IDS.CONTINENTAL_PILLOW_INNER, name: "Continental Pillow inner", price: "" },
        { id: ITEM_IDS.STANDARD_PILLOW_INNER, name: "Standard Pillow inner", price: "" },
      ],
    },
    {
      title: "Others",
      image: "/assets/images/formal-suit-and-coat-hanging-on-rack.webp",
      items: [
        { id: ITEM_IDS.SUIT, name: "Suit", price: "" },
        { id: ITEM_IDS.SHORT_WINTER_COAT, name: "Winter Coat (Short)", price: "" },
        { id: ITEM_IDS.LONG_WINTER_COAT, name: "Winter Coat (Long)", price: "" },
        { id: ITEM_IDS.BLAZER, name: "Blazer", price: "" },
        { id: ITEM_IDS.GRADUATION_GOWN, name: "Graduation Gown", price: "" },
        { id: ITEM_IDS.OFFICIAL_PANTS, name: "Official Pants", price: "" },
      ],
    },
    {
      title: "Curtains",
      image: "/assets/images/clean-curtains-hanging-elegantly.jpg",
      items: [
        { id: ITEM_IDS.NORMAL_LENGTH_CURTAIN, name: "Normal length", price: "" },
        { id: ITEM_IDS.EXTRA_LENGTH_CURTAIN, name: "Extra length", price: "" },
      ],
    },
];

export default function PricingSection() {
  const [pricingData, setPricingData] = useState<Category[]>(PRICING_DATA);
  const [fastServicePrice, setFastServicePrice] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  useEffect(() => {
  const fetchPrices = async () => {
    try {
      const response = await fetch(API.getItems());
      if (!response.ok) throw new Error("Failed to fetch items");

      const data: BackendItem[] = await response.json();

      const updatedCategories = pricingData.map((cat) => ({
        ...cat,
        items: cat.items.map((item) => {
          const found = data.find((i) => i._id === item.id);
          return found 
           ? { ...item, price: `N$${found.unit_price}` }
           : item;
        }),
      }));


      setPricingData(updatedCategories);

      // Fetch Fast Service price by ID
      const fastServiceItem = data.find((i) => i._id === ITEM_IDS.FAST_SERVICE);
      setFastServicePrice(fastServiceItem ? `N$${fastServiceItem.unit_price}` : null);

    } catch (err) {
      console.error(err);
    }finally{
      setLoading(false);
    }
  };

  fetchPrices();
}, []);


  return (
    <div className="px-6 pb-6 pt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-5 md:gap-6">
        {pricingData.map((category, index) => {
          const isExpanded = expandedCard === index;
          const displayItems = isExpanded ? category.items : category.items.slice(0, 3);

          return (
            <Card
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-all duration-300 p-0 flex flex-col h-[100%] gap-px"
            >
              <div className="relative h-36 sm:h-40 md:h-44 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full object-cover rounded-b-lg h-full"
                />
              </div>

              <div className="p-1.5 sm:p-2 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 mt-0 mb-1.5 text-sm sm:text-base">
                  {category.title}
                </h3>

                <div className="flex-1 flex flex-col gap-2">
                  {displayItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center gap-2">
                      <span className="flex-1 text-left text-gray-900 text-xs sm:text-sm truncate">
                        {item.name}
                      </span>
                      <span className="font-semibold text-[#003269] text-xs sm:text-sm flex-shrink-0">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>

                {category.items.length > 5 && !isExpanded && (
                  <button
                    onClick={() => setExpandedCard(index)}
                    className="mt-2 text-[#003262] font-semibold text-sm underline hover:brightness-110 transition self-start bg-transparent px-0 py-0"
                  >
                    More
                  </button>
                )}

                {isExpanded && (
                  <button
                    onClick={() => setExpandedCard(null)}
                    className="mt-2 text-[#003262] font-semibold text-sm underline hover:brightness-110 transition self-start bg-transparent px-0 py-0"
                  >
                    Show Less
                  </button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Fast Service Banner */}
{fastServicePrice && (
  <div className="text-center py-2 sm:py-4 mt-4">
    <p className="text-[#003262] font-bold text-lg sm:text-xl">
      Fast Service: {fastServicePrice}
    </p>
  </div>
)}
    </div>


  );
}