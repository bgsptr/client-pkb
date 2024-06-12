import { Link } from "react-router-dom";
import sidebarFix from "/public/dashboard/sidebarfix.svg";
import userVector from "/public/dashboard/user-vector.svg";
import { useAuth } from "../hooks/useAuth";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { User } from "../context/AuthenticationContext";
import axios from "axios";

interface Error {
  message: string;
}

// interface Message {

// }

const Register = () => {
  const { user, setUser, url } = useAuth();
  const [msg, setMsg] = useState<Error | null>(null);
  //   const [error, setError] = useState<Message | null>(null);

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...(prevUser as User),
      [name]: value,
    }));
  };

  const sendDataUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await axios.post(`${url}/register`, user);
      const res = response?.data;
      console.log(res);
      if (res.error != null) {
        res.message = "data already exist";
      }
      setMsg(res);
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="flex w-full h-screen">
      <img src={sidebarFix} alt="" />
      <form
        onSubmit={sendDataUser}
        className="flex flex-col gap-y-4 w-[30%] mx-[20%] my-1/4 justify-center"
        autoComplete="off"
      >
        {msg && <div>{msg.message}</div>}
        <h3 className="text-2xl font-bold">Daftar</h3>
        <div className="rounded-xl bg-[#E0E0E0] p-2 flex gap-x-2">
          <img src={userVector} alt="" className="m-2" />
          <input
            type="text"
            name="email"
            className="bg-inherit outline-none"
            placeholder="Email"
            value={user?.email || ""}
            onChange={changeInput}
          />
        </div>
        <div className="rounded-xl bg-[#E0E0E0] p-2 flex gap-x-2">
          <img src={userVector} alt="" className="m-2" />
          <input
            type="text"
            name="fname"
            className="bg-[#E0E0E0] outline-none"
            placeholder="First Name"
            value={user?.fname || ""}
            onChange={changeInput}
          />
        </div>
        <div className="rounded-xl bg-[#E0E0E0] p-2 flex gap-x-2">
          <img src={userVector} alt="" className="m-2" />
          <input
            type="text"
            name="lname"
            className="bg-[#E0E0E0] outline-none"
            placeholder="Last Name"
            value={user?.lname || ""}
            onChange={changeInput}
          />
        </div>
        <div className="rounded-xl bg-[#E0E0E0] p-2 flex gap-x-2">
          <img src={userVector} alt="" className="m-2" />
          <input
            type="password"
            name="password"
            className="bg-[#E0E0E0] outline-none"
            placeholder="Password"
            value={user?.password || ""}
            onChange={changeInput}
          />
        </div>
        {/* <div className="rounded-xl bg-[#E0E0E0] p-2 flex gap-x-2">
          <img src={userVector} alt="" className="m-2" />
          <input
            type="password"
            name="confirmPassword"
            className="bg-[#E0E0E0] outline-none"
            placeholder="Confirm Password"
          />
        </div> */}
        <button className="mt-6 text-white w-[8rem] rounded-full h-10 bg-[#000000] flex justify-center items-center">
          Daftar
        </button>
        <p className="text-md">
          Sudah memiliki akun?
          <Link to="/login" className="ml-3 text-[#955901]">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
