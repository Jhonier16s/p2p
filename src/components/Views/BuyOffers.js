import React, { useState, useEffect } from "react";
import "../../styles/BuyOffers.css";
const BuyOffers = () => {
  const [typetrade, setTypeTrade] = useState("buy");
  const [coin, setCoin] = useState("");
  const [city, setCity] = useState("");
  const [country_id, setCountry] = useState("");
  const [currency, setCurrency] = useState("");
  const [user_first, setUserFirts] = useState("");
  const [user_second, setUserSecond] = useState("");
  const [payment_method_id, setPay] = useState("");
  const [extra_info_payment, setInfoPay] = useState("");
  const [status_trade, setStatusTrade] = useState("");
  const [pricetrade, setPriceTrade] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = 
    { 
      typetrade,
      coin,
      city,
      country_id,
      currency,
      user_first,
      user_second,
      payment_method_id,
      extra_info_payment,
      status_trade,
      pricetrade
    };
    
    
    fetch("https://sps-p2p.herokuapp.com/trades.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      console.log("success");
    });
    /* console.log(data);
    console.log(JSON.stringify(data)); */
    
    window.alert("Se ha completado la oferta, puedes verificarla en la pantalla de ofertas de compra"); 
    e.target.reset();
    
    
  };
  
  return (
    <>
      <div className="BuyOffers-Main-Container">
        <h1>NUEVA OFERTA DE COMPRA/VENTA</h1>
        <div className="Form-Container">
          <form onSubmit={handleSubmit} className="Form-Container">
            <div className="Form-Input-Container">
              <label> Comprar - Vender </label>
              <select
                value={typetrade}
                onChange={(e) => setTypeTrade(e.target.value)}
                className="Form-Select"
              >
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </select>
            </div>
            <div className="Form-Input-Container">
              <label>Coin</label>
              <input
                value={coin}
                onChange={(e) => setCoin(e.target.value)}
                className="Form-Input"
                type="text"
                required
              />
            </div>
            <div className="Form-Input-Container">
              <label>Ciudad</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="Form-Input"
                type="text"
                required
              />
            </div>
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

            <button className="Form-btn">Crear oferta</button>
          </form>
        </div>

        {/* <div className="BuyOffers-Container">
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
