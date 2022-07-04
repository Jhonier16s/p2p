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
// import BuyConfirm from "./components/Views/BuyConfirm";
// import SellConfirm from "./components/Views/SellConfirm";
import BuySellConfirm from "./components/Views/BuySellConfirm";

function App() {

   const URL = "https://sps-p2p.herokuapp.com/trades.json";

  const [trades, setTrades] = useState([]);
  useEffect(() => {
    getTrades();
  }, []);

  function getTrades() {
    fetch(URL)
      .then((res) => res.json())
      .then((response) => {
        const data = response;
        /* console.log(response); */
        setTrades(data);
      });
  } 
  
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
          <Route path={"/BuyConfirm/:id/:seller/:swBuyOrSell"} element={<BuySellConfirm />} />
          <Route path={"/SellConfirm/:id/:seller/:swBuyOrSell"} element={<BuySellConfirm />} />
         
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
