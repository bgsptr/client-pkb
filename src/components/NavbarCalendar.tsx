import { useEffect } from "react";
import useDateDay from "../hooks/useDateDay";
import popup from "/public/dashboarddd/atas.svg";
import leftChev from "/public/dashboarddd/left-chev.svg";
import rightChev from "/public/dashboarddd/right-chev.svg";

const NavbarCalendar = () => {
  const {
    monthToString,
    getMonth,
    getYear,
    setYear,
    setMonth,
    leftComponentClicked,
    setLeftComponentClicked,
    rightComponentClicked,
    setRightComponentClicked,
  } = useDateDay();

  const clickPrevNext = (e) => {
    console.log(e.target.alt);
    if (e.target.alt === "prev") {
      setMonth(getMonth - 1);
      if (getMonth < 2) {
        setYear(getYear - 1);
        setMonth(12);
      }
    } else {
      setMonth(getMonth + 1);
      getMonth >= 12 && setYear(getYear + 1);
      if (getMonth > 11) {
        setYear(getYear + 1);
        setMonth(1);
      }
    }
  };

  const leftPopup = (e) => {
    setLeftComponentClicked(!leftComponentClicked);
  };

  const rightPopup = (e) => {
    setRightComponentClicked(!rightComponentClicked);
  };

  // useEffect(() => {
  //   console.log(getMonth);
  // }, [getMonth])

  return (
    <div className="w-full border-b-gray border-b-2 text-md">
      <div className="w-full flex items-center gap-x-12">
        <button onClick={leftPopup}>
          <img className="my-5 ml-10" src={popup} />
        </button>
        <p>Dashboard/calendar</p>
        <div className="flex items-center gap-x-6">
          <button onClick={clickPrevNext}>
            <img src={leftChev} alt="prev" className="outline-none" />
          </button>
          <button onClick={clickPrevNext}>
            <img src={rightChev} alt="next" className="outline-none" />
          </button>
          <p className="ml-5">
            {monthToString[getMonth - 1]} {getYear}
          </p>
        </div>
        <div className="absolute flex items-center right-[20rem] gap-x-[3rem]">
          <div className="border-slate-300 border-2 h-7 w-[10rem]"></div>
          <button onClick={rightPopup}>
            <img className="my-5 mr-7" src={popup} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavbarCalendar;
