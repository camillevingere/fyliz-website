"use client";

import { useEffect, useState } from "react";

export default function BacktoTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled more than page height
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`backtotop-wrap position-fixed bottom-0 end-0 z-99 m-2 vstack  ${
        isVisible ? "uc-active" : ""
      }`}
    >
      <a
        className="btn btn-sm bg-primary text-white w-40px h-40px rounded-circle"
        onClick={scrollToTop}
        data-uc-backtotop
      >
        <i className="icon-2 unicon-chevron-up"></i>
      </a>
    </div>
  );
}
