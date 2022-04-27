import React from "react";
import "../../styles/History.css";
import Table from "../Table";
const History = () => {
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
    </>
  );
};

export default History;
