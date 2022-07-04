import React from "react";
import "../../styles/Profile.css";
import Card from "../Card";
import Lists from "../Lists";
import web3Utils from '../../Utils/web-utils'

const Profile = () => {
  async function WithdrawFunds() {
    const p2pContract = await new window.web3.eth.Contract(web3Utils.p2pAbi, '0x47fFb97892f263F7a37E74a0F5818A09a48296aF');
    return await p2pContract.methods
      .WithdrawFunds()
      .send({ value: '0', from: window.ethereum.selectedAddress })
      .on('transactionHash', hash => {
        console.log(hash)
      })
      .on('transactionHash', () => {
        console.log("Pending transaction... please wait")
      })
      .on('error', (err) => {
        console.log(err);
      })
      .then(receipt => {
        console.log(receipt);
        window.alert("La ha completado la solicitud correctamente"); 
      })
  }

  return (
    <>
      <h1 className="Profile-tittle">Perfil</h1>
      <div className="Profile-container">
        <div className="Profile-card1">
          <br/>
          <h1>Retirar Fondos</h1>
          <button onClick={() => WithdrawFunds()} className="button">Solicitar</button>
          <h1>Calification</h1>
          <Lists />
          <Lists />
          <h5>Most Califications</h5>
        </div>
        <div className="Profile-card2">
          <h1>Reviews</h1>
          <div className="Cards-container">
            <div className="Cards-container-top">
              <Card/>
              <Card/>
            </div>
            <div className="Cards-container-bot">
              <Card/>
              <Card/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
