import "./App.css";
import React, {useState, useEffect} from "react";
import BuySps from "./components/Views/BuySps";
import Profile from "./components/Views/Profile";
import HomePage from "./components/Views/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import History from "./components/Views/History";
import SellSps from "./components/Views/SellSps";
import BuyOffers from "./components/Views/BuyOffers";
import SellOffers from "./components/Views/SellOffers";
import BuyConfirm from "./components/Views/BuyConfirm";
function App() {
  
  return (
    <>
      <BrowserRouter>

        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/Buysps" element={<BuySps />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/History" element={<History />} />
          <Route path="/SellSps" element={<SellSps />} />
          <Route path="/BuyOffers" element={<BuyOffers />} />
          <Route path="/SellOffers" element={<SellOffers />} />
          <Route path={"/BuyConfirm"} element={<BuyConfirm/>} />
         
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
