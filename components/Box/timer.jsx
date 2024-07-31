import React, { useState, useEffect } from "react";
import "./timer.css";

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = (time) => {
    return String(time).padStart(2, "0");
  };

  return (
    <div>
      <div>
        {timeLeft.days !== undefined ? (
          <p>
            <div className="datee">
              <div className="bibb-container">
                <span className="bibb">{formatTime(timeLeft.days)}</span>{" "}
                <p className="date">Days</p>
              </div>
              <div className="bibb-container">
                <span className="bibb">{formatTime(timeLeft.hours)}</span>{" "}
                <p className="date">Hours</p>
              </div>
              <div className="bibb-container">
                <span className="bibb">{formatTime(timeLeft.minutes)}</span>{" "}
                <p className="date">Minutes</p>
              </div>
              <div className="bibb-container">
                <span className="bibb">{formatTime(timeLeft.seconds)}</span>{" "}
                <p className="date">Seconds</p>
              </div>
            </div>
          </p>
        ) : (
          <span>Time's up!</span>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;
