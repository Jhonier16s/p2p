import React from "react";
import "../styles/BuyConfirmCard.css";

const BuyConfirmCard = ({buy_sell}) => {

  return (
    <>
      <h1 className="BuyConfirm-Tittle">{buy_sell} SPS a Ramiro1502</h1>
      <div className="BuyConfirm-Order">
        <h4 className="BuyConfirm-Order-Tittle" >Número de orden</h4>
        <h4 className="BuyConfirm-Order-Tittle">48563174589354</h4>
      </div>
      <div className="BuyConfirm-Order">
        <h4 className="BuyConfirm-Order-Tittle">Fecha de creación</h4>
        <h4 className="BuyConfirm-Order-Tittle"> 2022-04-26</h4>
      </div>
      
      <div className="BuyConfirmCard-container">
        <div className="BuyConfirm-Info-Container">
          <div>
            <h2>Informacion de la orden</h2>
            <div className="BuyConfirm-Info">
              <div>
                <h3>Monto</h3>
                <h2 className="BuyConfirm-M">COL $ 300,000.00</h2>
              </div>
              <div>
                <h3>Precio</h3>
                <h2>COL $ 85,000,00</h2>
              </div>
              <div>
                <h3>Monto</h3>
                <h2>00032545 SPS</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="BuyConfirm-Transfer-Info-Container">
          <h2>
            Transfiere los fondos a la cuenta del vendedor que se porporciona a
            continación
          </h2>
          <div className="BuyConfirm-Transfer-Info">
            <h3>Cuenta de destino</h3>
            <div className="BuyConfirm-Info-R">
              <div className="BuyConfirm-Separator"></div>
              <div>
                <h2>Nombre completo</h2>
                <h3>JAIME QUINTERO QUINTERO</h3>
                <h2>ID Número</h2>
                <h3>73492898</h3>
                <h2>Nombre de Banco</h2>
                <h3>Bancolombia</h3>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2>
            Haga click para transferir los fondoss, haga clic en el botón
            “Tranferido, notificar al vendedor”.
          </h2>
          <div>
            <button className="BuyConfirm-btn">
              Completar
            </button>
            <button className="BuyConfirm-btn-cancel">Cancelar orden</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyConfirmCard;
