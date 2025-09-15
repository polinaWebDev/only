import { useRef } from "react";
import gsap from "gsap";

export const useRotateCircle = (
  datesCount: number,
  circleRef: React.RefObject<HTMLDivElement | null>,
  onRotate?: (rotation: number) => void
) => {
  const rotationRef = useRef(0);

  const rotateToIndex = (i: number) => {
    if (!circleRef.current) return;

    const angleStep = 360 / datesCount;
    const currentButtonAngle = i * angleStep;
    const targetAngle = -45;

    let rotationDelta = targetAngle - currentButtonAngle - rotationRef.current;
    rotationDelta = ((rotationDelta + 180) % 360) - 180;

    const newRotation = rotationRef.current + rotationDelta;
    rotationRef.current = newRotation;

    gsap.to(circleRef.current, {
      rotation: newRotation,
      duration: 1,
      ease: "power2.inOut",
      onUpdate: () => {
        onRotate?.(rotationRef.current);
      },
      onComplete: () => {
        onRotate?.(rotationRef.current);
      },
    });
  };

  return rotateToIndex;
};
