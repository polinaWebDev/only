import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export const useGsapCounter = (targetValue: number, duration = 0.8) => {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const ref = useRef({ value: targetValue });

  useEffect(() => {
    gsap.to(ref.current, {
      value: targetValue,
      duration,
      ease: "power1.out",
      onUpdate: () => setDisplayValue(Math.round(ref.current.value)),
    });
  }, [targetValue, duration]);

  return displayValue;
};
