import { ChangeEvent, useEffect, useState } from "react";
import SidebarGroup from "../../components/SidebarGroup";
import NavbarGroup from "../../components/NavbarGroup";
import { useAuth } from "../../hooks/useAuth";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TransactionData {
  month: string;
  price: number;
}

const MainMenu = () => {
  const { url } = useAuth();
  const token = localStorage.getItem("token");
  const thisYear = new Date().getFullYear();

  const [year, setYear] = useState<number | undefined>(thisYear);

  // const [idWallet, setIdWallet] = useState<string>("365210-satu-20240602");

  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = `${url}/wallets`;
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420"
          },
        };

        const response = await fetch(baseUrl, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.data);
        setBalance(data.data.balance);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const yearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    const numericRegex = /^[0-9]*$/;

    if (!numericRegex.test(value)) {
      setYear(undefined);
      e.target.value = "";
    } else {
      value.length <= 0 ? setYear(undefined) : setYear(parseInt(value));
    }
  };

  useEffect(() => {
    if (year) {
      getDataTransaction(year);
    }
  }, [year]);

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

  const [price, setPrice] = useState<TransactionData[]>([]);
  const initialPriceData: TransactionData[] = Array.from(
    { length: 12 },
    (_, index) => ({
      month: (index + 1).toString(),
      price: 0,
    })
  );

  const [priceDefault] = useState<TransactionData[]>(initialPriceData);

  const data = {
    labels: months,
    datasets: [
      {
        label: "Transaksi",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)", // Line color
        borderWidth: 2,
        pointBackgroundColor: "rgba(75,192,192,1)", // Point color
        data: price
          ? price.map((data) => data.price)
          : priceDefault.map((data) => data.price),
      },
    ],
  };

  // useEffect(() => {
  //   const sendTokenToESP32CAM = async () => {
  //     try {
  //       // const token = localStorage.getItem("token");
  //       const res = await fetch(`${esp_url}/api/token`, {
  //         method: "POST",
  //         headers: { "Content-Type": "text/plain" },
  //         body: token,
  //       });
  //       const response = res.json();
  //       console.log(response);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   sendTokenToESP32CAM();
  // }, []);

  const getDataTransaction = async (year: number) => {
    try {
      const baseUrl = `${url}/paid?year=${year}&role=member`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      };
      const response = await fetch(baseUrl, options);
      const data = await response.json();
      console.log(data);
      setPrice(data.data);
      // console.log(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  return (
    <div className="flex bg-gray-100 gap-x-6 p-4 h-screen overflow-y-auto">
      <SidebarGroup />
      <div className="flex-[80%] flex flex-col gap-y-4">
        <NavbarGroup />

        {/* Wallet Information */}
        <label htmlFor="cars">Choose a car:</label>

        <select name="cars" id="cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
        {/* Wallet Information */}

        {/* Balance Information */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-white shadow rounded-lg">
            <p>Current Balance</p>
            <p className="text-2xl font-semibold">Rp {balance}</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <p>Withdrawal</p>
            <p className="text-2xl font-semibold">Rp 0</p>
          </div>
          {/* <div className="p-4 bg-white shadow rounded-lg">
            <p>Current Balance</p>
            <p className="text-2xl font-semibold">Rp 3.000.000</p>
          </div> */}
        </div>
        {/* <div className="flex justify-between gap-4 mb-4">
          <div className="col-span-1 bg-white p-4 rounded shadow">
            <p className="font-bold text-lg">Card 1</p>
            <p className="text-sm text-gray-600">Content for card 1</p>
          </div>
          <div className="col-span-1 bg-white p-4 rounded shadow">
            <p className="font-bold text-lg">Card 2</p>
            <p className="text-sm text-gray-600">Content for card 2</p>
          </div>
          <div className="col-span-1 bg-white p-4 rounded shadow">
            <p className="font-bold text-lg">Card 3</p>
            <p className="text-sm text-gray-600">Content for card 3</p>
          </div>
          <div className="col-span-1 bg-white p-4 rounded shadow">
            <p className="font-bold text-lg">Card 4</p>
            <p className="text-sm text-gray-600">Content for card 4</p>
          </div>
        </div> */}

        <div className="bg-white p-4 rounded shadow w-2/3">
          <p className="font-bold text-lg mb-4">Chart</p>
          <Line className="" data={data} />
          <div className="flex flex-col ml-9">
            <label htmlFor="yearSelect">Enter Year:</label>
            <select id="yearSelect" value={year} onChange={yearChange}>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
