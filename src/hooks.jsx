import { useEffect, useState } from "react";

export function useTime() {
  const [time_now, setTime] = useState("00:00:00:00");
  const [isPaused, setPaused] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0); // Renamed for clarity

  function handlePause() {
    setPaused(true);
  }

  function handleStart() {
    setPaused(false);
  }

  function handleReset() {
    setTimeElapsed(0);
    setTime("00:00:00:00");
    setPaused(true); // Pausing on reset
  }

  const formatTime = (elapsed) => {
    const hours = Math.floor(elapsed / 36000) % 24;
    const minutes = Math.floor(elapsed / 600) % 60;
    const seconds = Math.floor(elapsed / 10) % 60;
    const microSeconds = elapsed % 10;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    const formattedMicros = String(microSeconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMicros}`;
  };

  useEffect(() => {
    let intervalId;

    if (!isPaused) {
      intervalId = setInterval(() => {
        setTimeElapsed((prevTime) => {
          const newTime = prevTime + 1;
          // Set formatted time using newTime
          setTime(formatTime(newTime));
          return newTime; // Return newTime for next interval
        });
      }, 100);
    }

    // Cleanup function to clear the interval
    return () => {
      clearInterval(intervalId);
    };
  }, [isPaused]); // No need to include timeElapsed here

  return [time_now, handlePause, handleStart, handleReset];
}
