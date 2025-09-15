import { useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import gsap from 'gsap';
import { Circle, PeriodYears } from '@/components';
import { IDate } from '@/types';
import { usePeriod, useRotateCircle } from '@/hooks';

import styles from './styles.module.scss';

interface PeriodSwitchProps {
  datesList: IDate[];
  className?: string;
}

export const PeriodSwitch = ({ datesList, className }: PeriodSwitchProps) => {
  const { activeIndex, setActiveIndex } = usePeriod();
  const [rotation, setRotation] = useState(0);
  const circleRef = useRef<HTMLDivElement>(null);
  const themeTitleRef = useRef<HTMLHeadingElement>(null);
  const rotateToIndex = useRotateCircle(
    datesList.length,
    circleRef,
    setRotation
  );

  useLayoutEffect(() => {
    if (!themeTitleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        themeTitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power1' }
      );
    }, themeTitleRef);

    return () => ctx.revert();
  }, [activeIndex]);

  const handleClickPrev = () => {
    const newIndex = Math.max(activeIndex - 1, 0);
    rotateToIndex(newIndex);
    setActiveIndex(newIndex);
  };

  const handleClickNext = () => {
    const newIndex = Math.min(activeIndex + 1, datesList.length - 1);
    rotateToIndex(newIndex);
    setActiveIndex(newIndex);
  };

  return (
    <div className={clsx(styles.period, className)}>
      <Circle
        datesList={datesList}
        ref={circleRef}
        rotation={rotation}
        setRotation={setRotation}
      />
      <div className={styles.periodYears}>
        <PeriodYears activeIndex={activeIndex} datesList={datesList} />
      </div>
      <h3 ref={themeTitleRef} className={styles.periodTitle}>
        {datesList[activeIndex].theme}
      </h3>
      <div className={styles.periodNavigation}>
        <div className={styles.periodCounter}>
          <span>0{activeIndex + 1}</span>/<span>0{datesList.length}</span>
        </div>
        <div className={styles.periodButtons}>
          <button
            className={styles.periodButton}
            disabled={activeIndex === 0}
            onClick={handleClickPrev}
          >
            {'<'}
          </button>
          <button
            className={styles.periodButton}
            disabled={activeIndex === datesList.length - 1}
            onClick={handleClickNext}
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};
