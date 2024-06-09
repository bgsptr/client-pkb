// import { useState } from "react";
import Sidebar from "../components/Sidebar";
// import NavbarCalendar from "../components/NavbarCalendar.tsx";
import useDateDay from "../hooks/useDateDay";
import Notification from "../components/Notification";

const Dashboard = () => {
  const { rightComponentClicked, leftComponentClicked } = useDateDay();
  // const year = Number(localStorage.getItem("year"));
  // const month = Number(localStorage.getItem("month"));

  // const [getYear, setYear] = useState(year);
  // const [getMonth, setMonth] = useState(month);

  // bg-[#444444] relative z-10
  
  return (
    <div className="flex w-full h-screen ">
      {leftComponentClicked && <Sidebar />}
      <div className="flex flex-col basis-[70%] flex-auto">
        {/* <CalendarProvider> */}
        <>
          <div className={`${!leftComponentClicked ? `w-[72%]` : ""}`}>
            {/* <NavbarCalendar /> */}


            {/* <MyProfile /> */}
          </div>
        </>
        {/* </CalendarProvider> */}
      </div>
      {rightComponentClicked && <Notification />}
    </div>
  );
};

export default Dashboard;
