interface SidePanelProps {
  position?: "left" | "right";
  children?: React.ReactNode;
}

export default function SidePanel({
  children,
  position = "right",
}: SidePanelProps) {
  return (
    <div className="fixed inset-0 z-50 ">
      <div
        className={`min-w-[500px]  w-1/3 fixed top-0 h-full bg-gray-100 overflow-y-auto ${
          position === "left" ? "left-0" : "right-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
