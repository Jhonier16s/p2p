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
          result[i]["typetrade"] = parseInt(response[4][i]) ? "Sell" : "Buy"
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
          result[i]["pricetrade"] = response[4][i]/1000000000000000000
          result[i]["ammount"] = response[1][i]/1000000000000000000
          result[i]["seller"] = response[0][i]
        }
      }
      return result 
    } catch (err) {
      console.log(err)
      return [] 
    }
  }
  const [history, setHistory] = useState([]);
  
  async function fundRelease(seller, id) {
    const p2pContract = await new window.web3.eth.Contract(web3Utils.p2pAbi, '0x47fFb97892f263F7a37E74a0F5818A09a48296aF');
    return await p2pContract.methods
      .fundRelease(
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
        window.alert("La transacción se ha completado correctamente"); 
      })
  }
  async function EscrowAction(seller, id) {
    const p2pContract = await new window.web3.eth.Contract(web3Utils.p2pAbi, '0x47fFb97892f263F7a37E74a0F5818A09a48296aF');
    return await p2pContract.methods
      .EscrowEscalation(
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
        window.alert("La transacción se ha elevado a un Árbitro para que se tome una desición"); 
      })
  }

  useEffect(() => {
    const getHistory = async () => {
      const p2pContract = await new window.web3.eth.Contract(web3Utils.p2pAbi, '0x47fFb97892f263F7a37E74a0F5818A09a48296aF');
      return await p2pContract.methods
        .getBuyerTransaction(window.ethereum.selectedAddress, 10)
        .call()
        .then(result => {
          console.log(result);
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
      <div className="Table-container">
        <table className="Table-Main">
          <thead className="Table-Head">
            <tr key="1">
              <th>Fecha y hora</th>
              <th>ID de negocio</th>
              <th>Tipo</th>
              <th>Billetera</th>
              <th>Cantidad</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          {history.map((history, index) => {
            return (
              <tr key={index}>
                <td>{history.created_at}</td>
                <td>{history.id}</td>
                <td>{history.typetrade}</td>
                <td>{history.coin}</td>
                <td>{history.ammount} SPS </td>
                <td>{history.status_trade}</td>
                <td> 
                  {history.typetrade == "Sell" && history.status_trade == "In Progress\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00" && <button onClick={() => EscrowAction(history.seller, history.id)}  className="button">Solicitar Intervención</button>}
                  {/* {(history.typetrade == "Sell" && history.status_trade == "In Progress\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00") && <button onClick={() => fundRelease(history.seller, history.id)} className="button">Aprobar</button> }  */}
                  {(history.typetrade == "Buy" && history.status_trade == "In Progress\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00") && <button onClick={() => fundRelease(history.seller, history.id)} className="button">Aprobar</button>} &nbsp;
                  {(history.typetrade == "Buy" && history.status_trade == "In Progress\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00") && <button onClick={() => EscrowAction(history.seller, history.id)} className="button">Solicitar Intervención</button>}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Table;
