import { useEffect, useState } from "react";

const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 524);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth > 524 && window.innerWidth <= 768
  );
  const [isIpadAir5, setIsIpadAir5] = useState(
    window.innerWidth > 768 && window.innerWidth <= 1024
  );
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 524);
    setIsTablet(window.innerWidth > 524 && window.innerWidth <= 768);
    setIsIpadAir5(window.innerWidth > 768 && window.innerWidth <= 1024);
    setIsDesktop(window.innerWidth > 1024);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile, isTablet, isIpadAir5, isDesktop };
};

export default useResponsive;
