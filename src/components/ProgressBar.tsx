import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  currentValue: number;
  maxValue: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentValue, maxValue }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simular el efecto de animación
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = (currentValue / maxValue) * 100;
        if (prev < increment) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return increment;
        }
      });
    }, 10);

    return () => clearInterval(interval);
  }, [currentValue, maxValue]);

  return (
    <div className="w-full bg-gray-300 rounded-full h-6">
      <div
        className="bg-blue-500 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center transition-all duration-500"
        style={{ width: `${progress}%` }}
      >
        {Math.floor(progress)}%
      </div>
    </div>
  );
};

export default ProgressBar;
