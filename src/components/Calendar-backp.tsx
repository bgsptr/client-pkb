import React, { useEffect, useState } from "react";

const Calendar = () => {
  const year = localStorage.getItem("year");
  const month = localStorage.getItem("month");

  const [yearSaved, setYearSaved] = useState(year);
  const [monthSaved, setMonthSaved] = useState(month);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [getDateDay, setDateDay] = useState({
    sun: [],
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
  });

  const [getAllDay, setAllDay] = useState([]);

  useEffect(() => {
    const date = new Date();
    const setMonth = date.getMonth() + 1;
    const setYear = date.getFullYear();
    localStorage.setItem("month", String(setMonth));
    localStorage.setItem("year", String(setYear));
  }, []);

  useEffect(() => {
    const allDays = [];
    const daysInMonth = new Date(Number(year), Number(month), 0);
    const lenDaysInMonth = daysInMonth.getDate();

    for (let i = 1; i <= lenDaysInMonth; i++) {
      allDays.push(i);
    }

    console.log(allDays)
    setAllDay(allDays);
  }, []);

  useEffect(() => {
    for (let k = 0; k < getAllDay.length; k++) {
      //   allDays.forEach((data) => {
      const dayInMonth = new Date(
        Number(year),
        Number(month) - 1,
        getAllDay[k]
      );
      const key = dayInMonth.getDay();
      let newKey;
      switch (key) {
        case 0:
          newKey = "sun";
          break;
        case 1:
          newKey = "mon";
          break;
        case 2:
          newKey = "tue";
          break;
        case 3:
          newKey = "wed";
          break;
        case 4:
          newKey = "thu";
          break;
        case 5:
          newKey = "fri";
          break;
        case 6:
          newKey = "sat";
          break;
        default:
          break;
      }

      setDateDay((prevDateDay) => ({
        ...prevDateDay,
        [newKey]: [...prevDateDay[newKey], getAllDay[k]],
      }));
    }
    // );
    // }
  }, [getAllDay]);

  useEffect(() => {
    console.log(getDateDay);
  }, [getDateDay]);

  return (
    <div>
      <div className="grid grid-cols-7 items-center border-b-2 w-full">
        {days.map((data) => (
          <div className="ml-[2.75rem]">{data}</div>
        ))}
      </div>
      {/* {getAllDay.map((i, data) =>
        i % 7 != 0 ? (
          <div className="flex justify-around items-center border-b-2 w-full">
            <div className="">{data + 1}</div>
          </div>
        ) : (
          <div>{data + 1}</div>
        )
      )}
      <div className="flex justify-around items-center border-b-2 w-full">
        {getAllDay.map((i, data) =>
          i % 7 != 0 ? (
            <div className="">{data + 1}</div>
          ) : (
            <div className="flex flex-wrap">
              <div className="">1</div>
            </div>
          )
        )}
      </div> */}

      {getAllDay.map((i, data) => {
        if (data % 7 == 0) {
          return (
            <div className="grid grid-cols-7 items-center border-b-2 w-full">
              {getAllDay.slice(data, data + 7).map((idx, datas) => (
                <div className="ml-[3rem] mb-[4.75rem]">{idx}</div>
              ))}
            </div>
          );
        }
      })}
    </div>
  );
};

export default Calendar;
