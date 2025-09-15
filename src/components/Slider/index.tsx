import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { IDate } from '@/types';
import { usePeriod } from '@/hooks';

import 'swiper/css';
import 'swiper/css/pagination';

import styles from './styles.module.scss';

interface SliderProps {
  datesList: IDate[];
}

export const Slider = ({ datesList }: SliderProps) => {
  const { activeIndex } = usePeriod();
  const sliderRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sliderRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sliderRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.5, ease: 'power1' }
      );
    }, sliderRef);

    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <div className={styles.wrapper}>
      <div ref={sliderRef}>
        <Swiper
          className={styles.slider}
          breakpoints={{
            0: {
              spaceBetween: 25,
              slidesPerView: 1.5,
              pagination: { enabled: true },
            },
            420: {
              spaceBetween: 40,
              slidesPerView: 2,
              pagination: { enabled: true },
            },
            769: {
              spaceBetween: 60,
              slidesPerView: 2,
              pagination: { enabled: false },
            },
            992: {
              spaceBetween: 80,
              slidesPerView: 3,
              pagination: { enabled: false },
            },
          }}
          modules={[Navigation, Pagination]}
          pagination={{
            clickable: true,
            enabled: false,
          }}
          navigation={{
            nextEl: `.${styles.buttonNext}`,
            prevEl: `.${styles.buttonPrev}`,
          }}
        >
          {datesList[activeIndex].slides.map(({ id, title, subtitle }) => (
            <SwiperSlide className={styles.slide} key={id}>
              <p className={styles.slideTitle}>{title}</p>
              <p className={styles.slideDescription}>{subtitle}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <button className={clsx(styles.button, styles.buttonPrev)}>{'<'}</button>
      <button className={clsx(styles.button, styles.buttonNext)}>{'>'}</button>
    </div>
  );
};
