import { useEffect } from "react";

function useLockBodyScroll(open: boolean) {
  useEffect(() => {
    if (!open) return;
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);
}

export default useLockBodyScroll;
