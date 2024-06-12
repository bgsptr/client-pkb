import logoSVG from "/public/dashboard/logo-eco.svg";
import heroPNG from "/public/dashboard/hero.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="h-screen w-full">
      {/* navbar */}
      <div className="flex w-full items-center">
        <img src={logoSVG} className="w-1/10" alt="" />
        <div className="flex justify-around items-center gap-x-2 w-3/5 mt-[-3rem] mr-[6rem]">
          <nav className="hover:border-b-2 border-black cursor-pointer transition-all">
            HOME
          </nav>
          <nav className="hover:border-b-2 border-black cursor-pointer transition-all">
            ABOUT US
          </nav>
          <nav className="hover:border-b-2 border-black cursor-pointer transition-all">
            PRICING
          </nav>
        </div>
        <Link to="/register" className="mt-[-3rem] text-white w-[8rem] rounded-full h-10 bg-[#000000] flex justify-center items-center">
          SIGN IN
        </Link>
      </div>
      {/* navbar */}

      {/* hero */}
      <div className="w-full mx-[3.5rem] flex">
        <div className="w-2/5 flex flex-col gap-y-7">
          <h1 className="text-[72px]">
            PLASTIC BOTTLE THAT <span className="text-[#89B33F]">EARN</span>{" "}
            MONEY.
          </h1>
          <p className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur, quisquam? Dignissimos molestiae neque enim reiciendis
            consequatur non, sequi nobis cum.
          </p>
          <Link to="/register" className="rounded-xl bg-black w-2/5 h-12 text-white flex justify-center items-center">
            Be A Member Now
          </Link>
        </div>
        <img src={heroPNG} alt="" className="w-1/2" />
      </div>
      {/* hero */}
    </div>
  );
};

export default LandingPage;
