import React,{useState,useEffect} from "react";
import "../styles/Table.css";
const Table = ({id, coin}) => {

  const URL = "https://sps-p2p.herokuapp.com/trades/list/history.json";

  const [history, setHistory] = useState([]);
  useEffect(() => {
    getHistory();
  }, []);

  function getHistory() {
    fetch(URL)
      .then((res) => res.json())
      .then((response) => {
        const data = response;
        console.log(response);
        setHistory(data);
      });
  }
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
              <th>Tarifa</th>
            </tr>
          </thead>
          {history.map((history, index) => {
            return (
              <tr key={index}>
                <td>{history.created_at}</td>
                <td>{history.id}</td>
                <td>{history.typetrade}</td>
                <td>{history.coin}</td>
                <td>Na</td>
                <td>Na</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Table;
