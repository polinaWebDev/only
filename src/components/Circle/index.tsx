import { forwardRef, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { IDate } from '@/types';
import styles from './styles.module.scss';
import { usePeriod } from '@/hooks/usePeriod';
import { useRotateCircle } from '@/hooks/useRotateCircle';

interface CircleProps {
  rotation: number;
  setRotation: (rotation: number) => void;
  datesList: IDate[];
  className?: string;
}

export const Circle = forwardRef<HTMLDivElement, CircleProps>(
  ({ rotation, setRotation, datesList, className }, ref) => {
    const { activeIndex, setActiveIndex } = usePeriod();
    const [radius, setRadius] = useState(0);

    const innerRef = useRef<HTMLDivElement>(null);
    const circleRef = (ref as React.RefObject<HTMLDivElement>) ?? innerRef;

    const rotateToIndex = useRotateCircle(
      datesList.length,
      circleRef,
      setRotation
    );

    useEffect(() => {
      if (!circleRef.current) return;

      const observer = new ResizeObserver(() => {
        if (circleRef.current) {
          setRadius(circleRef.current.offsetWidth / 2);
        }
      });

      observer.observe(circleRef.current);
      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      if (radius > 0) {
        rotateToIndex(0);
        setActiveIndex(0);
      }
    }, [radius]);

    return (
      <div className={clsx(styles.circle, className)} ref={circleRef}>
        {radius > 0 &&
          datesList.map((_, i) => {
            const angle = (2 * Math.PI * i) / datesList.length;
            const x = radius + radius * Math.cos(angle) - 28;
            const y = radius + radius * Math.sin(angle) - 28;

            return (
              <button
                key={i}
                className={clsx(
                  styles.circleButton,
                  activeIndex === i && styles.active
                )}
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: `rotate(${-rotation}deg)`,
                }}
                onClick={() => {
                  rotateToIndex(i);
                  setActiveIndex(i);
                }}
              >
                {i + 1}{' '}
                <span
                  className={clsx(
                    styles.circleButtonText,
                    activeIndex === i && styles.circleButtonTextActive
                  )}
                >
                  {datesList[activeIndex].theme}
                </span>
              </button>
            );
          })}
      </div>
    );
  }
);

Circle.displayName = 'Circle';
