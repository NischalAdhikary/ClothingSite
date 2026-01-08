import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
interface HeroSectionProps {
  image: string;
  title?: string | null;
  subtitle?: string | null;
  position?: string | "top" | "center" | "bottom";
}
export default function HeroSection() {
  const HeroData = [
    {
      image: "/img4.jpg",
      position: "top",
      title: "Step Into The Season of Style",
      subtitle: "Curated outfits crafted for comfort, confidence & elegance.",
    },
    {
      image: "/img2.jpg",
      position: "bottom",
      title: "Where Minimal Meets Luxury",
      subtitle: "Timeless fashion essentials for your everyday moments.",
    },
    {
      image: "/img3.jpg",
      position: "center",
      title: "Redefine Your Wardrobe",
      subtitle:
        "Fresh silhouettes and bold designs for the modern trendsetter.",
    },
  ];

  return (
    <Carousel className="w-full bg-black   relative">
      <CarouselContent className="flex ">
        {HeroData.map((item, index) => (
          <CarouselItem key={index}>
            <HeroSlide
              image={item.image}
              title={item.title}
              subtitle={item.subtitle}
              position={item.position}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absoltue">
        <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full p-2 shadow-lg" />
        <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full p-2 shadow-lg" />
      </div>
    </Carousel>
  );
}
const HeroSlide = ({
  image,
  title,
  subtitle,
  position = "center",
}: HeroSectionProps) => {
  const objectposition =
    position === "top"
      ? "object-top"
      : position === "bottom"
      ? "object-bottom"
      : "object-center";
  return (
    <div className="h-[70vh] md:min-h-[calc(100vh-6rem)] relative w-full flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 z-10" />
      <img
        className={`absolute inset-0 w-full h-full object-cover ${objectposition} `}
        src={image}
      />

      {title && subtitle && (
        <div className="relative z-20  flex flex-col max-w-md md:max-w-4xl justify-center items-center h-full text-center text-white px-4">
          <h1 className="text-3xl md:text-7xl font-primary font-bold mb-4">
            {title}
          </h1>
          <p className="text-md md:text-2xl max-w-xl font-secondary  mb-8">
            {subtitle}
          </p>
        </div>
      )}
    </div>
  );
};
