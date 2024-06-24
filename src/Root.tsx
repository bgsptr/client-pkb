import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
// import { AuthProvider } from "./context/authContext";
// import App from "./App";
// import { EventProvider } from "./context/EventContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Image from "./pages/Image";
import Transaction from "./pages/Transaction";
import Home from "./pages/Home";
import Otp from "./pages/Otp";
import LandingPage from "./pages/LandingPage";
import { AuthenticationProvider } from "./context/AuthenticationContext";
// import RoleBasedRoutes from "./components/RoleBasedRoutes";
import ManageUser from "./pages/ManageUser";
// import PrivateRoutes from "./pages/PrivateRoutes";

const Root = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthenticationProvider>
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route element={<PrivateRoutes />}> */}
          {/* <Route element={<RoleBasedRoutes allowedRoles={["admin"]} />}> */}
            <Route path="/image" element={<Image />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/home" element={<Home />} />
            <Route path="/manage_access" element={<ManageUser />} />
          {/* </Route> */}

          <Route path="/user" element={<} />
{/* 
          <Route element={<RoleBasedRoutes allowedRoles={["member"]} />}> */}
            <Route path="/" element={<LandingPage />} />
          {/* </Route> */}

          {/* <Route element={<RoleBasedRoutes allowedRoles={[""]} />}> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          {/* </Route> */}

          <Route path="/otp" element={<Otp />} />
          {/* </Route> */}
          {/* <Route path="/home" element={<LandingPage />} />
          <Route path="/login" element={<Register />} />
          <Route path="/dashboard" element={<Base />} />
          <Route path="/register" element={<Login />} /> */}
        </Routes>
      </AuthenticationProvider>
    </Suspense>
  );
};

export default Root;
