import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import SidebarGroup from "../components/SidebarGroup";
import NavbarGroup from "../components/NavbarGroup";
import RowList from "./RowList";
import { Routes, Route, useNavigate } from "react-router-dom"
import Report from "../components/Report";

const Home = () => {
  const thisYear = new Date().getFullYear();
  const [token] = useState(localStorage.getItem("token"));
  const [year, setYear] = useState(thisYear);
  const [price, setPrice] = useState([]);
  const [months] = useState([
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
  ]);

  const navigate = useNavigate();

  const getDataTransaction = async (year) => {
    try {
      const url = `http://localhost:5000/paid?year=${year}&role=member`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      setPrice(data.data);
      console.log(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    if (year) {
      getDataTransaction(year);
    }
  }, [year]);

  return (
    <div className="w-full h-screen">
      <div className="w-full h-full flex">
        <SidebarGroup />
        <div className="flex-[80%] border-2 h-full">
          <NavbarGroup />

          {/* component konten */}


          <div className="h-1/2 w-1/2 flex ml-9">
            <Line
              className=""
              data={{
                labels: months,
                datasets: [
                  {
                    label: "Transaksi",
                    backgroundColor: "#064FF0",
                    borderColor: "#064FF0",
                    data: price.map((data) => data.price),
                  },
                ],
              }}
            />
            <div className="flex flex-col ml-9">
              <label htmlFor="yearInput">Enter Year:</label>
              <input
                type="text"
                id="yearInput"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
          </div>

          {/* component konten */}
        </div>
      </div>
    </div>
  );
};

export default Home;
