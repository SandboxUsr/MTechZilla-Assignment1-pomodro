import React, { useState, useEffect } from "react";
import "../Styles/homepage.css";

export default function HomePage() {
  let [min, setMin] = useState(25);
  let [sec, setSec] = useState(0);
  let [timerRunning, setTimerRunning] = useState(false);
  let [timerStatus, setTimerStatus] = useState(true);

  let [breakMin, setBreakMin] = useState(5);
  let [breakSec, setBreakSec] = useState(0);

  useEffect(() => {
    let intervalId;
    let breakId;

    if(!timerStatus) {
      breakId = setInterval(() => {
        if (breakSec > 0) {
          setBreakSec(breakSec - 1);
        } 
        else if (breakMin > 0) {
          setBreakMin(breakMin - 1);
          setBreakSec(59);
        } 
        else {
          clearInterval(breakId);
        }
      }, 1000);
    }

    if (timerRunning) {
      intervalId = setInterval(() => {
        if (sec > 0) {
          setSec(sec - 1);
        } 
        else if (min > 0) {
          setMin(min - 1);
          setSec(59);
        }
        else if (min === 0 && sec === 0) {
          setTimerStatus(false);
        }  
        else {
          clearInterval(intervalId);
        }
      }, 1000);
    } 
    else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
      clearInterval(breakId);
    }
  }, [min, sec, timerRunning, timerStatus, breakMin, breakSec]);

  let handleStart = () => {
    setTimerRunning(true);
  };

  let handlePause = () => {
    setTimerRunning(false);
  };

  let handleReset = () => {
    setMin(25);
    setSec(0);
    setTimerRunning(false);
  };

  let handleFinalReset = () => {
    setMin(25);
    setSec(0);
    setTimerStatus(true);
    setTimerRunning(false);
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-500">
      {timerStatus ? <div className="main-timer-container flex flex-col items-center border border-solid border-gray-300 bg-gray-600 shadow-lg rounded-lg p-4 w-11/12 sm:w-3/4 md:w-2/4 lg:w-1/3 xl:w-1/4">
        <span className="text-4xl sm:text-5xl font-semibold mb-2 text-slate-300">Stopwatch Timer</span>
        <span className="text-5xl sm:text-6xl mb-4 text-white">{(min < 10) ? "0" + min : min}:{(sec < 10) ? "0" + sec : sec}</span>
        <div className="main-timer-buttons space-y-2">
          <button className="bg-red-500 text-white text-xl sm:text-2xl mx-5 px-4 py-2 rounded hover:bg-red-600" onClick={handleReset}>RESET</button>
          <button className="bg-blue-500 text-white text-xl sm:text-2xl mx-5 px-4 py-2 rounded hover:bg-blue-600" onClick={handlePause}>PAUSE</button>
          <button className="bg-green-500 text-white text-xl sm:text-2xl mx-5 px-4 py-2 rounded hover:bg-green-600" onClick={handleStart}>START</button>
        </div>
      </div> :
      <div className="break-timer-container flex flex-col items-center border border-solid border-gray-300 bg-gray-600 shadow-lg rounded-lg p-4 w-11/12 sm:w-3/4 md:w-2/4 lg:w-1/3 xl:w-1/4">
        <span className="text-4xl sm:text-5xl font-semibold mb-2 text-red-400 animated-text">Break Timer</span>
        <span className="text-5xl sm:text-6xl mb-4 text-white breaktime">{(breakMin < 10) ? "0" + breakMin : breakMin}:{(breakSec < 10) ? "0" + breakSec : breakSec}</span>
        <div className="main-timer-buttons space-y-2">
          <button className="bg-red-500 text-white text-xl sm:text-2xl mx-5 px-4 py-2 rounded hover:bg-red-600" onClick={handleFinalReset}>RESET</button>
        </div>
      </div>}
    </div>
  );
}