"use client";

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
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  return (
    <div className="text-xl font-bold mb-4">
      Time Left: {formatTime(timeLeft)}
    </div>
  );
};

export default CountdownTimer;
