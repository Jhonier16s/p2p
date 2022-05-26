import React, { useState, useEffect } from "react";
import OptionsBar from "../OptionsBar";
import Offers from "../Offers";

const SellSps = () => {
  const [buyTrades, setBuyTrades] = useState([]);
  // Listado tipo sell typetrade=1 - para usuario final comprar
  const parseList = (response) => {
    let result = []
    let totalRows = response[0][0].split(",").length

    for(let i = 0; i < totalRows; i++){
      result[i] = {}
      result[i]["id"] = parseInt(response[4][i])
      result[i]["typetrade"] = "Sell"
      result[i]["coin"] = "SPS"
      result[i]["city"] = "dwad"
      result[i]["country_id"] = 1
      result[i]["currency"] = "COP"
      result[i]["user_first"] = ""
      result[i]["user_second"] = ""
      result[i]["payment_method_id"] = 1
      result[i]["extra_info_payment"] = "Nequi"
      result[i]["status_trade"] = window.web3.utils.toAscii(response[3][i])
      result[i]["created_at"] = "2022-04-28T17:38:52.347Z"
      result[i]["updated_at"] = "2022-04-28T17:38:52.347Z"
      result[i]["pricetrade"] = response[2][i]/1000000000000000000
    }
    return result
  }
  
  useEffect(() => {
    const getBuyTrades = async () => {
      const p2pAbi = [	{		"constant": false,		"inputs": [			{				"name": "escrowerAddress",				"type": "address"			},			{				"name": "fee",				"type": "uint256"			},			{				"name": "active",				"type": "uint256"			}		],		"name": "addAgentEscrower",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "seller",				"type": "address"			}		],		"name": "addSeller",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "ID",				"type": "uint256"			},			{				"name": "Decision",				"type": "uint256"			}		],		"name": "escrowDecision",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "switcher",				"type": "uint256"			},			{				"name": "buyerID",				"type": "uint256"			}		],		"name": "EscrowEscalation",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "sellerAddress",				"type": "address"			},			{				"name": "ID",				"type": "uint256"			}		],		"name": "fundRelease",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "weiAmmount",				"type": "uint256"			},			{				"name": "escrowAddress",				"type": "address"			},			{				"name": "notes",				"type": "bytes32"			},			{				"name": "sellOrBuy",				"type": "uint256"			},			{				"name": "spsCopPrice",				"type": "uint256"			}		],		"name": "newEscrowSellOrBuy",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "sellerAddress",				"type": "address"			},			{				"name": "ID",				"type": "uint256"			}		],		"name": "offertEscrow",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "renounceOwnership",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "escrowerAddress",				"type": "address"			},			{				"name": "fee",				"type": "uint256"			}		],		"name": "setEscrowFee",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_newOwner",				"type": "address"			}		],		"name": "transferOwnership",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "WithdrawFunds",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"inputs": [			{				"name": "_spsToken",				"type": "address"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "constructor"	},	{		"payable": true,		"stateMutability": "payable",		"type": "fallback"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "sellerAddress",				"type": "address"			}		],		"name": "EnewOffertSell",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "buyerAddress",				"type": "address"			}		],		"name": "EBought",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "buyerAddress",				"type": "address"			}		],		"name": "EoffertEscrow",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "withdrawToAddress",				"type": "address"			},			{				"indexed": false,				"name": "amount",				"type": "uint256"			}		],		"name": "Ewithdraw",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "previousOwner",				"type": "address"			}		],		"name": "OwnershipRenounced",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "previousOwner",				"type": "address"			},			{				"indexed": true,				"name": "newOwner",				"type": "address"			}		],		"name": "OwnershipTransferred",		"type": "event"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "address"			},			{				"name": "",				"type": "uint256"			}		],		"name": "buyerEscrowDatabase",		"outputs": [			{				"name": "buyer",				"type": "address"			},			{				"name": "seller",				"type": "address"			},			{				"name": "escrowId",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "maxToLoad",				"type": "uint256"			}		],		"name": "buyerEscrowHistory",		"outputs": [			{				"name": "",				"type": "address[]"			},			{				"name": "",				"type": "uint256[]"			},			{				"name": "",				"type": "bytes32[]"			},			{				"name": "",				"type": "uint256[]"			},			{				"name": "",				"type": "uint256[]"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "sellerAddress",				"type": "address"			},			{				"name": "nounce",				"type": "uint256"			}		],		"name": "checkStatus",		"outputs": [			{				"name": "",				"type": "bytes32"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "address"			},			{				"name": "",				"type": "uint256"			}		],		"name": "escrowDatabase",		"outputs": [			{				"name": "buyer",				"type": "address"			},			{				"name": "seller",				"type": "address"			},			{				"name": "escrowId",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "address"			}		],		"name": "escrowers",		"outputs": [			{				"name": "active",				"type": "uint256"			},			{				"name": "fee",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "address"			}		],		"name": "Funds",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "escrowAddress",				"type": "address"			}		],		"name": "getEscrowFee",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "numToLoad",				"type": "uint256"			},			{				"name": "action",				"type": "uint256"			}		],		"name": "marketBuyOrSellOrders",		"outputs": [			{				"name": "",				"type": "address[]"			},			{				"name": "",				"type": "address[]"			},			{				"name": "",				"type": "uint256[]"			},			{				"name": "",				"type": "bytes32[]"			},			{				"name": "",				"type": "uint256[]"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "numTransactions",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "owner",		"outputs": [			{				"name": "",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "address"			},			{				"name": "",				"type": "uint256"			}		],		"name": "sellerEscrowDatabase",		"outputs": [			{				"name": "escrowId",				"type": "uint256"			},			{				"name": "type_escrow",				"type": "uint256"			},			{				"name": "spsCopPrice",				"type": "uint256"			},			{				"name": "weiAmmount",				"type": "uint256"			},			{				"name": "buyer",				"type": "address"			},			{				"name": "seller",				"type": "address"			},			{				"name": "escrow_agent",				"type": "address"			},			{				"name": "escrow_fee",				"type": "uint256"			},			{				"name": "amount",				"type": "uint256"			},			{				"name": "escrow_intervention",				"type": "bool"			},			{				"name": "release_approval",				"type": "bool"			},			{				"name": "refund_approval",				"type": "bool"			},			{				"name": "notes",				"type": "bytes32"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "uint256"			}		],		"name": "sellers",		"outputs": [			{				"name": "",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	}];
      const p2pContract = await new window.web3.eth.Contract(p2pAbi, '0xDEa7ef7D658DFEB186Fa9b8ff6c0A68f893aFD2b');
        return await p2pContract.methods
          .marketBuyOrSellOrders(20, 1)
          .call()
          .then(result => {
            console.log(result);
            setBuyTrades(parseList(result));
          })
          .catch(err => {
            console.log(err);
          });
    }
    getBuyTrades();
  }, []);

  
  return (
    <>
      <OptionsBar tittleBar="Vender Sparklife" />
      {buyTrades.map((trade, index) => {
        return (
          <Offers
            key={index}
            option="Vender"
            typeTrade={trade.typetrade}
            coin={trade.coin}
            currency={trade.currency}
            city={trade.city}
            id={trade.id}
            pricetrade={trade.pricetrade}
            buy_sell="/sellConfirm/"
          />
        );
      })}
    </>
  );
};

export default SellSps;
