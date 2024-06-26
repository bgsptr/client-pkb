import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Otp = () => {
  const [otp, setOtp] = useState<string>("");
  const emailStorage = localStorage.getItem("email");
  // const [otpConfirmation, setOtpConfirmation] = useState<string>("");

  const navigate = useNavigate();

  const otpInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setOtp(value);
  };

  const { url } = useAuth();

  const sendOtp = async (): Promise<boolean> => {
    const numberOtp = parseInt(otp);
    const baseUrl = `${url}/email/otp`
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ otp: numberOtp, email: emailStorage }),
    };

    try {
      const response = await fetch(baseUrl, options);
      const res = await response.json();
      console.log(res);
      const { message, token } = res;
      if (message === "Login 200 OK") {
        console.log("ekseksui");
        localStorage.setItem('token', token);
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const obj = JSON.parse(jsonPayload);
        const roles = obj.role;
        console.log(roles)
        localStorage.removeItem('email');
        for (const i in roles) {
          if (roles[i] == "admin") {
            navigate("/home");
          } else {
            navigate("/menu");
          }
        }
      }
      // setOtpConfirmation(res);
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  useEffect(() => {
    const verifyOtp = async () => {
      const res = await sendOtp();
      if (otp.toString.length !== 6) return;
      if (res) {
        console.log("ekseksui")
        navigate("/home");
      }
    };
    verifyOtp();
  }, [otp]);

  

  return (
    <div className="w-full h-full">
      {/* Form otp */}
      <div className="w-full h-full flex justify-center items-center flex-col">
        <h3 className="text-2xl font-medium">Two Factor Authentication</h3>
        <form action="" className="border-2 border-gray-400 w-1/4 h-1/6 p-4">
          <div className="flex gap-y-2 flex-col">
            <label className="">Authentication Code</label>
            <input
              type="text"
              className="p-1 mb-4"
              name="otp"
              onChange={otpInput}
            />
            <button className="bg-[#008000] p-1.5 text-white">Verify</button>
          </div>
        </form>
      </div>

      {/* Form otp */}
    </div>
  );
};

export default Otp;
