pragma solidity ^0.5.0;

contract buyGoods {
	string eventName;
	uint public total;
	struct Donator {
		address payable dAddr; // donator's address
		uint value; // how much the donator has donated
	}
	uint public threshold;
	Donator[] public donators; // the buyers
	address payable public supplier; // the seller
	bool paid;
	enum State { Created, Locked, Inactive }
	State public state;

	// Create the contract 
	constructor(string memory _eventName, address payable _supplier, uint _threshold) 
		payable
		public  
	{
		supplier = _supplier;
		eventName = _eventName;
		threshold = _threshold;
		total = 0;
	}

	modifier condition(bool _condition) {
		require(_condition);
		_;
	}

	modifier inState(State _state) {
        require(
            state == _state,
            "Invalid state."
        );
        _;
    }

	event Cancelled();
	event DonationAdded();
	event ThresholdReached();
	//event PurchaseConfirmed();

	function addDonation()
		public
		payable
	{
		emit DonationAdded();
		donators.push(Donator( { 
			dAddr: msg.sender,
			value: msg.value
		}));
		total = total + msg.value;
		if (total >= threshold) {
			emit ThresholdReached();
		}
	}


}