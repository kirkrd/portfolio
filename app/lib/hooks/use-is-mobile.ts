import { useEffect, useState } from "react";

export const useIsMobile = (): boolean => {
  const isClient = typeof window !== "undefined";
  const [isMobile, setIsMobile] = useState<boolean>(
    isClient ? window.innerWidth <= 768 : false,
  );

  useEffect(() => {
    if (!isClient) {
      return;
    }

    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isClient]);

  return isMobile;
};
