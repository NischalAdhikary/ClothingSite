export default function CartCard({ data }) {
  return (
    <div className="w-full rounded-lg shadow-sm flex flex-col min-h-40 sm:flex-row gap-3 p-2 bg-white">
      <div className="sm:basis-1/3 h-40  bg-red-500 sm:h-auto">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex-1 space-y-1">
        <h1 className="font-primary font-semibold text-md">{data.name}</h1>
        <p className="text-sm font-secondary line-clamp-2">
          {data.description}
        </p>
        <h2 className="text-lg font-semibold">Rs.{data.price}</h2>
        <h3 className="text-sm text-gray-500">Qty: {data.quantity}</h3>
      </div>
    </div>
  );
}
