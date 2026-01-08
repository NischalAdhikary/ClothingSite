import { Loader } from "lucide-react";
export default function Loading() {
  return (
    <div className="h-[80vh] w-full flex justify-center items-center">
      <div className="animate-spin">
        <Loader />
      </div>
    </div>
  );
}
