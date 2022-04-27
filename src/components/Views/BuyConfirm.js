import react from "react";
import "../../styles/BuyConfirm.css";
import BuyConfirmCard from "../BuyConfirmCard";
import arrow from "../../assets/right-arrow.png";
const BuyConfirm = () => {
  return (
    <>
      <div className="Buy-Confirm-Container">
        <div className="Buy-Confirm-CARD-Container">
          <BuyConfirmCard buy_sell={"Comprar"} />
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
                <h2 className="Buy-Confirm-UserName">Ramiro1504</h2>
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
                  Lotem vel eum iriure dolor in hendrerit in vulputate velit
                  esse molestie consequat, vel illum dolore eu feugiat nulla
                  facilisis at vero eros et accumsan et iusto odio dignissim qui
                  blandit praesent luptatum zzril delenit augue duis dolore te
                  feugait nulla facilisi. Lorem ipsum dolor sit amet, cons
                  ectetuer adipiscing elit, sed diam nonummy nibh euismod
                  tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut
                  wisi enim ad minim veniam, quis nostrud exerci tation
                  ullamcorper suscipit lobortis nisl ut aliquip
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

export default BuyConfirm;
