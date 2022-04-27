import React from "react";
import HomePageCard from "../HomePageCard";
import user from "../../assets/user.png";
import money from "../../assets/money-transfer.png";
import dollar from "../../assets/dollar.png";
import percent from "../../assets/percent.png";

const HomePage = () => {

  verifyMetamask();
  getAccount();
  changeNetwork();

  return (
    <>
      <HomePageCard img1={user} name1="Perfil" name2="Historial" img2={money} link1="/Profile" link2="/History"/>
      <HomePageCard img1={dollar} name1="Vender Sparklife" name2="Comprar Sparklife" img2={dollar} link1="/SellSps" link2="/BuySps" />
      <HomePageCard img1={percent} name1="Nueva Oferta de compra" name2="Nueva oferta de venta" img2={percent}  link1="/BuyOffers" link2="/BuyOffers" />
    </>
  );
};

async function verifyMetamask(){
  if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
  }
  else{
    console.log('MetaMask not installed!');
  }
}

async function getAccount(){
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  console.log(account);
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



export default HomePage;
