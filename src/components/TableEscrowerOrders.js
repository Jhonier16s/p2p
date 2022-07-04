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
          result[i]["id"] = parseInt(response[2][i])
          result[i]["buyer"] = response[1][i]
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
  async function escrowDecision(action, id) {
    const p2pContract = await new window.web3.eth.Contract(web3Utils.p2pAbi, '0x47fFb97892f263F7a37E74a0F5818A09a48296aF');
    return await p2pContract.methods
      .escrowDecision(
        id,
        action
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
        .getEscrowerTransactions(window.ethereum.selectedAddress)
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
              <th>ID de negocio</th>
              <th>Comprador</th>
              <th>vendedor</th>
              <th>Acción</th>
            </tr>
          </thead>
          {history.map((history, index) => {
            return (
              <tr key={index}>
                {/* <td>{history.created_at}</td> */}
                <td>{history.id}</td>
                <td>{history.buyer.substring(0, 5)+"..."+history.buyer.slice(-5)}</td>
                <td>{history.seller.substring(0, 5)+"..."+history.seller.slice(-5)}</td>
                <td>
                  <button onClick={() => escrowDecision(0, history.id)} className="button">Reembolso</button>&nbsp;
                  <button onClick={() => escrowDecision(1, history.id)} className="button">Aprobar</button>
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
