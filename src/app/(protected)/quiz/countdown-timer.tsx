"use client";

import { useTimerStore } from "@/stores/timer-store";
import React, { useEffect, useState } from "react";

const formatTime = (seconds: number) => {
  const years = Math.floor(seconds / (365 * 24 * 60 * 60));
  const days = Math.floor((seconds % (365 * 24 * 60 * 60)) / (24 * 60 * 60));
  const hours = Math.floor((seconds % (24 * 60 * 60)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  let formattedTime = "";

  if (years > 0) {
    formattedTime += `${years}y `;
  }
  if (days > 0) {
    formattedTime += `${days}d `;
  }
  if (hours > 0) {
    formattedTime += `${hours}h `;
  }
  if (minutes > 0) {
    formattedTime += `${minutes}m `;
  }
  if (secs > 0 || formattedTime === "") {
    formattedTime += `${secs < 10 ? "0" : ""}${secs}s`;
  }

  return formattedTime.trim();
};

const CountdownTimer = ({
  initialTime,
  onTimeUp,
}: {
  initialTime: number;
  onTimeUp: () => void;
}) => {
  const { targetTime, setTargetTime } = useTimerStore();
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    let newTargetTime = targetTime;
    if (newTargetTime === 0 || newTargetTime < Date.now()) {
      newTargetTime = Date.now() + initialTime * 1000;
      setTargetTime(newTargetTime);
    }

    const updateTimer = () => {
      const currentTime = Date.now();
      const remainingTime = Math.max(
        0,
        Math.floor((newTargetTime - currentTime) / 1000)
      );
      setTimeLeft(remainingTime);
      if (remainingTime <= 0) {
        onTimeUp();
        clearInterval(timer);
      }
    };

    const timer = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(timer);
  }, [initialTime, onTimeUp, targetTime, setTargetTime]);

  return (
    <div className="text-xl font-bold mb-4">
      Time Left: {formatTime(timeLeft)}
    </div>
  );
};

export default CountdownTimer;
