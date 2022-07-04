import React,{useState,useEffect} from "react";
import web3Utils from '../Utils/web-utils'
import "../styles/Table.css";

const Table = ({id, coin}) => {
  
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
  
  useEffect(() => {
    const getHistory = async () => {
      const p2pContract = await new window.web3.eth.Contract(web3Utils.p2pAbi, '0x47fFb97892f263F7a37E74a0F5818A09a48296aF');
      return await p2pContract.methods
        .getSellerOrdersToApproveOrActive(window.ethereum.selectedAddress, 2, 10)
        .call()
        .then(result => {
          console.log(result);
          setHistory(parseList(result))
        })
        .catch(err => {
          console.log(err)
        })
    }
    getHistory()
  }, []);

  
  return (
    <>
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
              {/* <th>Acción</th> */}
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
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Table;
