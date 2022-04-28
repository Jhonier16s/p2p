import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/NavBar.css";
import logo from "../assets/logosparlife.png"


const NavBar = () => {

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

            {
              (() => {
                if(typeof window.ethereum == 'undefined') { //Acá debe ir el if ya esta la global con la cuenta o no
                  return (
                    <li onClick={callMetamask} style={{cursor:"pointer"}}>
                      Conectar MetaMask
                    </li>
                  )
                } else {
                  return (
                    <li id="num_cuenta"></li>
                  )
                }
              })()
            }

          </ul>
      </div>
    </>
  );
};


// Web3 functions
async function callMetamask(){
  if (typeof window.ethereum !== 'undefined') {
    //console.log('MetaMask is installed!');
    getAccount();
    changeNetwork();
  }
  else{
    alert('Necesitas instalar MetaMask');
  }
}

async function getAccount(){
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  document.getElementById("num_cuenta").innerHTML=account.substring(0, 5)+"..."+account.substring(account - 4);
  //console.log(account);
}

async function changeNetwork(){
  if(window.ethereum.networkVersion !== '56'){ // 56 es la default para Binance
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
				chainId: "0x38",
				rpcUrls: ["https://bsc-dataseed.binance.org/"],
				chainName: "Smart Chain",
				nativeCurrency: {
					name: "Sparklife SPS",
					symbol: "SPS",
					decimals: 18
				},
				blockExplorerUrls: ["https://bscscan.com"]
      }]
    });
  }
}


export default NavBar;
