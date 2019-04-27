pragma solidity ^0.5.0;

// code based on https://github.com/jklepatch/eattheblocks/blob/master/special-episode-1/step3/contracts/ToDo.sol 

contract buyGoods {
	struct Transaction {
		uint id;
		string eventName;	// date + location of the disaster 
		uint donation;		// use 2 decimals places (*10^2)
		string donator;
		string supplier;	// public key
		bool done;
	}
	
	uint lastTransactionId;
	uint[] transactionIds;
	mapping(uint => Transaction) transactions; 
	
	event TransactionCreated(uint, string, uint, string, string, bool); 

	constructor() public {
		lastTransactionId = 0; 
	}

	function createTransaction(string memory _eventName, uint _donation, string memory _donator, string memory _supplier) public {
		lastTransactionId++;
		transactions[lastTransactionId] = Transaction(lastTransactionId, _eventName, _donation, _donator, _supplier, false); 
		transactionIds.push(lastTransactionId);
		emit TransactionCreated(lastTransactionId, _eventName, _donation, _donator, _supplier, false); 
	}

	function getTransactionIds() public view returns(uint[] memory) {
		return transactionIds;
	}

	// read-only function, fetch task to display
	function getTransaction(uint id) transactionExists(id) public view
		returns(
			uint,
			string memory,
			uint,
			string memory,
			string memory,
			bool
		) {

			return(
				id,
				transactions[id].eventName,
				transactions[id].donation,
				transactions[id].donator,
				transactions[id].supplier,
				transactions[id].done
			);
		}

	modifier transactionExists(uint id) {
		if(transactions[id].id == 0) {
			revert();
		}
		_;
	}

	//function addTask()

	//function triggerEvent()
}
