import React, { useEffect, useRef, useState } from "react";
import useDateDay from "../hooks/useDateDay";

import close from "/public/modal/close.svg";
import search from "/public/modal/search.svg";

const Calendar = () => {
  const {
    monthToString,
    getYear,
    getMonth,
    setMonth,
    setYear,
    leftComponentClicked,
  } = useDateDay();

  const [calendarDateNow, setCalendarDateNow] = useState({
    year: getYear,
    month: monthToString[getMonth - 1],
    date: 0,
  });

  const [dateValue, setDateValue] = useState("");
  const [dateDays, setDateDays] = useState([]);

  const [daysAWeek] = useState([
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ]);

  const inputRef = useRef([]);

  const [modal, setModal] = useState(false);

  const getCalenderDate = (e) => {
    const theDate = e.target.getAttribute("data-value");
    console.log(theDate);
    if (theDate == "") return;
    setModal(!modal);
    // setCalendarDateNow(data => ({
    //   ...data,
    //   date: theDate
    // }));
    const dateString = `${theDate} ${monthToString[getMonth - 1]} ${getYear}`;
    setDateValue(dateString);
  };

  useEffect(() => {
    const daysInMonth = new Date(getYear, getMonth, 0).getDate();
    const firstDayOfMonth = new Date(getYear, getMonth - 1, 1).getDay();

    const days = [];
    let dayCounter = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDayOfMonth) || dayCounter > daysInMonth) {
          week.push("");
        } else {
          week.push(dayCounter++);
        }
      }
      days.push(week);
      if (dayCounter > daysInMonth) break;
    }

    setDateDays(days);
  }, [getYear, getMonth]);

  // useEffect(() => {
  //   console.log("aa: ", dateDays);
  //   console.log();
  // }, [dateDays]);

  useEffect(() => {
    console.log(calendarDateNow);
  }, [calendarDateNow]);

  return (
    <div>
      {modal && (
        <div className="absolute z-[10] bg-white shadow-md rounded-lg left-[20%] w-1/2 top-2 bottom-2 h-9/10 font-popins">
          <div className="flex items-center justify-between p-7">
            <h1 className="text-2xl">CREATE EVENTS</h1>
            <button onClick={(e) => setModal(false)}>
              <img src={close} alt="close" />
            </button>
          </div>
          <form action="" className="flex flex-col gap-y-5 mx-7 my-4">
            <div className="">
              <label htmlFor="">Event Name</label>
              <input type="text" className="w-full shadow-md p-2" />
            </div>
            <div className="flex gap-x-3">
              <div className="basis-1/2">
                <label htmlFor="">Date</label>
                <input
                  type="text"
                  className="w-full shadow-md p-2"
                  value={dateValue}
                />
              </div>
              <div className="basis-1/4">
                <label htmlFor="">Time Start</label>
                <input type="text" className="w-full shadow-md p-2" />
              </div>
              <div className="basis-1/4">
                <label htmlFor="">Time End</label>
                <input type="text" className="w-full shadow-md p-2" />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Location</label>
              <div className="flex gap-x-3">
                <input type="text" className="w-1/2 shadow-md p-2 rounded-md" />
                <button className="bg-[#1DAEEF] w-10 h-10 rounded-md flex flex-col items-center justify-center">
                  <img src={search} alt="search" className="w-5/6 m-1 h-2/3" />
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Add guests</label>
              <input type="text" className="w-1/2 shadow-md p-2" />
            </div>
            <div className="">
              <label htmlFor="">Description</label>
              <textarea className="w-full shadow-md p-1 resize-none" />
            </div>
            <div className="flex flex-col items-end">
              <button className="p-2 bg-[#1DAEEF] w-1/4 text-white text-md">Save</button>
            </div>
          </form>
        </div>
      )}
      <div className="grid grid-cols-7 items-center border-b-2 w-full">
        {daysAWeek.map((day, index) => (
          <div key={index} className="ml-[2.75rem]">
            {day}
          </div>
        ))}
      </div>
      {dateDays.map((week, weekIndex) => (
        <div
          key={weekIndex}
          className="grid grid-cols-7 items-center border-b-2 w-full"
        >
          {week.map((day, dayIndex) => (
            <div
              key={dayIndex}
              data-value={`${day}`}
              onClick={getCalenderDate}
              className={`ml-[3rem] h-full relative border-r-2 ${
                dateDays[0].indexOf(1) >= 5
                  ? `mb-[3.7rem] top-7`
                  : `mb-[4.75rem] top-9`
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
