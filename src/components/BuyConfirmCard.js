import React, { useState, useEffect } from "react";
import "../styles/BuyConfirmCard.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import web3Utils from '../Utils/web-utils'

const BuyConfirmCard = ({
  buy_sell,
  date,
  idTrade,
  complete,
  one_pridetrade,
  trade_extra_info_payment,
  back_to,
  seller,
  trade,
}) => {
  const { id } = useParams();
  /* console.log(id); */

  const [getId, setId] = useState(id);
  const [getTrade, setTrade] = useState({});

  useEffect(() => {
    setTrade(trade);
  }, []);

  const handlePut = async () => {
    const p2pContract = await new window.web3.eth.Contract(web3Utils.p2pAbi, '0x47fFb97892f263F7a37E74a0F5818A09a48296aF');
    return await p2pContract.methods
      .offertEscrow(
        seller,
        id
      )
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
        window.alert("Se ha completado la transacción, puedes verificarla en tu historial de transacciones");
      })
  };

  return (
    <>
      <h1 className="BuyConfirm-Tittle">{buy_sell} SPS a {seller.substring(0, 5)+"..."+seller.slice(-5)}</h1>
      <div className="BuyConfirm-Order">
        <h4 className="BuyConfirm-Order-Tittle">Número de orden:</h4>
        <h4 className="BuyConfirm-Order-Tittle">{idTrade}</h4>
      </div>
      <div className="BuyConfirm-Order">
        <h4 className="BuyConfirm-Order-Tittle">Fecha de creación</h4>
        <h4 className="BuyConfirm-Order-Tittle"> {date}</h4>
      </div>

      <div className="BuyConfirmCard-container">
        <div className="BuyConfirm-Info-Container">
          <div>
            <h2>Informacion de la orden</h2>
            <div className="BuyConfirm-Info">
              <div>
                <h3>Monto</h3>
                <h2 className="BuyConfirm-M">{trade.ammount} SPS</h2>
              </div>
              <div>
                <h3>Precio por SPS</h3>
                <h2>{trade.pricetrade} COP</h2>
              </div>
              <div>
                <h3>Total</h3>
                <h2>{trade.pricetrade*trade.ammount} COP</h2>
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
                <h3>{trade_extra_info_payment}</h3>
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
            <button onClick={handlePut} className="BuyConfirm-btn">
              {complete}
            </button>
            <Link to={back_to}>
              <button className="BuyConfirm-btn-cancel">Cancelar orden</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyConfirmCard;
