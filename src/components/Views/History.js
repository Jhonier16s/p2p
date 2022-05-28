import React, { useState, useEffect } from "react";
import "../../styles/History.css";
import Table from "../Table";
import TableSellOrders from "../TableSellOrders";
import TableSellOpenOrders from "../TableSellOpenOrders";
import TableEscrowerOrders from "../TableEscrowerOrders";
import TableHistoryOrders from "../TableSellHistoryOrders";

const p2pAbi = [	{		"constant": false,		"inputs": [			{				"name": "escrowerAddress",				"type": "address"			},			{				"name": "fee",				"type": "uint256"			},			{				"name": "active",				"type": "uint256"			}		],		"name": "addAgentEscrower",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "seller",				"type": "address"			}		],		"name": "addSeller",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "sellerAddress",				"type": "address"			},			{				"name": "ID",				"type": "uint256"			}		],		"name": "cancelOrder",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "ID",				"type": "uint256"			},			{				"name": "Decision",				"type": "uint256"			}		],		"name": "escrowDecision",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "sellerAddress",				"type": "address"			},			{				"name": "escrowId",				"type": "uint256"			}		],		"name": "EscrowEscalation",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "sellerAddress",				"type": "address"			},			{				"name": "ID",				"type": "uint256"			}		],		"name": "fundRelease",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "weiAmmount",				"type": "uint256"			},			{				"name": "escrowAddress",				"type": "address"			},			{				"name": "notes",				"type": "bytes32"			},			{				"name": "sellOrBuy",				"type": "uint256"			},			{				"name": "spsCopPrice",				"type": "uint256"			}		],		"name": "newEscrowSellOrBuy",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "sellerAddress",				"type": "address"			},			{				"name": "ID",				"type": "uint256"			}		],		"name": "offertEscrow",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "renounceOwnership",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "escrowerAddress",				"type": "address"			},			{				"name": "fee",				"type": "uint256"			}		],		"name": "setEscrowFee",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_newOwner",				"type": "address"			}		],		"name": "transferOwnership",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "WithdrawFunds",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"inputs": [			{				"name": "_spsToken",				"type": "address"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "constructor"	},	{		"payable": true,		"stateMutability": "payable",		"type": "fallback"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "sellerAddress",				"type": "address"			}		],		"name": "EnewOffertSell",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "buyerAddress",				"type": "address"			}		],		"name": "EBought",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "buyerAddress",				"type": "address"			}		],		"name": "EoffertEscrow",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "withdrawToAddress",				"type": "address"			},			{				"indexed": false,				"name": "amount",				"type": "uint256"			}		],		"name": "Ewithdraw",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "previousOwner",				"type": "address"			}		],		"name": "OwnershipRenounced",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "previousOwner",				"type": "address"			},			{				"indexed": true,				"name": "newOwner",				"type": "address"			}		],		"name": "OwnershipTransferred",		"type": "event"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "address"			},			{				"name": "",				"type": "uint256"			}		],		"name": "buyerEscrowDatabase",		"outputs": [			{				"name": "buyer",				"type": "address"			},			{				"name": "seller",				"type": "address"			},			{				"name": "escrowId",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "sellerAddress",				"type": "address"			},			{				"name": "nounce",				"type": "uint256"			}		],		"name": "checkStatus",		"outputs": [			{				"name": "",				"type": "bytes32"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "address"			},			{				"name": "",				"type": "uint256"			}		],		"name": "escrowDatabase",		"outputs": [			{				"name": "buyer",				"type": "address"			},			{				"name": "seller",				"type": "address"			},			{				"name": "escrowId",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "address"			}		],		"name": "escrowers",		"outputs": [			{				"name": "active",				"type": "uint256"			},			{				"name": "fee",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "address"			}		],		"name": "Funds",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "buyerAddress",				"type": "address"			},			{				"name": "maxLoad",				"type": "uint256"			}		],		"name": "getBuyerTransaction",		"outputs": [			{				"name": "",				"type": "address[]"			},			{				"name": "",				"type": "uint256[]"			},			{				"name": "",				"type": "bytes32[]"			},			{				"name": "",				"type": "uint256[]"			},			{				"name": "",				"type": "uint256[]"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "escrowerAddress",				"type": "address"			}		],		"name": "getEscrowerTransactions",		"outputs": [			{				"name": "",				"type": "address[]"			},			{				"name": "",				"type": "address[]"			},			{				"name": "",				"type": "uint256[]"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "escrowAddress",				"type": "address"			}		],		"name": "getEscrowFee",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "sellerAddress",				"type": "address"			},			{				"name": "action",				"type": "uint256"			},			{				"name": "numToLoad",				"type": "uint256"			}		],		"name": "getSellerOrdersToApproveOrActive",		"outputs": [			{				"name": "",				"type": "uint256[]"			},			{				"name": "",				"type": "uint256[]"			},			{				"name": "",				"type": "bytes32[]"			},			{				"name": "",				"type": "uint256[]"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "sellerAddress",				"type": "address"			},			{				"name": "ID",				"type": "uint256"			}		],		"name": "getSpecificSellOrBuyTransaction",		"outputs": [			{				"name": "",				"type": "address"			},			{				"name": "",				"type": "address"			},			{				"name": "",				"type": "uint256"			},			{				"name": "",				"type": "bytes32"			},			{				"name": "",				"type": "uint256"			},			{				"name": "",				"type": "bytes32"			},			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "escrower",				"type": "address"			}		],		"name": "isAgentEscrower",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "seller",				"type": "address"			}		],		"name": "isSeller",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "numToLoad",				"type": "uint256"			},			{				"name": "action",				"type": "uint256"			}		],		"name": "marketBuyOrSellOrders",		"outputs": [			{				"name": "",				"type": "address[]"			},			{				"name": "",				"type": "address[]"			},			{				"name": "",				"type": "uint256[]"			},			{				"name": "",				"type": "bytes32[]"			},			{				"name": "",				"type": "uint256[]"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "owner",		"outputs": [			{				"name": "",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "address"			},			{				"name": "",				"type": "uint256"			}		],		"name": "sellerEscrowDatabase",		"outputs": [			{				"name": "escrowId",				"type": "uint256"			},			{				"name": "type_escrow",				"type": "uint256"			},			{				"name": "spsCopPrice",				"type": "uint256"			},			{				"name": "weiAmmount",				"type": "uint256"			},			{				"name": "buyer",				"type": "address"			},			{				"name": "seller",				"type": "address"			},			{				"name": "escrow_agent",				"type": "address"			},			{				"name": "escrow_fee",				"type": "uint256"			},			{				"name": "amount",				"type": "uint256"			},			{				"name": "escrow_intervention",				"type": "bool"			},			{				"name": "release_approval",				"type": "bool"			},			{				"name": "refund_approval",				"type": "bool"			},			{				"name": "notes",				"type": "bytes32"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "uint256"			}		],		"name": "sellers",		"outputs": [			{				"name": "",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	}];

