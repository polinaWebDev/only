import { useGsapCounter } from "@/hooks";
import { IDate } from "@/types";

import styles from "./styles.module.scss";

interface PeriodYearsProps {
  activeIndex: number;
  datesList: IDate[];
}

export const PeriodYears = ({ datesList, activeIndex }: PeriodYearsProps) => {
  const displayStart = useGsapCounter(datesList[activeIndex].periodStart);
  const displayEnd = useGsapCounter(datesList[activeIndex].periodEnd);
  
  return (
    <>
      <h2 className={styles.start}>{displayStart}</h2>
      <h2 className={styles.end}>{displayEnd}</h2>
    </>
  );
};
