import React, { useState, useEffect, useRef } from 'react';
import { TimelineData, CirclePoint } from '../../types/timeline';
import CircleNavigation from '../CircleNavigation/CircleNavigation';
import EventsSlider from '../EventsSlider/EventsSlider';
import { gsap } from 'gsap';
import './HistoricalTimeline.scss';

interface HistoricalTimelineProps {
  data: TimelineData;
}

const HistoricalTimeline: React.FC<HistoricalTimelineProps> = ({ data }) => {
  const [activePeriodIndex, setActivePeriodIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const startYearRef = useRef<HTMLDivElement>(null);
  const endYearRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  const activePeriod = data.periods[activePeriodIndex];
  const totalPeriods = data.periods.length;

  useEffect(() => {
    // Animate years change
    if (startYearRef.current && endYearRef.current) {
      const timeline = gsap.timeline();
      
      // Fade out and scale
      timeline.to([startYearRef.current, endYearRef.current], {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: 'power2.in',
      });

      // Update content (happens instantly while opacity is 0)
      timeline.call(() => {
        if (startYearRef.current && endYearRef.current) {
          startYearRef.current.textContent = activePeriod.startYear.toString();
          endYearRef.current.textContent = activePeriod.endYear.toString();
        }
      });

      // Fade in and scale back
      timeline.to([startYearRef.current, endYearRef.current], {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    // Animate category change
    if (categoryRef.current) {
      gsap.fromTo(
        categoryRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [activePeriod]);

  const handlePeriodChange = (index: number) => {
    if (index === activePeriodIndex) return;

    // Calculate rotation based on point positions
    const anglePerPoint = (Math.PI * 2) / totalPeriods;
    const targetAngle = -anglePerPoint * index;
    const currentAngle = rotation;
    
    // Calculate shortest rotation direction
    let angleDiff = targetAngle - currentAngle;
    
    // Normalize angle difference to -π to π range
    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
    
    const newRotation = currentAngle + angleDiff;

    gsap.to({ value: rotation }, {
      value: newRotation,
      duration: 1,
      ease: 'power2.inOut',
      onUpdate: function() {
        setRotation(this.targets()[0].value);
      },
    });

    setActivePeriodIndex(index);
  };

  return (
    <div className="historical-timeline">
      <div className="timeline-header">
        <div className="period-counter" ref={counterRef}>
          <span className="counter-current">{String(activePeriodIndex + 1).padStart(2, '0')}</span>
          <span className="counter-separator">/</span>
          <span className="counter-total">{String(totalPeriods).padStart(2, '0')}</span>
        </div>
        
        <h2 className="period-category" ref={categoryRef}>
          {activePeriod.category}
        </h2>
      </div>

      <div className="timeline-years">
        <div className="year-start" ref={startYearRef}>
          {activePeriod.startYear}
        </div>
        <div className="year-end" ref={endYearRef}>
          {activePeriod.endYear}
        </div>
      </div>

      <CircleNavigation
        periods={data.periods}
        activePeriodIndex={activePeriodIndex}
        onPeriodChange={handlePeriodChange}
        rotation={rotation}
      />

      <EventsSlider events={activePeriod.events} key={activePeriod.id} />
    </div>
  );
};

export default HistoricalTimeline;

