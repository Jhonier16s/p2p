import React, { useState, useEffect } from "react";
import "../styles/BuyConfirmCard.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const BuySellConfirmCard = ({
  buy_sell,
  date,
  idTrade,
  complete,
  one_pridetrade,
  trade_extra_info_payment,
  back_to,
  seller,
  trade,
  swBuyOrSell,
}) => {
  const { id } = useParams();
  /* console.log(id); */

  const [getId, setId] = useState(id);
  const [getTrade, setTrade] = useState({});

  useEffect(() => {
    setTrade(trade);
  }, []);

  const handlePut = async () => {
    const p2pAbi = [	{		"constant": false,		"inputs": [			{				"name": "escrowerAddress",				"type": "address"			},			{				"name": "fee",				"type": "uint256"			},			{				"name": "active",				"type": "uint256"			}		],		"name": "addAgentEscrower",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "seller",				"type": "address"			}		],		"name": "addSeller",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "sellerAddress",				"type": "address"			},			{				"name": "ID",				"type": "uint256"			}		],		"name": "cancelOrder",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "ID",				"type": "uint256"			},			{				"name": "Decision",				"type": "uint256"			}		],		"name": "escrowDecision",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "sellerAddress",				"type": "address"			},			{				"name": "escrowId",				"type": "uint256"			}		],		"name": "EscrowEscalation",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "sellerAddress",				"type": "address"			},			{				"name": "ID",				"type": "uint256"			}		],		"name": "fundRelease",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "weiAmmount",				"type": "uint256"			},			{				"name": "escrowAddress",				"type": "address"			},			{				"name": "notes",				"type": "bytes32"			},			{				"name": "sellOrBuy",				"type": "uint256"			},			{				"name": "spsCopPrice",				"type": "uint256"			}		],		"name": "newEscrowSellOrBuy",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "sellerAddress",				"type": "address"			},			{				"name": "ID",				"type": "uint256"			}		],		"name": "offertEscrow",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "renounceOwnership",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "escrowerAddress",				"type": "address"			},			{				"name": "fee",				"type": "uint256"			}		],		"name": "setEscrowFee",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_newOwner",				"type": "address"			}		],		"name": "transferOwnership",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "WithdrawFunds",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"inputs": [			{				"name": "_spsToken",				"type": "address"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "constructor"	},	{		"payable": true,		"stateMutability": "payable",		"type": "fallback"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "sellerAddress",				"type": "address"			}		],		"name": "EnewOffertSell",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "buyerAddress",				"type": "address"			}		],		"name": "EBought",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "buyerAddress",				"type": "address"			}		],		"name": "EoffertEscrow",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "withdrawToAddress",				"type": "address"			},			{				"indexed": false,				"name": "amount",				"type": "uint256"			}		],		"name": "Ewithdraw",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "previousOwner",				"type": "address"			}		],		"name": "OwnershipRenounced",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "previousOwner",				"type": "address"			},			{				"indexed": true,				"name": "newOwner",				"type": "address"			}		],		"name": "OwnershipTransferred",		"type": "event"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "address"			},			{				"name": "",				"type": "uint256"			}		],		"name": "buyerEscrowDatabase",		"outputs": [			{				"name": "buyer",				"type": "address"			},			{				"name": "seller",				"type": "address"			},			{				"name": "escrowId",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "sellerAddress",				"type": "address"			},			{				"name": "nounce",				"type": "uint256"			}		],		"name": "checkStatus",		"outputs": [			{				"name": "",				"type": "bytes32"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "address"			},			{				"name": "",				"type": "uint256"			}		],		"name": "escrowDatabase",		"outputs": [			{				"name": "buyer",				"type": "address"			},			{				"name": "seller",				"type": "address"			},			{				"name": "escrowId",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "address"			}		],		"name": "escrowers",		"outputs": [			{				"name": "active",				"type": "uint256"			},			{				"name": "fee",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "address"			}		],		"name": "Funds",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "buyerAddress",				"type": "address"			},			{				"name": "maxLoad",				"type": "uint256"			}		],		"name": "getBuyerTransaction",		"outputs": [			{				"name": "",				"type": "address[]"			},			{				"name": "",				"type": "uint256[]"			},			{				"name": "",				"type": "bytes32[]"			},			{				"name": "",				"type": "uint256[]"			},			{				"name": "",				"type": "uint256[]"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "escrowerAddress",				"type": "address"			}		],		"name": "getEscrowerTransactions",		"outputs": [			{				"name": "",				"type": "address[]"			},			{				"name": "",				"type": "address[]"			},			{				"name": "",				"type": "uint256[]"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "escrowAddress",				"type": "address"			}		],		"name": "getEscrowFee",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "sellerAddress",				"type": "address"			},			{				"name": "action",				"type": "uint256"			},			{				"name": "numToLoad",				"type": "uint256"			}		],		"name": "getSellerOrdersToApproveOrActive",		"outputs": [			{				"name": "",				"type": "uint256[]"			},			{				"name": "",				"type": "uint256[]"			},			{				"name": "",				"type": "bytes32[]"			},			{				"name": "",				"type": "uint256[]"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "sellerAddress",				"type": "address"			},			{				"name": "ID",				"type": "uint256"			}		],		"name": "getSpecificSellOrBuyTransaction",		"outputs": [			{				"name": "",				"type": "address"			},			{				"name": "",				"type": "address"			},			{				"name": "",				"type": "uint256"			},			{				"name": "",				"type": "bytes32"			},			{				"name": "",				"type": "uint256"			},			{				"name": "",				"type": "bytes32"			},			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "escrower",				"type": "address"			}		],		"name": "isAgentEscrower",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "seller",				"type": "address"			}		],		"name": "isSeller",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "numToLoad",				"type": "uint256"			},			{				"name": "action",				"type": "uint256"			}		],		"name": "marketBuyOrSellOrders",		"outputs": [			{				"name": "",				"type": "address[]"			},			{				"name": "",				"type": "address[]"			},			{				"name": "",				"type": "uint256[]"			},			{				"name": "",				"type": "bytes32[]"			},			{				"name": "",				"type": "uint256[]"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "owner",		"outputs": [			{				"name": "",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "address"			},			{				"name": "",				"type": "uint256"			}		],		"name": "sellerEscrowDatabase",		"outputs": [			{				"name": "escrowId",				"type": "uint256"			},			{				"name": "type_escrow",				"type": "uint256"			},			{				"name": "spsCopPrice",				"type": "uint256"			},			{				"name": "weiAmmount",				"type": "uint256"			},			{				"name": "buyer",				"type": "address"			},			{				"name": "seller",				"type": "address"			},			{				"name": "escrow_agent",				"type": "address"			},			{				"name": "escrow_fee",				"type": "uint256"			},			{				"name": "amount",				"type": "uint256"			},			{				"name": "escrow_intervention",				"type": "bool"			},			{				"name": "release_approval",				"type": "bool"			},			{				"name": "refund_approval",				"type": "bool"			},			{				"name": "notes",				"type": "bytes32"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "uint256"			}		],		"name": "sellers",		"outputs": [			{				"name": "",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	}];
    const p2pContract = await new window.web3.eth.Contract(p2pAbi, '0x47fFb97892f263F7a37E74a0F5818A09a48296aF');
    return await p2pContract.methods
      .offertEscrow(
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
        window.alert("Se ha completado la transacción, puedes verificarla en tu historial de transacciones");
      })
  };

  return (
    <>
      <h1 className="BuyConfirm-Tittle">{buy_sell} SPS a {seller.substring(0, 5)+"..."+seller.slice(-5)}</h1>
      <div className="BuyConfirm-Order">
        <h4 className="BuyConfirm-Order-Tittle">Número de orden:</h4>
        <h4 className="BuyConfirm-Order-Tittle">{idTrade}</h4>
      </div>
      <div className="BuyConfirm-Order">
        <h4 className="BuyConfirm-Order-Tittle">Fecha de creación</h4>
        <h4 className="BuyConfirm-Order-Tittle"> {date}</h4>
      </div>

      <div className="BuyConfirmCard-container">
        <div className="BuyConfirm-Info-Container">
          <div>
            <h2>Informacion de la orden</h2>
            <div className="BuyConfirm-Info">
              <div>
                <h3>Monto</h3>
                <h2 className="BuyConfirm-M">{trade.ammount} SPS</h2>
              </div>
              <div>
                <h3>Precio por SPS</h3>
                <h2>{trade.pricetrade} COP</h2>
              </div>
              <div>
                <h3>Total</h3>
                <h2>{trade.pricetrade*trade.ammount} COP</h2>
              </div>
            </div>
          </div>
        </div>
        {swBuyOrSell == 0 && <div className="BuyConfirm-Transfer-Info-Container">
          <h2>
            Transfiere los fondos a la cuenta del vendedor que se porporciona a
            continación
          </h2>
          <div className="BuyConfirm-Transfer-Info">
            <h3>Cuenta de destino</h3>
            <div className="BuyConfirm-Info-R">
              <div className="BuyConfirm-Separator"></div>
              <div>
                <h2>Nombre completo</h2>
                <h3>JAIME QUINTERO QUINTERO</h3>
                <h2>ID Número</h2>
                <h3>73492898</h3>
                <h2>Nombre de Banco</h2>
                <h3>{trade_extra_info_payment}</h3>
              </div>
            </div>
          </div>
        </div>}
        {swBuyOrSell == 0 ? <div>
          <h2>
            Haga click en "Confirmar Transaccion" para notificar al vendedor.
          </h2>
          <div>
            <button onClick={handlePut} className="BuyConfirm-btn">
              {complete}
            </button>
            <Link to={back_to}>
              <button className="BuyConfirm-btn-cancel">Cancelar orden</button>
            </Link>
          </div>
        </div>
      : <div>
          <h2>
            Haga click en "Confirmar Transacción" para transferir los fondos y notificar al comprador.
          </h2>
          <div>
            <button onClick={handlePut} className="BuyConfirm-btn">
              {complete}
            </button>
            <Link to={back_to}>
              <button className="BuyConfirm-btn-cancel">Cancelar orden</button>
            </Link>
          </div>
        </div>}
      </div>
    </>
  );
};

export default BuySellConfirmCard;
