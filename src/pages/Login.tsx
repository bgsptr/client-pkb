import logo from "/public/dashboard/logo-memospace.png";

import bg from "/public/login/bg-login.png";
import googleLogo from "/public/login/google.svg";
import spotifyLogo from "/public/login/spotify.svg";
import eyeOpen from "/public/login/eye-open.svg";
import eyeClosed from "/public/login/eye-closed.svg";
import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [passHide, setPassHide] = useState(false);
  const [confirmHide, setConfirmHide] = useState(false);
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "", 
  })

  const passClick = (e) => {
    setPassHide(!passHide);
  };

  const confirmClick = (e) => {
    setConfirmHide(!confirmHide);
  };

  const handleInput = (e) => {
    setDataLogin(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const submitDataLogin = async (e) => {
    e.preventDefault();
    const baseUrl = "http://localhost:5000/login";
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataLogin)
    };
  
    try {
      const response = await fetch(baseUrl, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      localStorage.setItem('token', data.token);
      navigate("/image");
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  
  useEffect(() => {
    console.log(dataLogin);
  }, [dataLogin])

  return (
    <div className="h-screen w-full relative font-poppins">
      <div className="flex justify-between h-full">
        <div className="bg-black w-full h-full">dsad</div>
        <img src={bg} alt="bg" />
      </div>
      <div className="absolute top-4 w-full">
        {/* <img src={logo} alt="logo" className="mx-[6rem] mb-[2rem] w-1/6" /> */}
        <div className="flex justify-center">
          <div className="bg-[#FFFFFF] w-2/5 mt-[3rem] h-[27rem] rounded-md">
            <div className="mx-20 my-9 flex flex-col gap-y-3">
              <div className="flex flex-col gap-y-1">
                <label htmlFor="" className="text-[15px]">
                  Create Email
                </label>

                {/* component input email */}
                <div className="w-full h-10 rounded-lg bg-[#D9D9D9]">
                  <div className="flex justify-between mx-6 mt-2">
                    <div className="items-center w-full">
                      <input
                        type="text"
                        name="email"
                        className="bg-[#D9D9D9] outline-none text-sm items-center w-full"
                        placeholder="Masukkan email"
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                </div>
                {/* component input email */}
              </div>
              <div className="flex flex-col gap-y-1">
                <label htmlFor="" className="text-[15px]">
                  Create Password
                </label>

                {/* component input password */}
                <div className="w-full h-10 rounded-lg bg-[#D9D9D9]">
                  <div className="flex justify-between mx-6 mt-2">
                    <div className="items-center w-full">
                      <input
                        name="password"
                        type={passHide ? "password" : "text"}
                        className="bg-[#D9D9D9] outline-none text-sm items-center w-full"
                        placeholder="Masukkan password"
                        onChange={handleInput}
                      />
                    </div>
                    <button onClick={passClick} className="items-center">
                      {passHide ? (
                        <img src={eyeClosed} alt="" />
                      ) : (
                        <img src={eyeOpen} alt="" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={submitDataLogin}
                type="submit"
                className="bg-[#333333] w-full p-3 text-white text-md mt-2"
              >
                Submit
              </button>

              {/* form bawah */}
              <div className="flex flex-col gap-y-3 mt-5">
                {/* <div className="w-full bg-[#D9D9D9] p-1 flex justify-center rounded-3xl items-center gap-3">
                  <img src={googleLogo} alt="google-logo" />
                  <p className="text-sm">Continue with google</p>
                </div>
                <div className="w-full bg-[#D9D9D9] p-1 flex justify-center rounded-3xl items-center gap-3">
                  <img src={spotifyLogo} alt="spotify-logo" />
                  <p className="text-sm">Continue with spotify</p>
                </div> */}
              </div>
              {/* form bawah */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