// Validar si es vendedor y mostrar otras vistas
const History = () => {
  const [viewSeller, setViewSeller] = useState(false);
  const [viewEscrower, setViewEscrower] = useState(false);

  useEffect(() => {

    async function isSeller() {
      const p2pContract = await new window.web3.eth.Contract(p2pAbi, '0x47fFb97892f263F7a37E74a0F5818A09a48296aF');
      await p2pContract.methods
        .isSeller(window.ethereum.selectedAddress)
        .call()
        .then(result => {
          setViewSeller(result)
        })
        .catch(err => {
          console.log(err)
          setViewSeller(false)
        });
    }
    async function isEscrower() {
      const p2pContract = await new window.web3.eth.Contract(p2pAbi, '0x47fFb97892f263F7a37E74a0F5818A09a48296aF');
      await p2pContract.methods
        .isAgentEscrower(window.ethereum.selectedAddress)
        .call()
        .then(result => {
          setViewEscrower(result)
        })
        .catch(err => {
          console.log(err)
          setViewEscrower(false)
        });
    }

    isSeller()
    isEscrower()
  }, []);
  
  return (
    <>
      <div className="History-Main-Container">
        <div className="History-Container">
         <h1 className="History-Tittle">HISTORIAL DE TRANSACCIONES - SPS</h1>
         <div className="History-Table-Container">
            <Table/>
         </div>
        </div>
      </div>
      {viewSeller ? 
        <div className="History-Main-Container">
          <div className="History-Container">
          <h1 className="History-Tittle">HISTORIAL DE COMPRAS/VENTAS</h1>
          <div className="History-Table-Container">
              <TableSellOrders />
          </div>
          </div>
        </div>
      : ""}
      {viewSeller ? 
        <div className="History-Main-Container">
          <div className="History-Container">
          <h1 className="History-Tittle">ORDENES ABIERTAS</h1>
          <div className="History-Table-Container">
              <TableSellOpenOrders />
          </div>
          </div>
        </div>
      : ""}
      {viewSeller ? 
        <div className="History-Main-Container">
          <div className="History-Container">
          <h1 className="History-Tittle">HISTORIA DE ORDENES</h1>
          <div className="History-Table-Container">
              <TableHistoryOrders />
          </div>
          </div>
        </div>
      : ""}
      {viewEscrower ? <div className="History-Main-Container">
        <div className="History-Container">
         <h1 className="History-Tittle">SOLICITUDES DE INTERVENCIÓN</h1>
         <div className="History-Table-Container">
            <TableEscrowerOrders />
         </div>
        </div>
      </div>:""}
    </>
  );
};

export default History;