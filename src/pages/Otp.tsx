import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const [otp, setOtp] = useState<string>("");
  const emailStorage = localStorage.getItem("email");
  // const [otpConfirmation, setOtpConfirmation] = useState<string>("");

  const navigate = useNavigate();

  const otpInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setOtp(value);
  };

  const sendOtp = async (): Promise<boolean> => {
    const numberOtp = parseInt(otp);
    const url = "http://localhost:5000/email/otp";
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ otp: numberOtp, email: emailStorage }),
    };

    try {
      const response = await fetch(url, options);
      const res = await response.json();
      console.log(res);
      const { message, token } = res;
      if (message === "Login 200 OK") {
        console.log("ekseksui")
        localStorage.setItem('token', token)
        navigate("/home");
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
