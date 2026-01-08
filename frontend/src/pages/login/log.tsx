import { Button } from "@/components/ui/button";

export default function Log() {
  return (
    <div className="h-[80vh] w-full flex justify-center items-center">
      <div className="w-1/4 h-auto min-h-[30vh] rounded-xl p-2 bg-gray-200 flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-primary font-bold ">
            Get Easy Access Through Your Gmail
          </h1>
          <p className="text-md font-primary">
            Click the button through the easy verification with the help of your
            gmail account
          </p>
        </div>
        <Button className="bg-white text-black hover:text-white">Google</Button>
      </div>
    </div>
  );
}
