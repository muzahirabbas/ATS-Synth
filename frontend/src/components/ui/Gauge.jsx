import React from 'react';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

const Gauge = ({ value = 0 }) => {
  const size = 160;
  const strokeWidth = 12;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (value / 100) * circumference;

  const color = useMemo(() => {
    if (value > 75) return '#34D399'; // Green
    if (value >= 50) return '#FBBF24'; // Yellow
    return '#F87171'; // Red
  }, [value]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Circle */}
        <circle
          stroke="#373752"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={center}
          cy={center}
        />
        {/* Progress Circle */}
        <motion.circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          r={radius}
          cx={center}
          cy={center}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span 
          className="text-4xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {Math.round(value)}%
        </motion.span>
      </div>
    </div>
  );
};

export default Gauge;
