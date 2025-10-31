import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { TimelineEvent } from '../../types/timeline';
import { gsap } from 'gsap';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './EventsSlider.scss';

interface EventsSliderProps {
  events: TimelineEvent[];
}

const EventsSlider: React.FC<EventsSliderProps> = ({ events }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    // Animate slider entrance
    if (sliderRef.current) {
      gsap.fromTo(
        sliderRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.3 }
      );
    }

    // Reset swiper to first slide when events change
    if (swiperRef.current) {
      swiperRef.current.slideTo(0, 0);
    }
  }, [events]);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="events-slider" ref={sliderRef}>
      <div className="slider-navigation">
        <button
          className={`nav-button nav-prev ${isBeginning ? 'disabled' : ''}`}
          onClick={handlePrev}
          disabled={isBeginning}
          aria-label="Previous slide"
        >
          <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
            <path d="M8.49988 0.750001L2.24988 7L8.49988 13.25" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>
        <button
          className={`nav-button nav-next ${isEnd ? 'disabled' : ''}`}
          onClick={handleNext}
          disabled={isEnd}
          aria-label="Next slide"
        >
          <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
            <path d="M1.50012 0.750001L7.75012 7L1.50012 13.25" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={80}
        slidesPerView={3}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={handleSlideChange}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 25,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 80,
          },
        }}
        className="events-swiper"
      >
        {events.map((event, index) => (
          <SwiperSlide key={`${event.year}-${index}`}>
            <div className="event-card">
              <div className="event-year">{event.year}</div>
              <div className="event-description">{event.description}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EventsSlider;

