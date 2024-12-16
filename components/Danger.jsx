import React from 'react';

function Danger({ value, onChange }) {
  const calculateDangerLevel = (inputValue) => {
    if (inputValue > 2) {
      onChange(3);
      return 3;
    }
    if (inputValue > 1.1) {
      onChange(2);
      return 2;
    }
    if (inputValue < 1.1) {
      onChange(1);
      return 1;
    }
    return 0;
  };

  const handleSliderChange = (e) => {
    const newValue = parseFloat(e.target.value);
    calculateDangerLevel(newValue);
  };

  return (
    <div className="w-full">
      <input 
        type="range" 
        min="0" 
        max="3" 
        step="0.1" 
        value={value} 
        onChange={handleSliderChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
      </div>
    </div>
  );
}

export default Danger;