import React,{useState,useEffect} from "react";
import web3Utils from '../Utils/web-utils'
import "../styles/Table.css";
import { Bars, BallTriangle } from  'react-loader-spinner'

var isLoading = true
var notRecords = false

const Table = ({id, coin}) => {
  const [isLoadingCancel, setLoadingCancel] = useState(false)
  const parseList = (response) => {
    try {
      let result = []
      let totalRows = response[0].length
      
      for(let i = 0; i < totalRows; i++){
        if(response[1][i] != 0) {
          result[i] = {}
          result[i]["id"] = parseInt(response[3][i])
          result[i]["typetrade"] = parseInt(response[0][i]) ? "Sell" : "Buy"
          result[i]["coin"] = "SPS"
          result[i]["city"] = "dwad"
          result[i]["country_id"] = 1
          result[i]["currency"] = "COP"
          result[i]["user_first"] = ""
          result[i]["user_second"] = ""
          result[i]["payment_method_id"] = 1
          result[i]["extra_info_payment"] = "Nequi"
          result[i]["status_trade"] = window.web3.utils.toAscii(response[2][i])
          result[i]["created_at"] = "2022-04-28T17:38:52.347Z"
          result[i]["updated_at"] = "2022-04-28T17:38:52.347Z"
          result[i]["pricetrade"] = 0
          result[i]["ammount"] = response[1][i]/1000000000000000000
          //result[i]["buyer"] = response[0][i]
          result[i]["buyOrSell"] = response[0][i]
        }
      }
      return result 
    } catch (err) {
      console.log(err)
      return [] 
    }
  }
  const [history, setHistory] = useState([]);
  
  async function cancelOrder(seller, id) {
    setLoadingCancel(true)
    const p2pContract = await new window.web3.eth.Contract(web3Utils.p2pAbi, '0x47fFb97892f263F7a37E74a0F5818A09a48296aF');
    return await p2pContract.methods
      .cancelOrder(
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
        setLoadingCancel(false)
      })
      .then(receipt => {
        console.log(receipt);
        setLoadingCancel(false)
        window.alert("La transacción se ha cancelado con exito"); 
      })
  }

  useEffect(() => {
    const getHistory = async () => {
      const p2pContract = await new window.web3.eth.Contract(web3Utils.p2pAbi, '0x47fFb97892f263F7a37E74a0F5818A09a48296aF');
      return await p2pContract.methods
        .getSellerOrdersToApproveOrActive(window.ethereum.selectedAddress, 0, 10)
        .call()
        .then(result => {
          console.log(result);
          isLoading = false
          if(result[0].length == 0)
            notRecords = true
          setHistory(parseList(result));
        })
        .catch(err => {
          console.log(err);
        });
    }
    getHistory();
  }, []);

  
  return (
    <>
      {isLoading===true?
      <div style={{left:"45%", position:"absolute"}}>
      <BallTriangle
        heigth="100"
        width="100"
        color="grey"
        ariaLabel="loading-indicator"
      /></div>:""}
      <div className="Table-container">
        <table className="Table-Main">
          <thead className="Table-Head">
            <tr key="1">
              {/* <th>Fecha y hora</th> */}
              <th>ID de negocio</th>
              <th>Tipo</th>
              {/* <th>Comprador</th> */}
              <th>Activo</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          {history.map((history, index) => {
            return (
              <tr key={index}>
                {/* <td>{history.created_at}</td> */}
                <td>{history.id}</td>
                <td>{history.typetrade}</td>
                {/* <td>{history.buyer.substring(0, 5)+"..."+history.buyer.slice(-5)}</td> */}
                <td>{history.ammount} SPS </td>
                <td>{history.status_trade}</td>
                <td>
                  {!isLoadingCancel?
                    <button onClick={() => cancelOrder(window.ethereum.selectedAddress, history.id)} className="button">Cancelar</button>
                  :""}
                  {isLoadingCancel===true?
                    <Bars heigth="60" width="60" color="grey" ariaLabel="loading-indicator" />
                    :""}
                </td>
              </tr>
            );
          })}
          {notRecords?<tr><td colSpan={5}><h1 style={{textAlign:"center"}}><br/>Sin Registros</h1></td></tr>:""}
        </table>
      </div>
    </>
  );
};

export default Table;
