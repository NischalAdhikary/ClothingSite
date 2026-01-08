import Productcard from "./productcard";

const cardData = [
  {
    id: 1,
    product: "Hello Kitty T-Shirt",
    description:
      "Soft cotton Hello Kitty printed t-shirt, perfect for casual summer wear.",
    price: 2000,
    category: "Men",
    subcategory: "T-Shirts",
    image: "/images/hello-kitty-tshirt.jpg",
  },
  {
    id: 2,
    product: "Classic Blue Jeans",
    description:
      "Regular fit blue denim jeans with a comfortable stretch fabric.",
    price: 3500,
    category: "Men",
    subcategory: "Jeans",
    image: "/images/blue-jeans.jpg",
  },
  {
    id: 3,
    product: "Oversized Hoodie",
    description:
      "Warm oversized hoodie made with premium fleece for winter comfort.",
    price: 4200,
    category: "Unisex",
    subcategory: "Hoodies",
    image: "/images/oversized-hoodie.jpg",
  },
  {
    id: 4,
    product: "Floral Summer Dress",
    description:
      "Lightweight floral dress designed for breathable summer styling Lightweight floral dress designed for breathable summer styling Lightweight floral dress designed for breathable summer styling.Lightweight floral dress designed for breathable summer styling.igned for breathable summer styling Lightweight floral dress designed for breathable summer styling Lightweight floral dress designed for breathable summer styling.Lightweight floral dress designed for breathable summer stylingigned for breathable summer styling Lightweight floral dress designed for breathable summer styling Lightweight floral dress designed for breathable summer styling.Lightweight floral dress designed for breathable summer stylingigned for breathable summer styling Lightweight floral dress designed for breathable summer styling Lightweight floral dress designed for breathable summer styling.Lightweight floral dress designed for breathable summer styling",
    price: 4800,
    category: "Women",
    subcategory: "Dresses",
    image: "/images/floral-dress.jpg",
  },
];

export default function ProductMain() {
  return (
    <div className="w-full h-auto ">
      <div className="container mx-auto p-10 grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cardData.map((card) => {
          return (
            <Productcard
              key={card.id}
              id={card.id}
              name={card.product}
              price={card.price}
              description={card.description}
            ></Productcard>
          );
        })}
      </div>
    </div>
  );
}
