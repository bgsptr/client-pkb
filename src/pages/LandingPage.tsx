import logo from "/public/dashboard/logo-memospace.png";
import bg from "/public/dashboard/background-lp.png";
import rules from "/public/dashboard/rules-book.png";
import will from "/public/dashboard/what-will.png";

import Checklist from "/public/dashboard/checklist.svg";
import Ellipse from "/public/dashboard/ellipse.svg";

const LandingPage = () => {
  return (
    <div className="relative font-poppins">
      {/* hero section */}
      <img src={bg} alt="background" className="absolute" />
      <div className="mx-20 absolute">
        <div className="flex justify-between mt-7 mb-20">
          <img src={logo} width={200} height={30} alt="logo" />
        </div>
        <div className="text-white w-1/2 flex flex-col gap-y-8 relative">
          <h1 className="bg-gradient-to-r from-[#F5F5F5] to-[#FFFDFF] inline-block text-transparent bg-clip-text font-bold text-[48px] leading-[3.5rem]">
            Share your College Experience
          </h1>
          <p className="text-sm">
            Campus Ambassador Program has been initiated to recognize smart and
            dedicated college students and prov ide them with adequate
            opportunities to learn the industry-relevant skills, while earning
            Cash rewards and certifications from our Industry-experts.
          </p>
          <div className="w-3/5 rounded-3xl bg-white h-9 flex justify-center items-center">
            <p className="text-[#666666] text-sm font-semibold">
              See All Activity Guidline
            </p>
          </div>
          {/* hero section */}
        </div>
      </div>

      <div className="absolute top-[550px] w-full">
        <div className="mx-20 bg-white h-20 rounded-2xl"></div>
      </div>

      {/* rules and guide section */}
      <div className="absolute top-[750px] w-full z-[100]">
        <div className="flex justify-center content-center w-full mb-9">
          <h3 className="text-white text-3xl font-semibold">
            Rules and Guidelines
          </h3>
        </div>
        <div className="mx-20 flex gap-x-7 text-white font-poppins">
          <img src={rules} alt="rules" className="w-2/5 flex flex-col" />
          <div className="flex flex-col gap-y-2">
            <h6 className="mb-4 font-semibold">Key Point</h6>
            <div className="flex items-center gap-x-2">
              <img src={Checklist} alt="checklist" />
              <p>Add maximum details to your answer</p>
            </div>
            <div className="flex items-center gap-x-2">
              <img src={Checklist} alt="checklist" />
              <p>
                There should be no plagiarism and negative content about the
                college
              </p>
            </div>
            <div className="flex items-center gap-x-2">
              <img src={Checklist} alt="checklist" />
              <p>Add maximum details to your answer</p>
            </div>
            <div className="flex items-center gap-x-2">
              <img src={Checklist} alt="checklist" />
              <p>
                There should be no plagiarism and negative content about the
                college
              </p>
            </div>
            <button
              type="submit"
              className="text-sm border rounded-lg border-white-200 px-4 py-2 w-1/2 mt-4"
            >
              Read Terms & Guidelines
            </button>
          </div>
        </div>
        {/* rules and guide section */}

        {/* what and will section */}
        <div className="absolute top-[315px] h-[900px] w-full bg-black z-[-1] font-poppins">
          <div className="absolute top-[150px] mx-20 flex flex-col gap-y-[4rem]">
            <h1 className="text-white font-semibold text-3xl">
              What will you be up to?
            </h1>
            <img src={will} alt="will" className="mx-[4rem] w-9/10" />
          </div>
          {/* what and will section */}

          {/* footer section */}
          <div className="absolute w-full top-[900px] text-white font-poppins bg-black py-9">
            <div className="mx-20 flex justify-between">
              <div className="flex flex-col justify-between">
                <div className="flex flex-col gap-y-9">
                  <img src={logo} alt="logo" className="w-4/5" />
                  <p className="text-md">Get started now try our product</p>
                </div>
              </div>
              <div className="flex gap-7 font-poppins text-sm">
                <div className="flex flex-col gap-y-7">
                  <p>Help and Solution</p>
                  <p>Talk to Support</p>
                  <p>Support Docs</p>
                  <p>System Status</p>
                  <p>Covid Responde</p>
                </div>
                <div className="flex flex-col gap-y-7">
                  <p>Product</p>
                  <p>Update</p>
                  <p>Security</p>
                  <p>Beta Test</p>
                  <p>Pricing Product</p>
                </div>
              </div>
            </div>
            <div className="mx-20 flex justify-between mt-9 font-poppins text-md">
              <p>© 2023 Rewards&Review Inc. Copyright and rights reserved</p>
              <div className="flex items-center gap-x-3">
                <p>Terms and Condtions</p>
                <span>
                  <img src={Ellipse} alt="ellipse" />
                </span>
                <p>Privacy Policy</p>
              </div>
            </div>
          </div>
          {/* footer section */}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
