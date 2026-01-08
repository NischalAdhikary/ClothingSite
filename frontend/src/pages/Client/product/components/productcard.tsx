import { Card, CardContent } from "@/components/ui/card";

export default function Productcard({ name, description, price, id }) {
  return (
    <Card className="shadow-lg rounded cursor-pointer max-w-[320px]">
      <CardContent className="p-0 max-h-[500px]">
        <div className="h-[300px] sm:h-[350px]  bg-red-200 overflow-hidden  min-w-[100px]">
          <img
            src="/img3.jpg"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          ></img>
        </div>
        <div className="p-2 flex flex-col gap-2">
          <h1 className="text-xl sm:text-2xl font-bold font-primary">{name}</h1>
          <p className="text-sm font-medium font-secondary line-clamp-2">
            {description}
          </p>
          <h1 className="text-xl sm:text-2xl  font-bold font-primary">
            Rs.{price}
          </h1>
        </div>
      </CardContent>
    </Card>
  );
}
