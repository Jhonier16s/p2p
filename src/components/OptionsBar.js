import React from 'react'

const OptionsBar = ({tittleBar}) => {
  return (
   <>
     <h2 className="Buy-sps-tittle">{tittleBar}</h2>
      <div className="container">
        <div className="Buy-container">
          <div>
            <label className="Buy-tittle-label" htmlFor="sps">
              Cripto
            </label>
            <select
              className="Buy-selector"
              id="sps"
              name="spsPrice"
              form="spsForm"
            >
              <option value="sps" key="sps">
                Sparklife SPS
              </option>
            </select>
          </div>

          <div>
            <label className="Buy-tittle-label" htmlFor="coin">
              Moneda
            </label>
            <select
              className="Buy-selector"
              id="coin"
              name="coin"
              form="coinForm"
            >
              {/* <option value="usd" key="usd"> 
                USD
              </option>*/}
              <option value="cop" key="cop">
                COP
              </option>
            </select>
          </div>

          <div>
            <label className="Buy-tittle-label" htmlFor="pay">
              Método de pago
            </label>
            <select className="Buy-selector" id="pay" name="pay" form="payForm">
              {/* <option value="any" key="any">
                Cualquiera
              </option> */}
              <option value="cop" key="cop">
                Consignaci&oacute;n
              </option>
            </select>
          </div>
        </div>
      </div>
   </>
  )
}

export default OptionsBar