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
import SidebarGroup from "../components/SidebarGroup";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import "chart.js/auto";
import NavbarGroup from "../components/NavbarGroup";
import { useAuth } from "../hooks/useAuth";
import close from "/public/modal/close.svg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface UserData {
  email: string;
  password: string;
  fname: string;
  lname: string;
}

const ManageUser = () => {
  const [userData, setData] = useState<UserData | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);

  const { url } = useAuth();

  const dataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => {
      if (prevData === null) {
        return {
          email: "",
          password: "",
          fname: "",
          lname: "",
          [name]: value,
        } as UserData;
      }

      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const token = localStorage.getItem("token");

  const dataSend = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const baseUrl = `${url}/register`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    };

    try {
      const req = async () => {
        const res = await fetch(baseUrl, options);
        const response = await res.json();
        console.log(response);
      };

      req();
    } catch (err) {
      console.error(err);
    }
  };

  const [modal, setModal] = useState(false);

  const clickCRUD = () => {
    setModal(!modal);
  };

  useEffect(() => {
    const baseUrl = `${url}/admins`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const req = async () => {
        const res = await fetch(baseUrl, options);
        const response = await res.json();
        console.log(response);
        const usersArray = Object.keys(response.message).map((key) => ({
          email: key,
          ...response.message[key],
        }));
        setUsers(usersArray);
      };

      req();
    } catch (err) {
      console.error(err);
    }
  }, [url, token]);

  return (
    <div className="flex bg-gray-100 gap-x-6 p-4 h-screen overflow-y-auto">
      {/* modal */}

      {modal && (
        <div className="fixed z-[10] bg-slate-300 shadow-md rounded-lg left-1/4 w-1/2 top-2 bottom-2 h-9/10 font-popins">
          <div className="flex items-center justify-between p-7">
            <h1 className="text-2xl">CREATE ACCOUNT</h1>
            <button onClick={() => setModal(false)}>
              <img src={close} alt="close" />
            </button>
          </div>
          <form action="" className="flex flex-col gap-y-5 mx-7 my-4">
            <div className="">
              <label htmlFor="">Email</label>
              <input
                type="email"
                name="email"
                onChange={dataChange}
                className="w-full shadow-md p-2"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="">First Name</label>
              <div className="flex gap-x-3">
                <input
                  type="text"
                  className="w-1/2 shadow-md p-2 rounded-md"
                  name="fname"
                  onChange={dataChange}
                />
                {/* <button className="bg-[#1DAEEF] w-10 h-10 rounded-md flex flex-col items-center justify-center">
                    <img src={search} alt="search" className="w-5/6 m-1 h-2/3" />
                  </button> */}
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Last Name</label>
              <input
                type="text"
                className="w-1/2 shadow-md p-2"
                name="lname"
                onChange={dataChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Password</label>
              <input
                type="text"
                className="w-1/2 shadow-md p-2"
                name="password"
                onChange={dataChange}
              />
            </div>
            <div className="flex flex-col items-end">
              <button
                className="p-2 bg-[#1DAEEF] w-1/4 text-white text-md"
                onClick={dataSend}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* modal */}
      <SidebarGroup />
      <div className="flex-[80%] flex flex-col gap-y-4">
        <NavbarGroup />

        {/* iam */}
        <div className="container mx-auto">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                All Users: {users.length}
              </h2>
              <button
                onClick={clickCRUD}
                className="mt-2 p-2 bg-blue-500 text-white rounded"
              >
                Add new user
              </button>
            </div>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="w-1/12 py-2">Email</th>
                  <th className="w-1/6 py-2">Role</th>
                  <th className="w-1/12 py-2">Status</th>
                  <th className="w-1/6 py-2">Date Created</th>
                  <th className="w-1/12 py-2">First Name</th>
                  <th className="w-1/12 py-2">Last Name</th>
                  <th className="w-1/6 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 &&
                  users.map((user, index) => (
                    <tr key={index} className="text-center border-t">
                      <td className="py-2">{user.email}</td>
                      <td className="py-2">{"Administrator"}</td>
                      <td className="py-2 text-green-500">{"Active"}</td>
                      {/* <td className="py-2">{user.created_at}</td> */}
                      <td className="py-2">{"2024-03-01"}</td>
                      <td className="py-2">{user.fname}</td>
                      <td className="py-2">{user.lname}</td>
                      <td className="py-2">
                        {/* <input type="checkbox" className="form-checkbox" /> */}
                        <button className="btn btn-sm btn-outline-primary">
                          ✎
                        </button>
                        <button className="btn btn-sm btn-outline-danger">🗑</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="p-4 border-t flex justify-between">
              <div>
                <button className="p-2 bg-gray-200 rounded mr-2">
                  Suspend all
                </button>
                <button className="p-2 bg-gray-200 rounded mr-2">
                  Archive all
                </button>
                <button className="p-2 bg-gray-200 rounded">Delete all</button>
              </div>
              <div>
                Rows per page:
                <select className="ml-2 p-1 border rounded">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* iam */}
      </div>
    </div>
  );
};

export default ManageUser;
