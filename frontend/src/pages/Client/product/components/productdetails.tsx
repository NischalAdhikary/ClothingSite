import Loading from "@/components/layers/Loading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCarts";
import { useNavigate } from "react-router-dom";
export default function ProductDetails({
  data,
  loading,
  size,
  color,
  selectedColor,
  selectedSize,
  variants,
  variant,
  setSizeAndColor,
}) {
  console.log("variant", variant);
const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const checkColors = (colorid: string) => {
    if (selectedSize) {
      const exist = variants.some(
        (v) =>
          v.size.id === selectedSize && v.color.id === colorid && v.stocks > 0
      );
      if (exist) {
        return false;
      } else {
        return true;
      }
    }
    return true;
  };

  const handleCartClick = () => {
    if (variant && selectedColor && selectedSize) {
      if (user) {
        const cartdata = {
          id: data?.product?.id,
          name: data?.product?.name,
          description: data?.product?.description,
          price: data?.product?.price,
          variantid: variant.variant_id,
        };
        addToCart(cartdata);
        setSizeAndColor({ color: null, size: null });
      } else {
        navigate("/login");
      }
    } else {
      console.log("Choose the variants");
    }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full p-10 h-auto">
          <div className="container mx-auto  flex flex-col md:flex-row gap-14">
            <div className=" flex-1 flex flex-col-reverse md:flex-row gap-10">
              <div className="grid gap-4 grid-cols-4 md:grid-cols-none basis-[150px]">
                <Card>hello</Card>
                <Card>hi </Card>
                <Card>what</Card>
                <Card>then</Card>
              </div>

              <div className="h-[550px] w-full  bg-red-500"></div>
            </div>

            <div className="flex-1 p-2 ">
              <div>
                <h2 className="text-3xl mb-3 font-bold font-primary text-gray-600">
                  {data?.product?.name}
                </h2>
                <span className="text-lg  font-secondary text-gray-500 line-through mr-6">
                  {data?.product?.price}
                </span>
                <span className="text-3xl  font-bold text-gray-600 font-secondary">
                  Rs.3500
                </span>
                <div className="mt-4 flex flex-col gap-2">
                  <h3 className="text-xl  font-bold font-primary">
                    Description:
                  </h3>
                  <p className="text-md font-semibold font-primary">
                    {data?.product?.description}
                  </p>
                </div>
                <div className="mt-4 ">
                  <h3 className="text-xl font-bold mb-3 font-primary">Size:</h3>
                  <div className="flex gap-4">
                    {size.map((s) => {
                      return (
                        <div key={s.id} className="flex gap-1">
                          <label
                            className="text-sm font-semibold"
                            htmlFor={s.id}
                          >
                            {s.name}
                          </label>
                          <input
                            type="radio"
                            name="size"
                            id={s.id}
                            value={s.id}
                            checked={selectedSize === s.id}
                            onChange={() => {
                              setSizeAndColor({ size: s.id, color: null });
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="my-4">
                  <h3 className="text-xl font-bold mb-3 font-primary">
                    Color:
                  </h3>
                  <div className="flex gap-4">
                    {color.map((c) => {
                      return (
                        <div key={c.id} className="flex gap-1">
                          <label
                            className="text-sm  font-semibold"
                            htmlFor={c.id}
                          >
                            {c.name}
                          </label>
                          <input
                            type="radio"
                            name="color"
                            disabled={checkColors(c.id)}
                            checked={c.id === selectedColor}
                            id={c.id}
                            value={c.id}
                            onChange={() => {
                              setSizeAndColor((prev) => ({
                                ...prev,
                                color: c.id,
                              }));
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <Button onClick={handleCartClick} className="w-full mt-4">
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
