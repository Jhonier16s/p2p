import React, { useState, useEffect } from "react";
import web3Utils from '../../Utils/web-utils'
import "../../styles/BuyOffers.css";
import { Bars } from  'react-loader-spinner'

const BuyOffers = () => {
  // const [typetrade, setTypeTrade] = useState("buy");
  const [coin, setCoin] = useState("");
  const [isLoading, setLoading] = useState(false);
  {/*const [city, setCity] = useState("");
  const [country_id, setCountry] = useState("");
  const [currency, setCurrency] = useState("");
  const [user_first, setUserFirts] = useState("");
  const [user_second, setUserSecond] = useState("");
  const [payment_method_id, setPay] = useState("");
  const [extra_info_payment, setInfoPay] = useState("");
  const [status_trade, setStatusTrade] = useState("");
const [pricetrade, setPriceTrade] = useState("");*/}

  const [weiAmmount, setWeiAmmount] = useState("");
  const [escrowAgentAddress, setEscrowAgentAddress] = useState("0x48E40F83B148f7Ab7B3AF448140beBb343c118a9");
  const [notes, setNotes] = useState("");
  const [type, setType] = useState("0");
  const [copPrice, setCopPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    // await window.ethereum.enable();
    const p2pContract = await new window.web3.eth.Contract(web3Utils.p2pAbi, '0x47fFb97892f263F7a37E74a0F5818A09a48296aF');
    return await p2pContract.methods
      .newEscrowSellOrBuy(
        window.web3.utils.toWei(weiAmmount, 'ether'),
        escrowAgentAddress,
        window.web3.utils.fromAscii(notes),
        type,
        window.web3.utils.toWei(copPrice, 'ether')
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
        setLoading(false)
      })
      .then(receipt => {
        console.log(receipt);
        setLoading(false)
        window.alert("Se ha completado la oferta, puedes verificarla en la pantalla de ofertas de compra"); 
        e.target.reset();
      })
    
    /*fetch("https://sps-p2p.herokuapp.com/trades.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      console.log("success");
    });
    console.log(data);
    console.log(JSON.stringify(data)); */
    
  };
  
  return (
    <>
      <div className="BuyOffers-Main-Container">
        <h1>NUEVA OFERTA DE COMPRA</h1>
        <div className="Form-Container">
          <form onSubmit={handleSubmit} className="Form-Container">
            <div className="Form-Input-Container">
              <label> Activo a Comprar </label>
              <select
                value={coin}
                onChange={(e) => setCoin(e.target.value)}
                className="Form-Select"
              >
                <option value="sps">SPS</option>
              </select>
            </div>
            <div className="Form-Input-Container">
              <label>Cantidad</label>
              <input
                value={weiAmmount}
                onChange={(e) => setWeiAmmount(e.target.value)}
                className="Form-Input"
                type="number"
                required
              />
            </div>
            <div className="Form-Input-Container">
              <label> Agente Validador </label>
              <select
                value={escrowAgentAddress}
                onChange={(e) => setEscrowAgentAddress(e.target.value)}
                className="Form-Select"
              >
                <option value="0x48E40F83B148f7Ab7B3AF448140beBb343c118a9">Agente SPS 1</option>
              </select>
            </div>
            <div className="Form-Input-Container">
              <label>Notas</label>
              <input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="Form-Input"
                type="text"
              />
            </div>
            <div className="Form-Input-Container">
              <label>Precio en COP por cada SPS</label>
              <input
                value={copPrice}
                onChange={(e) => setCopPrice(e.target.value)}
                className="Form-Input"
                type="number"
                required
              />
            </div>
            
            {!isLoading?
              <button className="Form-btn">Crear oferta</button>
            :""}
            {isLoading===true?
              <Bars heigth="60" width="60" color="white" ariaLabel="loading-indicator" />
              :""}
          </form>
        </div>

        {/* 
          <div className="Form-Input-Container">
            <label>País</label>
            <input
              value={country_id}
              onChange={(e) => setCountry(e.target.value)}
              className="Form-Input"
              type="text"
              required
            />
          </div>
          <div className="Form-Input-Container">
            <label>Divisa</label>
            <input
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="Form-Input"
              type="text"
              required
            />
          </div>
          <div className="Form-Input-Container">
            <label>User first</label>
            <input
              value={user_first}
              onChange={(e) => setUserFirts(e.target.value)}
              className="Form-Input"
              type="text"
              required
            />
          </div>
          <div className="Form-Input-Container">
            <label>User second</label>
            <input
              value={user_second}
              onChange={(e) => setUserSecond(e.target.value)}
              className="Form-Input"
              type="text"
              required
            />
          </div>
          <div className="Form-Input-Container">
            <label>Método de pago</label>
            <input
              value={payment_method_id}
              onChange={(e) => setPay(e.target.value)}
              className="Form-Input"
              type="text"
              required
            />
          </div>
          <div className="Form-Input-Container">
            <label>Informacion adicional</label>
            <input
              value={extra_info_payment}
              onChange={(e) => setInfoPay(e.target.value)}
              className="Form-Input"
              type="text"
              required
            />
          </div>
          <div className="Form-Input-Container">
            <label>Estado del trade</label>
            <input
              value={status_trade}
              onChange={(e) => setStatusTrade(e.target.value)}
              className="Form-Input"
              type="text"
              required
            />
          </div>
          <div className="Form-Input-Container">
            <label>Precio</label>
            <input
              value={pricetrade}
              onChange={(e) => setPriceTrade(e.target.value)}
              className="Form-Input"
              type="text"
              required
            />
          </div>
        
        <div className="BuyOffers-Container">
          <div className="BuyOffers-Left">
            <label className="BuyOffers-Label" htmlFor="sps">
              Comprar/Vender
            </label>
            <select
              className="BuyOffers-Select"
              id="sps"
              name="spsPrice"
              form="spsForm"
            >
              <option value="sps" key="sps">
                Buy
              </option>
            </select>
          </div>
          <div className="BuyOffers-Right">
            <label className="BuyOffers-Label" htmlFor="sps">
              Mercado
            </label>
            <select
              className="BuyOffers-Select"
              id="sps"
              name="spsPrice"
              form="spsForm"
            >
              <option value="sps" key="sps">
                USD
              </option>
            </select>
          </div>
        </div>
        <div className="BuyOffers-Container">
          <div className="BuyOffers-Left">
            <label className="BuyOffers-Label" htmlFor="sps">
              Moneda
            </label>
            <select
              className="BuyOffers-Select"
              id="sps"
              name="spsPrice"
              form="spsForm"
            >
              <option value="sps" key="sps">
                SPS
              </option>
            </select>
          </div>
          <div className="BuyOffers-Right">
            <label className="BuyOffers-Label" htmlFor="sps">
              Moneda
            </label>
            <select
              className="BuyOffers-Select"
              id="sps"
              name="spsPrice"
              form="spsForm"
            >
              <option value="sps" key="sps">
                SPS
              </option>
            </select>
          </div>
        </div>
        <div className="BuyOffers-Container">
          <div className="BuyOffers-Left">
            <label className="BuyOffers-Label" htmlFor="sps">
              Ubicación (Ciudad)
            </label>
            <select
              className="BuyOffers-Select"
              id="sps"
              name="spsPrice"
              form="spsForm"
            >
              <option value="sps" key="sps">
                Medellín
              </option>
            </select>
          </div>
          <div className="BuyOffers-Right">
            <label className="BuyOffers-Label" htmlFor="sps">
              Ubicación
            </label>
            <select
              className="BuyOffers-Select"
              id="sps"
              name="spsPrice"
              form="spsForm"
            >
              <option value="sps" key="sps">
                Medellín
              </option>
            </select>
          </div>
        </div>
        <div className="BuyOffers-Container">
          <div className="BuyOffers-Left">
            <label className="BuyOffers-Label" htmlFor="sps">
              Pais
            </label>
            <select
              className="BuyOffers-Select"
              id="sps"
              name="spsPrice"
              form="spsForm"
            >
              <option value="sps" key="sps">
                Colombia
              </option>
            </select>
          </div>
          <div className="BuyOffers-Right">
            <label className="BuyOffers-Label" htmlFor="sps">
              Pais
            </label>
            <select
              className="BuyOffers-Select"
              id="sps"
              name="spsPrice"
              form="spsForm"
            >
              <option value="sps" key="sps">
                Colombia
              </option>
            </select>
          </div>
        </div> */}

        {/* <h1 className="Coin-Info-Tittle">Informacion de la moneda</h1>

        <div className="BuyOffers-Container">
          <div className="BuyOffers-Left">
            <label className="BuyOffers-Label" htmlFor="sps">
              Mercado 
            </label>
            <select
              className="BuyOffers-Select"
              id="sps"
              name="spsPrice"
              form="spsForm"
            >
              <option value="sps" key="sps">
                COP
              </option>
            </select>
          </div>
          <div className="BuyOffers-Right">
            <label className="BuyOffers-Label" htmlFor="sps">
              Horario de apertura
            </label>
            <h4 className="BuyOffers-Day">lun</h4>
            <select
              className="BuyOffers-Info-Select"
              id="sps"
              name="spsPrice"
              form="spsForm"
            >
              <option value="sps" key="sps">
                Start
              </option>
            </select>
            <select
              className="BuyOffers-Info-Select"
              id="sps"
              name="spsPrice"
              form="spsForm"
            >
              <option value="sps" key="sps">
                End
              </option>
            </select>
          </div>
        </div>
        <div className="BuyOffers-Container">
          <div className="BuyOffers-Left">
            <label className="BuyOffers-Label" htmlFor="sps">
              Margen
            </label>
            <select
              className="BuyOffers-Select"
              id="sps"
              name="spsPrice"
              form="spsForm"
            >
              <option value="sps" key="sps">
                0
              </option>
            </select>
          </div>
          <div className="BuyOffers-Right-Day">
            <h4 className="BuyOffers-Day">Mar</h4>
            <select
              className="BuyOffers-Info-Select"
              id="sps"
              name="spsPrice"
              form="spsForm"
            >
              <option value="sps" key="sps">
                Start
              </option>
            </select>
            <select
              className="BuyOffers-Info-Select"
              id="sps"
              name="spsPrice"
              form="spsForm"
            >
              <option value="sps" key="sps">
                End
              </option>
            </select>
          </div>
        </div>
        <div className="BuyOffers-Container">
          <div className="BuyOffers-Left">
            <label className="BuyOffers-Label" htmlFor="sps">
              Limite minimo de transacciones
            </label>
            <select
              className="BuyOffers-Select"
              id="sps"
              name="spsPrice"
              form="spsForm"
            >
              <option value="sps" key="sps">
                
              </option>
            </select>
          </div>
          <div className="BuyOffers-Right-Day">
            <h4 className="BuyOffers-Day">Mie</h4>
            <select
              className="BuyOffers-Info-Select"
              id="sps"
              name="spsPrice"
              form="spsForm"
            >
              <option value="sps" key="sps">
                Start
              </option>
            </select>
            <select
              className="BuyOffers-Info-Select"
              id="sps"
              name="spsPrice"
              form="spsForm"
            >
              <option value="sps" key="sps">
                End
              </option>
            </select>
          </div>
        </div>
        <div className="BuyOffers-Container">
          <div className="BuyOffers-Left">
            <label className="BuyOffers-Label" htmlFor="sps">
              Limite maximo de transacciones
            </label>
            <select
              className="BuyOffers-Select"
              id="sps"
              name="spsPrice"
              form="spsForm"
            >
              <option value="sps" key="sps">
                
              </option>
            </select>
          </div>
          <div className="BuyOffers-Right-Day">
            <h4 className="BuyOffers-Day">Jue</h4>
            <select
              className="BuyOffers-Info-Select"
              id="sps"
              name="spsPrice"
              form="spsForm"
            >
              <option value="sps" key="sps">
                Start
              </option>
            </select>
            <select
              className="BuyOffers-Info-Select"
              id="sps"
              name="spsPrice"
              form="spsForm"
            >
              <option value="sps" key="sps">
                End
              </option>
            </select>
          </div>
        </div>
        <div className="BuyOffers-Container">
          <div className="BuyOffers-Left">
            <label className="BuyOffers-Label" htmlFor="sps">
              Tiempo de ventana pago
            </label>
            <select
              className="BuyOffers-Select"
              id="sps"
              name="spsPrice"
              form="spsForm"
            >
              <option value="sps" key="sps">
                15
              </option>
            </select>
          </div>
          <div className="BuyOffers-Right-Day">
            <h4 className="BuyOffers-Day">Vie</h4>
            <select
              className="BuyOffers-Info-Select"
              id="sps"
              name="spsPrice"
              form="spsForm"
            >
              <option value="sps" key="sps">
                Start
              </option>
            </select>
            <select
              className="BuyOffers-Info-Select"
              id="sps"
              name="spsPrice"
              form="spsForm"
            >
              <option value="sps" key="sps">
                End
              </option>
            </select>
          </div>
        </div>
        <h1 className="Coin-Info-Tittle">Opciones en línea</h1>
        <div className="BuyOffers-Left">
          <label className="BuyOffers-Label" htmlFor="sps">
            Método de pago
          </label>
          <select
            className="BuyOffers-Select"
            id="sps"
            name="spsPrice"
            form="spsForm"
          >
            <option value="sps" key="sps">
              Wester Union
            </option>
          </select>
        </div>
        <div className="BuyOffers-Left">
          <label className="BuyOffers-Label" htmlFor="sps">
            Info adicional
          </label>
          <select
            className="BuyOffers-Select"
            id="sps"
            name="spsPrice"
            form="spsForm"
          >
            <option value="sps" key="sps">
              COP
            </option>
          </select>
        </div>
        <h4>
          Opcional. Si es necesario, proporcione detalles sobre cómo transferir
          dinero. Este es un número de cuenta bancaria para transferencias
          bancarias o una cuenta de usuario para sitios web de transferencia de
          dinero.
        </h4>
        <h1 className="Coin-Info-Tittle">Términos del intercambio</h1>
        <div className="Terminos-Container">
          <label className="Terminos-Label">Términos</label>
          <textarea className="Terminos-Textarea"></textarea>
        </div>
        <div className="Btn-Container">
          <button className="BuyOffers-btn">Crear</button>
        </div> */}
      </div>
    </>
  );
};

export default BuyOffers;
