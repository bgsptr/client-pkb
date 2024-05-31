import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
// import { AuthProvider } from "./context/authContext";
import Maps from "./pages/Maps";
// import App from "./App";
// import { EventProvider } from "./context/EventContext";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Base from "./pages/Base";
import Register from "./pages/Register";
import Image from "./pages/Image";
import Transaction from "./pages/Transaction";
import Home from "./pages/Home";

const Root = () => {
  return (
    <Suspense>
        <Routes>
          {/* <AuthProvider> */}
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/image" element={<Image />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/home" element={<LandingPage />} />
          <Route path="/login" element={<Register />} />
          <Route path="/dashboard" element={<Base />} />
          <Route path="/register" element={<Login />} /> */}
          {/* </AuthProvider> */}
        </Routes>
    </Suspense>
  );
};

export default Root;
