import React, { useEffect, useState } from "react";
import "../../styles/BuyConfirm.css";
import BuySellConfirmCard from "../BuySellConfirmCard";
import arrow from "../../assets/right-arrow.png";
import { useParams } from "react-router-dom";
import web3Utils from '../../Utils/web-utils'

const BuySellConfirm = () => {
  /*  console.log(useParams()); */
  const { id, seller, swBuyOrSell } = useParams();
  /* console.log(id); */

  const [getId, setId] = useState(id);
  const [sellerAddress, setSeller] = useState(seller);
  const [getTrade, setTrade] = useState({});
  const parseList = (response) => {
    try {
      let result = {}
      result["id"] = parseInt(response[4])
      result["seller"] = response[0]
      result["escrowerAgent"] = response[1]
      result["pricetrade"] = response[6]/1000000000000000000
      result["ammount"] = response[2]/1000000000000000000
      result["status_trade"] = window.web3.utils.toAscii(response[3])
      result["extra_info_payment"] = window.web3.utils.toAscii(response[5])
      result["typetrade"] = "Buy"
      result["coin"] = "SPS"
      result["city"] = "a"
      result["country_id"] = 1
      result["currency"] = "COP"
      result["user_first"] = ""
      result["user_second"] = ""
      result["payment_method_id"] = 1
      result["created_at"] = "2022-04-28T17:38:52.347Z"
      result["updated_at"] = "2022-04-28T17:38:52.347Z"
      return result 
    } catch (err) {
      console.log(err)
      return [] 
    }
  }

  useEffect(() => {
    const getData = async () => {
      const p2pContract = await new window.web3.eth.Contract(web3Utils.p2pAbi, '0x47fFb97892f263F7a37E74a0F5818A09a48296aF');
      return await p2pContract.methods
        .getSpecificSellOrBuyTransaction(sellerAddress, id)
        .call()
        .then(result => {
          console.log(result);
          setTrade(parseList(result));
        })
        .catch(err => {
          console.log(err);
        });
    }
    getData();
  }, []);

  // const getData = async () => {
  //   const data = await fetch(`https://sps-p2p.herokuapp.com/trades/${id}.json`);
  //   const trades = await data.json();
  //   trades.ammount = 100
  //   setTrade(trades);
  //   setId(trades.id);
  //   console.log(trades);
  // };
  debugger

  return (
    <>
      <div className="Buy-Confirm-Container">
        <div className="Buy-Confirm-CARD-Container">
          <BuySellConfirmCard back_to={swBuyOrSell==0?"/BuySps":"/SellSps"} complete="Confirmar transacción"idTrade={id} date={new Date().toString()} buy_sell={"Comprar"} one_pridetrade={getTrade.pricetrade} trade_extra_info_payment={getTrade.extra_info_payment} seller={sellerAddress} trade={getTrade} swBuyOrSell={swBuyOrSell} />
        </div>
        <div className="Buy-Confirm-Steps-Container">
          <h3>Pasos para que se apruebe la compra</h3>
          <div className="Buy-Confirm-Steps">
            <h5 className="Buy-Confirm-Steps-Text">
              1 Transferir pago al vendedor
            </h5>
            <h5 className="Buy-Confirm-Steps-Text">2 Se intercambia el SPS</h5>
            <h5 className="Buy-Confirm-Steps-Text">3 Completado</h5>
          </div>
          <div className="Buy-Confirm-User-Container">
            <div className="Buy-Confirm-User">
              <div className="Buy-Confirm-User-Ico">
                <h1>R</h1>
              </div>
              <div>
                <h2 className="Buy-Confirm-UserName">{sellerAddress.substring(0, 5)+"..."+sellerAddress.slice(-5)}</h2>
                <h5 className="Buy-Confirm-UserName">Comerciante verificado</h5>
              </div>
            </div>
            <div className="Buy-Confirm-Text-Container">
              <div className="Buy-Confirm-Text">
                <p className="Buy-Card-R-Text">
                  La orden fue realiza con éxito. Por favor realice el pago
                  dentro del tiempo límite.
                </p>
              </div>
              <div className="Buy-Confirm-Text2">
                <p className="Buy-Card-R-Text">
                  {getTrade.extra_info_payment}
                </p>
              </div>
              <div className="Buy-Confirm-Text3">
                <div className="Buy-Confirm-Input-Container">
                  <input
                    className="Buy-Confirm-Input"
                    type="text"
                    placeholder="Escriba un mensaje"
                  />
                  <img className="Buy-Confirm-Send" src={arrow} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuySellConfirm;
