import { Container, PeriodSwitch, Slider } from '@/components';
import styles from './styles.module.scss';
import { historicalDates } from '@/shared/constants/periods';

export const PeriodSwitchSection = () => {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.sectionWrapper}>
          <div className={styles.sectionContent}>
            <header className={styles.sectionHeader}>
              <h1 className={styles.sectionTitle}>
                Исторические <br /> даты
              </h1>
            </header>
            <PeriodSwitch
              className={styles.sectionPeriod}
              datesList={historicalDates}
            />
          </div>
          <div className={styles.sectionSlider}>
            <Slider datesList={historicalDates} />
          </div>
        </div>
      </Container>
    </section>
  );
};
