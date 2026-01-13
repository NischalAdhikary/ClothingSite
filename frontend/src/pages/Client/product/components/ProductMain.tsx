import Productcard from "./productcard";

export default function ProductMain({ cardData }) {
  return (
    <div className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {cardData?.map((card) => {
        return (
          <Productcard
            key={card.id}
            id={card.id}
            name={card.name}
            price={card.price}
            description={card.description}
          ></Productcard>
        );
      })}
    </div>
  );
}
