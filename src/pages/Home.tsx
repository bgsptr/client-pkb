import { ChangeEvent, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import SidebarGroup from "../components/SidebarGroup";
import NavbarGroup from "../components/NavbarGroup";
// import RowList from "./RowList";
// import { Routes, Route, useNavigate } from "react-router-dom"
// import Report from "../components/Report";

interface TransactionData {
  month: string;
  price: number;
}

const Home = () => {
  const thisYear = new Date().getFullYear();
  const [token] = useState<string | null>(localStorage.getItem("token"));
  const [year, setYear] = useState<number | undefined>(thisYear);
  const [price, setPrice] = useState<TransactionData[]>([]);
  const [months] = useState<string[]>([
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

  // const navigate = useNavigate();

  const [baseUrl] = useState("https://ddd9-182-253-52-42.ngrok-free.app")

  const getDataTransaction = async (year: number) => {
    try {
      const url = `${baseUrl}/paid?year=${year}&role=member`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420"
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

  const yearChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const numericRegex = /^[0-9]*$/;

    if (!numericRegex.test(value)) {
      setYear(undefined)
      e.target.value = '';
    } else {
      value.length <= 0 ? setYear(undefined) : setYear(parseInt(value));
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
                onChange={yearChange}
              />
            </div>
            {/* <div className="flex flex-col ml-9">
              <label htmlFor="cars">Choose a car:</label>

              <select name="cars" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
            </div> */}
          </div>

          {/* component konten */}
        </div>
      </div>
    </div>
  );
};

export default Home;
