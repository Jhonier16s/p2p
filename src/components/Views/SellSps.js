import React, { useState, useEffect } from "react";
import OptionsBar from "../OptionsBar";
import Offers from "../Offers";
import web3Utils from '../../Utils/web-utils'
// import { Audio } from  'react-loader-spinner'

const SellSps = () => {
  const [buyTrades, setBuyTrades] = useState([]);
  var isLoading = true
  // Listado tipo sell typetrade=1 - para usuario final comprar
  const parseList = (response) => {
    let result = []
    let totalRows = response[0].length

    for(let i = 0; i < totalRows; i++){
      if(response[2][i] != 0) {
        result[i] = {}
        result[i]["id"] = parseInt(response[4][i])
        result[i]["typetrade"] = "Sell"
        result[i]["coin"] = "SPS"
        result[i]["city"] = "dwad"
        result[i]["country_id"] = 1
        result[i]["currency"] = "COP"
        result[i]["user_first"] = ""
        result[i]["user_second"] = ""
        result[i]["payment_method_id"] = 1
        result[i]["extra_info_payment"] = "Nequi"
        result[i]["status_trade"] = window.web3.utils.toAscii(response[3][i])
        result[i]["created_at"] = "2022-04-28T17:38:52.347Z"
        result[i]["updated_at"] = "2022-04-28T17:38:52.347Z"
        result[i]["pricetrade"] = response[2][i]/1000000000000000000
        result[i]["seller"] = response[0][i]
      }
    }
    return result
  }
  
  useEffect(() => {
    const getBuyTrades = async () => {
      const p2pContract = await new window.web3.eth.Contract(web3Utils.p2pAbi, '0x47fFb97892f263F7a37E74a0F5818A09a48296aF');
        return await p2pContract.methods
          .marketBuyOrSellOrders(5, 0)
          .call()
          .then(result => {
            console.log(result);
            setBuyTrades(parseList(result));
            isLoading = false
          })
          .catch(err => {
            console.log(err);
          });
    }
    getBuyTrades();
  }, []);

  
  return (
    <>
      <OptionsBar tittleBar="Vender Sparklife" />
      
      {buyTrades.map((trade, index) => {
        return (
          <Offers
            key={index}
            option="Vender"
            typeTrade={trade.typetrade}
            coin={trade.coin}
            currency={trade.currency}
            city={trade.city}
            id={trade.id}
            pricetrade={trade.pricetrade}
            seller={trade.seller}
            swBuyOrSell="1"
            buy_sell="/sellConfirm/"
          />
        );
      })
      }
    </>
  );
};

export default SellSps;
