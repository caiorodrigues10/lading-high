"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";

export function TitlePageScale() {
  const [scrollActive, setScrollActive] = useState(true);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function checkScrollPosition() {
      var scrollPosition = window.scrollY || window.pageYOffset;

      var size = 280;

      if (scrollPosition >= size - 100 && scale > 0) {
        setScale(1 - (0.6 * (scrollPosition - (size - 100))) / 100);
      }

      if (scrollPosition < size) {
        setScale(1);
        setScrollActive(false);
      } else {
        setScrollActive(true);
      }
    }
    window.addEventListener("scroll", checkScrollPosition);
    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, [scale]);

  return (
    <p
      className={clsx(
        "opacity-100 uppercase text-7xl font-bold text-left w-fit max-lg:text-5xl max-sm:text-center",
        {
          "opacity-0": scrollActive,
        }
      )}
      style={{ scale }}
    >
      HIGH <br /> BOOSTER
    </p>
  );
}
