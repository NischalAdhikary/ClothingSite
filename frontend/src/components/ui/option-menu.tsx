import React, { useEffect, useRef } from "react";

export default function OptionMenu({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  const divRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function ClickOutSide(e: MouseEvent) {
      if (divRef.current && !divRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", ClickOutSide);
    return () => document.removeEventListener("mousedown", ClickOutSide);
  }, [onClose]);

  return (
    <div
      ref={divRef}
      className="absolute right-[-30px] rounded min-w-[150px] w-auto top-[50px] bg-red-50 flex flex-col    h-auto "
    >
      {children}
    </div>
  );
}
