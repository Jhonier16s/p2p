import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/NavBar.css";
import logo from "../assets/logosparlife.png"
import Web3 from 'web3'

const NavBar = () => {

  callMetamask();

  return (
    <>
      <div className="NavBar-Main-container"> 
          <ul className="NavBar-container">
             <img src={logo} width="100px" height="60px" alt="logo"/> 
            <li>
              <NavLink className={({isActive}) => (isActive ? "active":"NavBar-item")} to="/BuySps">Comprar</NavLink>
            </li>
            <li>
              <NavLink className={({isActive}) => (isActive ? "active":"NavBar-item")} to="/SellSps">Vender</NavLink>
            </li>
            <li>
              <NavLink className={({isActive}) => (isActive ? "active":"NavBar-item")} to="/SellOffers">Oferta de Venta</NavLink>
            </li>
            <li>
              <NavLink className={({isActive}) => (isActive ? "active":"NavBar-item")} to="/BuyOffers">Oferta de Compra</NavLink>
            </li>
            <li>
              <NavLink className={({isActive}) => (isActive ? "active":"NavBar-item")} to="/History">Historial de transacciones</NavLink>
            </li>
            <li>
              <NavLink className={({isActive}) => (isActive ? "active":"NavBar-item")} to="/Profile">Perfil</NavLink>
            </li>

            <li id="num_cuenta"></li>

          </ul>
      </div>
    </>
  );
};


// Web3 functions
async function callMetamask(){
  if (typeof window.ethereum !== 'undefined') {
    //console.log('MetaMask is installed!');
    web3SetUp();
    getAccount();
    if(window.ethereum.networkVersion !== '97'){ // 56 es la default para Binance
      changeNetwork();
    }
  }
  else{
    window.web3 = null;
    alert('Necesitas instalar MetaMask');
  }
}

function web3SetUp() {
  window.web3 = new Web3(window.web3.currentProvider);
}

async function getAccount(){
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  document.getElementById("num_cuenta").innerHTML=account.substring(0, 5)+"..."+account.slice(-5);
  //console.log(account);
}

async function changeNetwork(){
  await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [{
      chainId: "0x61", // 97 - 0x38 = 56
      rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"], // https://bsc-dataseed.binance.org/
      chainName: "BNB Test Smart Chain",
      nativeCurrency: {
        name: "Sparklife SPS",
        symbol: "SPS",
        decimals: 18
      },
      blockExplorerUrls: ["https://testnet.bscscan.com"]
    }]
  });
}


export default NavBar;
