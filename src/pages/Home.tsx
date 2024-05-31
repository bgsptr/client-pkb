import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import SidebarGroup from "../components/SidebarGroup";
import NavbarGroup from "../components/NavbarGroup";
import RowList from "./RowList";

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
          <RowList>
            <p>This is the first item.</p>
            <p>This is the second item.</p>
            <p>This is the third item.</p>
          </RowList>
          {/* for example change this component base on component when i go to /transaction it will show <Transaction /> elif /dashboard it will show code comment below */}
          {/* <div className="h-1/2 w-1/2 flex ml-9">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
