import react, { useEffect, useState } from "react";
import "../../styles/BuyConfirm.css";
import BuySellConfirmCard from "../BuySellConfirmCard";
import arrow from "../../assets/right-arrow.png";
import { useParams } from "react-router-dom";

const BuySellConfirm = () => {
  /*  console.log(useParams()); */
  const { id, seller, swBuyOrSell } = useParams();
  /* console.log(id); */

  const [getId, setId] = useState(id);
  const [sellerAddress, setSeller] = useState(seller);
  const [getTrade, setTrade] = useState({});
  const parseList = (response) => {
    try {
      let result = {}
      result["id"] = parseInt(response[4])
      result["seller"] = response[0]
      result["escrowerAgent"] = response[1]
      result["pricetrade"] = response[6]/1000000000000000000
      result["ammount"] = response[2]/1000000000000000000
      result["status_trade"] = window.web3.utils.toAscii(response[3])
      result["extra_info_payment"] = window.web3.utils.toAscii(response[5])
      result["typetrade"] = "Buy"
      result["coin"] = "SPS"
      result["city"] = "a"
      result["country_id"] = 1
      result["currency"] = "COP"
      result["user_first"] = ""
      result["user_second"] = ""
      result["payment_method_id"] = 1
      result["created_at"] = "2022-04-28T17:38:52.347Z"
      result["updated_at"] = "2022-04-28T17:38:52.347Z"
      return result 
    } catch (err) {
      console.log(err)
      return [] 
    }
  }

  useEffect(() => {
    const getData = async () => {
      const p2pAbi = [	{		"constant": false,		"inputs": [			{				"name": "escrowerAddress",				"type": "address"			},			{				"name": "fee",				"type": "uint256"			},			{				"name": "active",				"type": "uint256"			}		],		"name": "addAgentEscrower",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "seller",				"type": "address"			}		],		"name": "addSeller",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "sellerAddress",				"type": "address"			},			{				"name": "ID",				"type": "uint256"			}		],		"name": "cancelOrder",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "ID",				"type": "uint256"			},			{				"name": "Decision",				"type": "uint256"			}		],		"name": "escrowDecision",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "sellerAddress",				"type": "address"			},			{				"name": "escrowId",				"type": "uint256"			}		],		"name": "EscrowEscalation",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "sellerAddress",				"type": "address"			},			{				"name": "ID",				"type": "uint256"			}		],		"name": "fundRelease",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "weiAmmount",				"type": "uint256"			},			{				"name": "escrowAddress",				"type": "address"			},			{				"name": "notes",				"type": "bytes32"			},			{				"name": "sellOrBuy",				"type": "uint256"			},			{				"name": "spsCopPrice",				"type": "uint256"			}		],		"name": "newEscrowSellOrBuy",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "sellerAddress",				"type": "address"			},			{				"name": "ID",				"type": "uint256"			}		],		"name": "offertEscrow",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "renounceOwnership",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "escrowerAddress",				"type": "address"			},			{				"name": "fee",				"type": "uint256"			}		],		"name": "setEscrowFee",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_newOwner",				"type": "address"			}		],		"name": "transferOwnership",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "WithdrawFunds",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"inputs": [			{				"name": "_spsToken",				"type": "address"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "constructor"	},	{		"payable": true,		"stateMutability": "payable",		"type": "fallback"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "sellerAddress",				"type": "address"			}		],		"name": "EnewOffertSell",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "buyerAddress",				"type": "address"			}		],		"name": "EBought",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "buyerAddress",				"type": "address"			}		],		"name": "EoffertEscrow",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "withdrawToAddress",				"type": "address"			},			{				"indexed": false,				"name": "amount",				"type": "uint256"			}		],		"name": "Ewithdraw",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "previousOwner",				"type": "address"			}		],		"name": "OwnershipRenounced",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "previousOwner",				"type": "address"			},			{				"indexed": true,				"name": "newOwner",				"type": "address"			}		],		"name": "OwnershipTransferred",		"type": "event"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "address"			},			{				"name": "",				"type": "uint256"			}		],		"name": "buyerEscrowDatabase",		"outputs": [			{				"name": "buyer",				"type": "address"			},			{				"name": "seller",				"type": "address"			},			{				"name": "escrowId",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "sellerAddress",				"type": "address"			},			{				"name": "nounce",				"type": "uint256"			}		],		"name": "checkStatus",		"outputs": [			{				"name": "",				"type": "bytes32"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "address"			},			{				"name": "",				"type": "uint256"			}		],		"name": "escrowDatabase",		"outputs": [			{				"name": "buyer",				"type": "address"			},			{				"name": "seller",				"type": "address"			},			{				"name": "escrowId",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "address"			}		],		"name": "escrowers",		"outputs": [			{				"name": "active",				"type": "uint256"			},			{				"name": "fee",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "address"			}		],		"name": "Funds",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "buyerAddress",				"type": "address"			},			{				"name": "maxLoad",				"type": "uint256"			}		],		"name": "getBuyerTransaction",		"outputs": [			{				"name": "",				"type": "address[]"			},			{				"name": "",				"type": "uint256[]"			},			{				"name": "",				"type": "bytes32[]"			},			{				"name": "",				"type": "uint256[]"			},			{				"name": "",				"type": "uint256[]"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "escrowerAddress",				"type": "address"			}		],		"name": "getEscrowerTransactions",		"outputs": [			{				"name": "",				"type": "address[]"			},			{				"name": "",				"type": "address[]"			},			{				"name": "",				"type": "uint256[]"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "escrowAddress",				"type": "address"			}		],		"name": "getEscrowFee",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "sellerAddress",				"type": "address"			},			{				"name": "action",				"type": "uint256"			},			{				"name": "numToLoad",				"type": "uint256"			}		],		"name": "getSellerOrdersToApproveOrActive",		"outputs": [			{				"name": "",				"type": "uint256[]"			},			{				"name": "",				"type": "uint256[]"			},			{				"name": "",				"type": "bytes32[]"			},			{				"name": "",				"type": "uint256[]"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "sellerAddress",				"type": "address"			},			{				"name": "ID",				"type": "uint256"			}		],		"name": "getSpecificSellOrBuyTransaction",		"outputs": [			{				"name": "",				"type": "address"			},			{				"name": "",				"type": "address"			},			{				"name": "",				"type": "uint256"			},			{				"name": "",				"type": "bytes32"			},			{				"name": "",				"type": "uint256"			},			{				"name": "",				"type": "bytes32"			},			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "escrower",				"type": "address"			}		],		"name": "isAgentEscrower",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "seller",				"type": "address"			}		],		"name": "isSeller",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "numToLoad",				"type": "uint256"			},			{				"name": "action",				"type": "uint256"			}		],		"name": "marketBuyOrSellOrders",		"outputs": [			{				"name": "",				"type": "address[]"			},			{				"name": "",				"type": "address[]"			},			{				"name": "",				"type": "uint256[]"			},			{				"name": "",				"type": "bytes32[]"			},			{				"name": "",				"type": "uint256[]"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "owner",		"outputs": [			{				"name": "",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "address"			},			{				"name": "",				"type": "uint256"			}		],		"name": "sellerEscrowDatabase",		"outputs": [			{				"name": "escrowId",				"type": "uint256"			},			{				"name": "type_escrow",				"type": "uint256"			},			{				"name": "spsCopPrice",				"type": "uint256"			},			{				"name": "weiAmmount",				"type": "uint256"			},			{				"name": "buyer",				"type": "address"			},			{				"name": "seller",				"type": "address"			},			{				"name": "escrow_agent",				"type": "address"			},			{				"name": "escrow_fee",				"type": "uint256"			},			{				"name": "amount",				"type": "uint256"			},			{				"name": "escrow_intervention",				"type": "bool"			},			{				"name": "release_approval",				"type": "bool"			},			{				"name": "refund_approval",				"type": "bool"			},			{				"name": "notes",				"type": "bytes32"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "uint256"			}		],		"name": "sellers",		"outputs": [			{				"name": "",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	}];
      const p2pContract = await new window.web3.eth.Contract(p2pAbi, '0x47fFb97892f263F7a37E74a0F5818A09a48296aF');
      return await p2pContract.methods
        .getSpecificSellOrBuyTransaction(sellerAddress, id)
        .call()
        .then(result => {
          console.log(result);
          setTrade(parseList(result));
        })
        .catch(err => {
          console.log(err);
        });
    }
    getData();
  }, []);

  // const getData = async () => {
  //   const data = await fetch(`https://sps-p2p.herokuapp.com/trades/${id}.json`);
  //   const trades = await data.json();
  //   trades.ammount = 100
  //   setTrade(trades);
  //   setId(trades.id);
  //   console.log(trades);
  // };
  debugger

  return (
    <>
      <div className="Buy-Confirm-Container">
        <div className="Buy-Confirm-CARD-Container">
          <BuySellConfirmCard back_to={swBuyOrSell==0?"/BuySps":"/SellSps"} complete="Confirmar transacción"idTrade={id} date={new Date().toString()} buy_sell={"Comprar"} one_pridetrade={getTrade.pricetrade} trade_extra_info_payment={getTrade.extra_info_payment} seller={sellerAddress} trade={getTrade} swBuyOrSell={swBuyOrSell} />
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
                <h2 className="Buy-Confirm-UserName">{sellerAddress.substring(0, 5)+"..."+sellerAddress.slice(-5)}</h2>
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
                  {getTrade.extra_info_payment}
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

export default BuySellConfirm;
