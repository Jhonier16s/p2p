import React, { useState, useEffect } from "react";
import "../../styles/History.css";
import Table from "../Table";
import TableSellOrders from "../TableSellOrders";
import TableSellOpenOrders from "../TableSellOpenOrders";
import TableEscrowerOrders from "../TableEscrowerOrders";
import TableHistoryOrders from "../TableSellHistoryOrders";
import web3Utils from '../../Utils/web-utils'

// Validar si es vendedor y mostrar otras vistas
const History = () => {
  const [viewSeller, setViewSeller] = useState(false);
  const [viewEscrower, setViewEscrower] = useState(false);

  useEffect(() => {

    async function isSeller() {
      const p2pContract = await new window.web3.eth.Contract(web3Utils.p2pAbi, '0x47fFb97892f263F7a37E74a0F5818A09a48296aF');
      await p2pContract.methods
        .isSeller(window.ethereum.selectedAddress)
        .call()
        .then(result => {
          setViewSeller(result)
        })
        .catch(err => {
          console.log(err)
          setViewSeller(false)
        });
    }
    async function isEscrower() {
      const p2pContract = await new window.web3.eth.Contract(web3Utils.p2pAbi, '0x47fFb97892f263F7a37E74a0F5818A09a48296aF');
      await p2pContract.methods
        .isAgentEscrower(window.ethereum.selectedAddress)
        .call()
        .then(result => {
          setViewEscrower(result)
        })
        .catch(err => {
          console.log(err)
          setViewEscrower(false)
        });
    }

    isSeller()
    isEscrower()
  }, []);
  
  return (
    <>
      <div className="History-Main-Container">
        <div className="History-Container">
         <h1 className="History-Tittle">HISTORIAL DE TRANSACCIONES - SPS</h1>
         <div className="History-Table-Container">
            <Table/>
         </div>
        </div>
      </div>
      {viewSeller ? 
        <div className="History-Main-Container">
          <div className="History-Container">
          <h1 className="History-Tittle">HISTORIAL DE COMPRAS/VENTAS</h1>
          <div className="History-Table-Container">
              <TableSellOrders />
          </div>
          </div>
        </div>
      : ""}
      {viewSeller ? 
        <div className="History-Main-Container">
          <div className="History-Container">
          <h1 className="History-Tittle">ORDENES ABIERTAS</h1>
          <div className="History-Table-Container">
              <TableSellOpenOrders />
          </div>
          </div>
        </div>
      : ""}
      {viewSeller ? 
        <div className="History-Main-Container">
          <div className="History-Container">
          <h1 className="History-Tittle">HISTORIA DE ORDENES</h1>
          <div className="History-Table-Container">
              <TableHistoryOrders />
          </div>
          </div>
        </div>
      : ""}
      {viewEscrower ? <div className="History-Main-Container">
        <div className="History-Container">
         <h1 className="History-Tittle">SOLICITUDES DE INTERVENCIÓN</h1>
         <div className="History-Table-Container">
            <TableEscrowerOrders />
         </div>
        </div>
      </div>:""}
    </>
  );
};

export default History;