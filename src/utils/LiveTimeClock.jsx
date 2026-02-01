import { useState, useEffect } from 'react';

const LiveTimeClock = ({ 
  timezone = 'Africa/Lagos', 
  location = 'Lagos, NG',
  className = 'text-[18px] text-primary-light' 
}) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Function to update time
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        minute: '2-digit',
        hour12: false
      });
      setCurrentTime(timeString);
    };

    // Update immediately
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    // Cleanup
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <span className={className}>
      {location} {currentTime}
    </span>
  );
};

// Usage examples:
// <LiveTimeClock />
// <LiveTimeClock timezone="America/New_York" location="New York, USA" />
// <LiveTimeClock timezone="Europe/London" location="London, UK" />

export default LiveTimeClock;