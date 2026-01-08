import api from "@/api/api";
import { Button } from "@/components/ui/button";
const handleClick = async () => {
  try {
    const res = await api.get("/auth");
    const url = res.data.authUrl;
    window.location.href = url;
  } catch (err) {
    console.log(err);
  }
};

export default function Log() {
  return (
    <div className="h-[80vh] w-full flex p-4 justify-center items-center">
      <div className="w-full md:w-1/4  h-auto min-h-[30vh] rounded-xl p-2 bg-gray-200 flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-primary font-bold ">
            Get Easy Access Through Your Gmail
          </h1>
          <p className="text-md font-primary">
            Click the button through the easy verification with the help of your
            gmail account
          </p>
        </div>
        <Button
          onClick={handleClick}
          className="bg-white text-black hover:text-white"
        >
          Google
        </Button>
      </div>
    </div>
  );
}
