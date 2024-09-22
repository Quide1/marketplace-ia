import React, { useEffect, useState } from "react";

interface ProgressBarProps {
  currentValue: number;
  maxValue: number | null;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentValue,
  maxValue,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!maxValue || maxValue === 0) {
      setProgress(0); // Si no hay maxValue válido, establece el progreso en 0
      return;
    }

    const increment = (currentValue / maxValue) * 100;
    const limitedIncrement = Math.min(increment, 100); // Limitar el progreso al 100%

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < limitedIncrement) {
          return prev + 1; // Incrementar gradualmente el progreso
        } else {
          clearInterval(interval);
          return limitedIncrement;
        }
      });
    }, 10);

    return () => clearInterval(interval);
  }, [currentValue, maxValue]);

  return (
    <div className="w-full  flex flex-col gap-2 p-4 items-center justify-center">
      <p className="text-yellow-700 font-bold">Progreso</p>
      <div className="w-[400px] ">
        <div className="w-full bg-gray-300 rounded-full h-6 ">
          <div
            className="bg-blue-500 h-6 rounded-full  text-xs font-bold flex items-center justify-center transition-all duration-500 text-yellow-800"
            style={{ width: `${progress}%` }}
          >
            {Math.floor(progress)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
