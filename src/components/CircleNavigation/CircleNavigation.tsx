import React, { useEffect, useRef } from 'react';
import { TimelinePeriod, CirclePoint } from '../../types/timeline';
import { gsap } from 'gsap';
import './CircleNavigation.scss';

interface CircleNavigationProps {
  periods: TimelinePeriod[];
  activePeriodIndex: number;
  onPeriodChange: (index: number) => void;
  rotation: number;
}

const CircleNavigation: React.FC<CircleNavigationProps> = ({
  periods,
  activePeriodIndex,
  onPeriodChange,
  rotation,
}) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<(HTMLDivElement | null)[]>([]);
  const labelsRef = useRef<(HTMLDivElement | null)[]>([]);

  const radius = 265;
  const totalPoints = periods.length;

  // Calculate positions for each point
  const calculatePoints = (): CirclePoint[] => {
    const points: CirclePoint[] = [];
    const angleStep = (Math.PI * 2) / totalPoints;
    const startAngle = Math.PI / 2; // Start from top

    for (let i = 0; i < totalPoints; i++) {
      const angle = startAngle + angleStep * i;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      points.push({ x, y, angle });
    }

    return points;
  };

  const points = calculatePoints();

  useEffect(() => {
    // Rotate the circle
    if (circleRef.current) {
      gsap.to(circleRef.current, {
        rotation: (rotation * 180) / Math.PI,
        duration: 1,
        ease: 'power2.inOut',
      });
    }

    // Counter-rotate points to keep them upright
    pointsRef.current.forEach((point) => {
      if (point) {
        gsap.to(point, {
          rotation: -(rotation * 180) / Math.PI,
          duration: 1,
          ease: 'power2.inOut',
        });
      }
    });
  }, [rotation]);

  return (
    <div className="circle-navigation">
      <div className="circle-container">
        <div className="circle-border"></div>
        
        <div className="circle-content" ref={circleRef}>
          {points.map((point, index) => {
            const isActive = index === activePeriodIndex;
            
            return (
              <div
                key={periods[index].id}
                className="circle-point-wrapper"
                style={{
                  left: `calc(50% + ${point.x}px)`,
                  top: `calc(50% + ${point.y}px)`,
                }}
              >
                <div
                  className={`circle-point ${isActive ? 'active' : ''}`}
                  ref={(el) => (pointsRef.current[index] = el)}
                >
                  <button
                    className="point-button"
                    onClick={() => onPeriodChange(index)}
                    aria-label={`Period ${index + 1}: ${periods[index].category}`}
                  >
                    <span className="point-number">{index + 1}</span>
                  </button>
                  
                  <div
                    className="point-label"
                    ref={(el) => (labelsRef.current[index] = el)}
                  >
                    {periods[index].category}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Decorative lines */}
        <svg
          className="circle-lines"
          width="100%"
          height="100%"
          viewBox="-300 -300 600 600"
        >
          <line
            x1="-530"
            y1="0"
            x2="530"
            y2="0"
            stroke="rgba(66, 86, 122, 0.1)"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="-530"
            x2="0"
            y2="530"
            stroke="rgba(66, 86, 122, 0.1)"
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  );
};

export default CircleNavigation;

