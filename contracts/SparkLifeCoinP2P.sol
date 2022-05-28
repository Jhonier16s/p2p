pragma solidity 0.4.24;

import './ERC20.sol';
import './Ownable.sol';
import "./SafeMath.sol";

contract SparkLifeP2p is Ownable {
    using SafeMath for uint256;
    
    /**
        _
        Event's
    */
    event EnewOffertSell(address sellerAddress); // cuando un seller agrega una nueva oferta de venta de tokens SPS
    event EBought(address buyerAddress); // Cuando el seller libera los fondos
    event EoffertEscrow(address buyerAddress); // Cuando un buyer acepta oferta de seller (queda a la espera de consignar (el comprador o el vendedor segun el caso))
    event Ewithdraw(address withdrawToAddress, uint256 amount); // cuando un address realiza un retiro

    /**
        _
        Struct's
    */

    // Estructura del deposito
    struct SEscrow {    
        uint256 escrowId;           // index id
        uint type_escrow;           // 0 => buy, 1 => sell
        uint256 spsCopPrice;        // Precio en cop de la oferta (Ejm. 1 SPS = 100 COP)
        uint256 weiAmmount;         // wei value
        address buyer;              // Persona quien realiza el pago
        address seller;             // Persona quien recibe los fondos
        address escrow_agent;       // Agente de transaccion quien resuelve si existe alguna disputa
                                    
        uint256 escrow_fee;            // Fee de la transaccion
        uint256 amount;                // Cantidad de SPS (en Wei) que recibe el vendedor despues de los fees

        bool escrow_intervention;   // El comprador o vendedor pueden llamar la intervencion del agente en la transaccion
        bool release_approval;      // El comprador o Agente (Si escrow_intervention es true) puede aprobar la liberacion de los fondos al vendedor
        bool refund_approval;       // El vendedor o Agente (Si escrow_intervention es true) puede aprobar devolver los fondos al comprador

        bytes32 notes;              //Notas para el vendedor
    }

    // Enlace a la transaccion del comprador
    struct STransaction {                        
        address buyer;     // Persona quien esta realizando el pago
        address seller;
        uint256 escrowId;               
    }

    struct SEscrower {                        
        uint active;     // esta activo
        uint256 fee;        // fee             
    }

    /**
        _
        Variables
    */

    // owner del contrato
    address public owner;

    // Base de datos de Compradores. Cada comprador tiene su propia tabla de registro de transacciones
    // Solo usamos este array para obtener la informacion del escrow cuando es llamado desde el buyer
    mapping(address => STransaction[]) public buyerEscrowDatabase;
    // Registro de transacciones de venta
    mapping(address => SEscrow[]) public sellerEscrowDatabase; 

    // Base de datos del vendedor y del agente escrow
    // mapping(address => STransaction[]) public sellerDatabase;        
    mapping(address => STransaction[]) public escrowDatabase;

    // Mapeo de vendedores
    address[] public sellers;

    //listado de agentes escrow y su respectivo fee
    mapping(address => SEscrower) public escrowers;
            
    /**
        Cada dirección tiene un banco de Fondos.
        Todos los reembolsos, ventas y comisiones de depósito en garantía se envían a este banco.
        El propietario de la dirección puede retirarlos en cualquier momento.
    */
    mapping(address => uint) public Funds;

    /**
        Token SPS
    */
    ERC20 spsToken;

    /**
        _
        Body
    */
    constructor(ERC20 _spsToken) public {
        spsToken = _spsToken;
        owner = msg.sender;
    }

    function() payable public {
    }

    /**
        Agregar un Agente
    */
    function addAgentEscrower(address escrowerAddress, uint256 fee, uint active) public onlyOwner {
        require (escrowerAddress != address(0));
        escrowers[escrowerAddress] = SEscrower(active, fee);
    }

    /**
        Excecuted by: Agent
        Asignar un % de fee para el agente escrow sobre la transaccion
    */
    function setEscrowFee(address escrowerAddress, uint256 fee) public onlyOwner {
        // Rango permitido: 0.1% al 10%, en incrementos de 0.1%
        require (fee >= 1 && fee <= 100);
        escrowers[escrowerAddress].fee = fee;
    }

    /**
        Obtener el fee actual del Escrow agent
    */
    function getEscrowFee(address escrowAddress) constant public returns (uint256) {
        return (escrowers[escrowAddress].fee);
    }

    /**
        Agregar un Seller (Vende SPS por COP - Vende COP por SPS)
    */
    function addSeller(address seller) public onlyOwner {
        // Rango permitido: 0.1% al 10%, en incrementos de 0.1%
        require (seller != address(0));
        sellers.push(seller);
    }

    /*
        Saber si una wallet address es seller
    */
    function isSeller(address seller) public view returns (bool) {
        bool exists = false;
        for (uint i = 0; i < sellers.length; i++) {
            if(sellers[i] == seller)
                exists = true;
        }

        return exists;
    }

     /*
        Saber si una wallet address es Agente Escrower
    */
    function isAgentEscrower(address escrower) public view returns (bool) {
        bool exists = false;
        if(escrowers[escrower].active == 1)
            exists = true;

        return exists;
    }

    modifier onlySeller() {
        uint _isSeller = 0;
        for (uint i = 0; i < sellers.length; i++) {
            if (sellers[i] == msg.sender) {
                _isSeller = 1;
                break;
            }
        }
        require(_isSeller == 1);
        _;
    }
    
    /**
        Excecuted by: Seller
        Funcion encargada de agregar un nuevo deposito para comprar o vender sps

        sellOrBuy: 1 => Sell, 0 => Buy
    */
    function newEscrowSellOrBuy(uint256 weiAmmount, address escrowAddress, bytes32 notes, uint sellOrBuy, uint256 spsCopPrice) public onlySeller returns (bool) {

        require(escrowers[escrowAddress].active == 1, "Escrow Agent invalid or is inactive!");
        // Validar cantidad SPS a vender
        require(weiAmmount > 0 && msg.sender != escrowAddress);

        // 1 = Venta de token SPS (Deposito)
        if (sellOrBuy == 1) {
            require(spsToken.balanceOf(msg.sender) >= weiAmmount, "You don't have SPS Balance");
            // Validar permiso en el contrato SPS coin sobre el contrato actual
            uint256 allowance = spsToken.allowance(msg.sender, address(this));
            require(allowance >= weiAmmount, "Check the token SPS allowance");

            // Depositar el token sps al contrato p2p
            spsToken.transferFrom(msg.sender, address(this), weiAmmount);
        }

        // Guardar los detalles del deposito en memoria
        SEscrow memory currentEscrow;
        currentEscrow.type_escrow = sellOrBuy;
        currentEscrow.escrowId = sellerEscrowDatabase[msg.sender].length;
        currentEscrow.seller = msg.sender;
        currentEscrow.escrow_agent = escrowAddress;
        currentEscrow.spsCopPrice = spsCopPrice;
        currentEscrow.weiAmmount = weiAmmount;

        // Calcular y guardar el fee del deposito
        currentEscrow.escrow_fee = getEscrowFee(escrowAddress)*weiAmmount/1000;        
        //0.25% owner fee (CAMBIAR)
        uint owner_fee = weiAmmount/400;
        Funds[owner] += owner_fee;   

        // Cantidad que el comprador recibe = Total amount - 0.25% owner fee - Escrow Fee
        currentEscrow.amount = weiAmmount.sub(owner_fee);
        currentEscrow.amount = currentEscrow.amount.sub(currentEscrow.escrow_fee);
        // Notas del comprador al vendedor
        currentEscrow.notes = notes;
        sellerEscrowDatabase[msg.sender].push(currentEscrow);

        emit EnewOffertSell(msg.sender);
        return true;
    }

    /**
        Excecuted by: COMPRADOR (BUYER)
        Aplicar a una oferta de compra a la oferta un vendedor (SPS to COP - COP to SPS)
        En este caso, el comprador (buyer) debe de enviar el fiat o SPS al vendedor
    */
    function offertEscrow(address sellerAddress, uint ID) public returns (bool) {

        require(ID < sellerEscrowDatabase[sellerAddress].length && 
        sellerEscrowDatabase[sellerAddress][ID].release_approval == false &&
        sellerEscrowDatabase[sellerAddress][ID].refund_approval == false);

        STransaction memory currentTransaction;
        sellerEscrowDatabase[sellerAddress][ID].buyer = msg.sender;

        // si es una venta (seller vende sps)
        // el comprador debe depositar sps
        if (sellerEscrowDatabase[sellerAddress][ID].type_escrow == 0) {

            uint256 weiDeposit = sellerEscrowDatabase[sellerAddress][ID].weiAmmount;
            assert(weiDeposit > 0);
            require(spsToken.balanceOf(msg.sender) >= weiDeposit, "You don't have SPS Balance");

            // Validar permiso en el contrato SPS coin sobre el contrato actual
            uint256 allowance = spsToken.allowance(msg.sender, address(this));
            require(allowance >= weiDeposit, "Check the token SPS allowance");

            // Depositar el token sps al contrato p2p
            require(spsToken.transferFrom(msg.sender, address(this), weiDeposit), "Can't deposit SPS");
        }

        // Vincula esta transacción a la lista de transacciones del vendedor y Agente Escrow
        currentTransaction.buyer = msg.sender;
        currentTransaction.seller = sellerAddress;
        currentTransaction.escrowId = ID;

        // sellerDatabase[sellerAddress].push(currentTransaction);
        escrowDatabase[sellerEscrowDatabase[sellerAddress][ID].escrow_agent].push(currentTransaction);
        // copy escrow al buyer (Obtener SellerEscrow by Buyer)
        buyerEscrowDatabase[msg.sender].push(currentTransaction);

        emit EoffertEscrow(msg.sender);
        return true;
    }

    /**
        Excecuted by: Seller & buyer
        Cuando se haya completado la transaccion (es decir, que el buyer haya consignado)
        el seller liberará los fondos al buyer
        Aun si EscrowEscalation esta activo, el seller podra aprobar la liberacion de los fondos en cualquier momento
    */
    function fundRelease(address sellerAddress, uint ID) public {

        require(ID < sellerEscrowDatabase[sellerAddress].length && 
        sellerEscrowDatabase[sellerAddress][ID].release_approval == false &&
        sellerEscrowDatabase[sellerAddress][ID].refund_approval == false);
        
        // Asignar release_approval en true. 
        // esto asegura que la aprobacion de la transaccion solo se puede hacer 1 vez.
        sellerEscrowDatabase[sellerAddress][ID].release_approval = true;

        address buyer = sellerEscrowDatabase[sellerAddress][ID].buyer;
        address escrow_agent = sellerEscrowDatabase[sellerAddress][ID].escrow_agent;

        uint amount = sellerEscrowDatabase[sellerAddress][ID].amount;
        uint escrow_fee = sellerEscrowDatabase[sellerAddress][ID].escrow_fee;

        // Si el vendedor esta comprando SPS
        if (sellerEscrowDatabase[sellerAddress][ID].type_escrow == 0) {
            // El seller no puede liberar los fondos
            require(buyer == msg.sender, "Waiting buyer found release");
            Funds[sellerAddress] += amount;
        }
        else {
            // la liberacion se hace al buyer
            require(sellerAddress == msg.sender, "Only Seller can release founds");
            Funds[buyer] += amount;
        }

        Funds[escrow_agent] += escrow_fee;
        emit EBought(buyer);
    }

    /*
        Excecuted only by: Seller
        Cancelar una orden
        Solo se puede cancelar si no se ha ejecutado y si aun no tiene comprador
    */
    function cancelOrder(address sellerAddress, uint ID) public onlySeller {

        require(ID < sellerEscrowDatabase[sellerAddress].length && 
            sellerEscrowDatabase[sellerAddress][ID].release_approval == false &&
            sellerEscrowDatabase[sellerAddress][ID].refund_approval == false &&
            msg.sender == sellerAddress &&
            sellerEscrowDatabase[sellerAddress][ID].buyer == address(0)
        );
        
        // Cambiar de estado a reembolso
        sellerEscrowDatabase[sellerAddress][ID].refund_approval = true;
        sellerEscrowDatabase[sellerAddress][ID].buyer = sellerAddress;

        // Si el vendedor depositó SPS, devolverlos
        if(sellerEscrowDatabase[sellerAddress][ID].type_escrow == 1) {
            // Reembolsar el total de la cantidad enviada
            uint amount = sellerEscrowDatabase[sellerAddress][ID].weiAmmount;
            Funds[sellerAddress] += amount;
        }

        // emit EBought(sellerAddress);
    }

    /**
        Historial de ventas esperando por aprobacion
        action = 1 approve, 0 = actives
        La accion es para saber que tipo de registros se va a devolver
         - 1 Registros para aprobar (que tienen un comprador)
         - 0 Registros activos listos para aplicar a la oferta
         - 2 History
    **/
    function getSellerOrdersToApproveOrActive(address sellerAddress, uint action, uint numToLoad) constant public returns (uint[], uint[], bytes32[], uint[]){

        address _seller = sellerAddress;
        uint _startID = 0;
        uint loadingTransactionLength = 0;
        uint length;
        if (sellerEscrowDatabase[_seller].length < numToLoad)
            length = sellerEscrowDatabase[_seller].length;        
        else 
            length = numToLoad;
        
        // address[] memory buyers = new address[](length);
        // address[] memory escrow_agents = new address[](length);
        uint[] memory amounts = new uint[](length);
        uint[] memory escrow_types = new uint[](length);
        bytes32[] memory statuses = new bytes32[](length);
        uint[] memory ids = new uint[](numToLoad);
        
        for (uint i = 0; i < length; i++) {
            if (action == 1) {                
                if (
                    sellerEscrowDatabase[_seller][_startID + i].release_approval == false &&
                    sellerEscrowDatabase[_seller][_startID + i].refund_approval == false && 
                    sellerEscrowDatabase[_seller][_startID + i].buyer != address(0)
                ) {
                    escrow_types[loadingTransactionLength] = (sellerEscrowDatabase[_seller][_startID + i].type_escrow);
                    amounts[loadingTransactionLength] = (sellerEscrowDatabase[_seller][_startID + i].amount);
                    statuses[loadingTransactionLength] = checkStatus(_seller, sellerEscrowDatabase[_seller][_startID + i].escrowId);
                    ids[loadingTransactionLength] = (sellerEscrowDatabase[_seller][_startID + i].escrowId);
                    loadingTransactionLength++;
                } else {
                    if(sellerEscrowDatabase[_seller].length > length)
                        length++;
                }
            } else if (action == 0) {
                if (
                    sellerEscrowDatabase[_seller][_startID + i].release_approval == false &&
                    sellerEscrowDatabase[_seller][_startID + i].refund_approval == false && 
                    sellerEscrowDatabase[_seller][_startID + i].buyer == address(0)
                ) {
                    escrow_types[loadingTransactionLength] = (sellerEscrowDatabase[_seller][_startID + i].type_escrow);
                    amounts[loadingTransactionLength] = (sellerEscrowDatabase[_seller][_startID + i].amount);
                    statuses[loadingTransactionLength] = checkStatus(_seller, sellerEscrowDatabase[_seller][_startID + i].escrowId);
                    ids[loadingTransactionLength] = (sellerEscrowDatabase[_seller][_startID + i].escrowId);
                    loadingTransactionLength++;
                } else {
                    if(sellerEscrowDatabase[_seller].length > length)
                        length++;
                }
            } else if (action == 2) {
                if (
                    (sellerEscrowDatabase[_seller][_startID + i].release_approval == true ||
                    sellerEscrowDatabase[_seller][_startID + i].refund_approval == true) && 
                    sellerEscrowDatabase[_seller][_startID + i].buyer != address(0)
                ) {
                    escrow_types[loadingTransactionLength] = (sellerEscrowDatabase[_seller][_startID + i].type_escrow);
                    amounts[loadingTransactionLength] = (sellerEscrowDatabase[_seller][_startID + i].amount);
                    statuses[loadingTransactionLength] = checkStatus(_seller, sellerEscrowDatabase[_seller][_startID + i].escrowId);
                    ids[loadingTransactionLength] = (sellerEscrowDatabase[_seller][_startID + i].escrowId);
                    loadingTransactionLength++;
                } else {
                    if(sellerEscrowDatabase[_seller].length > length)
                        length++;
                }
            } else {
                // Si se envia un valor diferente de 1 o 0
                break;
            }
        }
        
        return (escrow_types, amounts, statuses, ids);
    }

    /**
        Obtener el listado de ofertas (Compra y venta) que aun no tienen un comprador
    */
    function marketBuyOrSellOrders(uint numToLoad, uint action) constant public returns (address[], address[],uint256[], bytes32[], uint[]){

        uint loadingTransactionLength = 0;
        address[] memory _sellers = new address[](numToLoad);
        address[] memory escrow_agents = new address[](numToLoad);
        uint256[] memory amounts = new uint256[](numToLoad);
        bytes32[] memory statuses = new bytes32[](numToLoad);
        uint[] memory ids = new uint[](numToLoad);
        
        // recorrer los vendedores
        for (uint i = 0; i < sellers.length; i++)
        {
            if(loadingTransactionLength >= numToLoad)
                break;
            // recorrer las transacciones del vendedor actual
            for(uint k = 0; k < sellerEscrowDatabase[sellers[i]].length; k++) {
                // validar el estado de la transaccion (ordenes abiertas)
                if(
                    loadingTransactionLength < numToLoad &&
                    sellerEscrowDatabase[sellers[i]][k].buyer == address(0) &&
                    sellerEscrowDatabase[sellers[i]][k].type_escrow == action
                ) {
                    _sellers[loadingTransactionLength] = (sellers[i]);
                    escrow_agents[loadingTransactionLength] = (sellerEscrowDatabase[sellers[i]][k].escrow_agent);
                    amounts[loadingTransactionLength] = (sellerEscrowDatabase[sellers[i]][k].amount);
                    statuses[loadingTransactionLength] = checkStatus(sellers[i], sellerEscrowDatabase[sellers[i]][k].escrowId);
                    ids[loadingTransactionLength] = (sellerEscrowDatabase[sellers[i]][k].escrowId);
                    loadingTransactionLength++;
                }
            }
        }
        
        return (_sellers, escrow_agents, amounts, statuses, ids);
    }

    // Obtener especificamente una transaccion de venta o compra
    function getSpecificSellOrBuyTransaction(address sellerAddress, uint ID) constant public returns (address, address, uint256, bytes32, uint, bytes32, uint256) {
        bytes32 status;
        SEscrow memory sellerTransaction;
        sellerTransaction = sellerEscrowDatabase[sellerAddress][ID];
        status = checkStatus(sellerAddress, ID);
        return (sellerTransaction.seller, sellerTransaction.escrow_agent, sellerTransaction.amount, status, sellerTransaction.escrowId, sellerTransaction.notes, sellerTransaction.spsCopPrice);
    }

    // Obtener especificamente una transaccion de venta o compra
    function getEscrowerTransactions(address escrowerAddress) constant public returns (address[], address[], uint[]) {
        STransaction[] memory escrowerPendings;
        escrowerPendings = escrowDatabase[escrowerAddress];

        address[] memory _sellers = new address[](escrowerPendings.length);
        address[] memory _buyers = new address[](escrowerPendings.length);
        uint[] memory ids = new uint[](escrowerPendings.length);
        uint indexTransaction = 0;

        for(uint j = 0; j < escrowerPendings.length; j++) {
            if (
                sellerEscrowDatabase[escrowerPendings[j].seller][escrowerPendings[j].escrowId].release_approval == false &&
                sellerEscrowDatabase[escrowerPendings[j].seller][escrowerPendings[j].escrowId].refund_approval == false &&
                sellerEscrowDatabase[escrowerPendings[j].seller][escrowerPendings[j].escrowId].escrow_intervention == true
            ) {
                _sellers[indexTransaction] = (escrowerPendings[j].seller);
                _buyers[indexTransaction] = (escrowerPendings[j].buyer);
                ids[indexTransaction] = j;
                indexTransaction++;
            }
        }

        return (_sellers, _buyers, ids);
    }

    /*
        Obtener el historial de compras de una Wallet
    */
    function getBuyerTransaction(address buyerAddress, uint maxLoad) constant public returns (address[], uint[], bytes32[], uint[], uint[]) {
        
        address[] memory _sellers = new address[](maxLoad);
        uint[] memory amounts = new uint[](maxLoad);
        bytes32[] memory statuses = new bytes32[](maxLoad);
        uint[] memory ids = new uint[](maxLoad);
        uint[] memory type_escrow = new uint[](maxLoad);
        // address[] memory escrow_agents = new address[](maxLoad);
        address buyer = buyerAddress;
        
        for(uint j = 0; j < buyerEscrowDatabase[buyer].length; j++) {
            if(j < maxLoad){
                uint256 _escrowId = buyerEscrowDatabase[buyer][j].escrowId;
                address _seller = buyerEscrowDatabase[buyer][j].seller;
                
                _sellers[j] = (_seller);
                // escrow_agents[j] = (sellerEscrowDatabase[_seller][_escrowId].escrow_agent);
                amounts[j] = (sellerEscrowDatabase[_seller][_escrowId].amount);
                statuses[j] = checkStatus(_seller, _escrowId);
                ids[j] = (_escrowId);
                type_escrow[j] = (sellerEscrowDatabase[_seller][_escrowId].type_escrow);
            } else {
                break;
            }
        }
        return (_sellers, amounts, statuses, ids, type_escrow);
    }

    /**
        _
        Agent functions
    */

    /**
        Tanto el comprador como el vendedor pueden escalar la transaccion a un Agente Escrow 
        Una vez se activa la escalada, el agente puede liberar los fondos al comprador o reembolsar saldo al vendedor 
        Switcher = 0 for Buyer, Switcher = 1 for Seller
        Si es llamada por el buyer, se debe de enviar el id del buyerDB  y no del seller, es porque se debe de llamar desde el listado de buyer que tiene IDs diferentes a los de seller
        si es llamada por el seller, el id es el id del escrow del sellerDB
    */
    function EscrowEscalation(address sellerAddress, uint escrowId) public {
        // Para activar EscrowEscalation
        //1) El vendedor no ha aprobado la liberacion de los fondos.
        //2) El comprador no ha enviado o consignado el valor de la compra.
        //3) EscrowEscalation es activo por primera vez

        require(sellerEscrowDatabase[sellerAddress][escrowId].escrow_intervention == false  &&
            sellerEscrowDatabase[sellerAddress][escrowId].release_approval == false &&
            sellerEscrowDatabase[sellerAddress][escrowId].refund_approval == false);

        //Activate the ability for Escrow Agent to intervent in this transaction
        sellerEscrowDatabase[sellerAddress][escrowId].escrow_intervention = true;
        
    }

    /**
        El Agente toma una desicion
        Decision = 0 devolver fondos
        Decision = 1 Liberar fondos
        ID El id de la transaccion del Escrow history
    */
    function escrowDecision(uint ID, uint Decision) public {

        // El Agente escrow solo puede tomar la desicion si:
        //1) Seller no ha aprobado la liberacion de los fondos al buyer
        //2) El buyer no ha reembolsado al seller
        //3) El agente no ha aprovado la liberacion de los fondos al buyer y no se a aprobado un reembolso al seller
        //4) Escalation Escalation es activated

        address buyerAddress = escrowDatabase[msg.sender][ID].buyer;
        address sellerAddress = escrowDatabase[msg.sender][ID].seller;
        uint256 escrowID = escrowDatabase[msg.sender][ID].escrowId;

        require(
            buyerAddress != address(0) &&
            sellerEscrowDatabase[sellerAddress][escrowID].release_approval == false &&
            sellerEscrowDatabase[sellerAddress][escrowID].escrow_intervention == true &&
            sellerEscrowDatabase[sellerAddress][escrowID].refund_approval == false);
        
        uint escrow_fee = sellerEscrowDatabase[sellerAddress][escrowID].escrow_fee;
        uint amount = sellerEscrowDatabase[sellerAddress][escrowID].amount;

        if (Decision == 0) { // Reembolsar SPS al seller o buyer
            // si el seller esta vendiendo SPS
            if (sellerEscrowDatabase[sellerAddress][escrowID].type_escrow == 1) {
                sellerEscrowDatabase[sellerAddress][escrowID].refund_approval = true;
                Funds[sellerAddress] += amount;
            }
            else { // en este caso se devuelve lo que depositó (SPS) el comprador
                sellerEscrowDatabase[sellerAddress][escrowID].refund_approval = true;
                Funds[buyerAddress] += amount;
            }
        } else if (Decision == 1) { // Liberar fondos al Buyer o Seller
            if (sellerEscrowDatabase[sellerAddress][escrowID].type_escrow == 1) {
                sellerEscrowDatabase[sellerAddress][escrowID].release_approval = true;
                Funds[buyerAddress] += amount;
            }
            else { // Liberar fondos al seller (comprando SPS)
                sellerEscrowDatabase[sellerAddress][escrowID].release_approval = true;
                Funds[sellerAddress] += amount;
            }
        }
        Funds[msg.sender] += escrow_fee;
    }

    /**
        Retiros SPS
    */
    function WithdrawFunds() public {
        // Validar saldo
        require(spsToken.balanceOf(address(this)) > 0, "P2P Contract don't have founds");

        uint amount = Funds[msg.sender];
        Funds[msg.sender] = 0;
        if (!spsToken.transfer(msg.sender, amount))
            Funds[msg.sender] = amount;
    }

    /**
        Estado de cada transaccion
    */
    function checkStatus(address sellerAddress, uint nounce) constant public returns (bytes32){

        bytes32 status = "";

        if (sellerEscrowDatabase[sellerAddress][nounce].release_approval){
            status = "Completado";
        } else if (sellerEscrowDatabase[sellerAddress][nounce].refund_approval){
            status = "Reembolsado";
        } else if (sellerEscrowDatabase[sellerAddress][nounce].escrow_intervention){
            status = "Elevado a Árbitro";
        } else
        {
            status = "En Progreso";
        }

        return (status);
    }

}