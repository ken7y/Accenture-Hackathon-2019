pragma solidity ^0.5.0;

// code based on https://github.com/jklepatch/eattheblocks/blob/master/special-episode-1/step3/contracts/ToDo.sol 

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
	address public admin; // the administration - we can cancel the funds
	bool paid;
	enum State { Created, Locked, Inactive }
	State public state;

	// Create the contract 
	constructor(string memory eN, address payable s, uint t) 
		payable
		public  
	{
		supplier = s;
		eventName = eN;
		admin = msg.sender;
		paid = false;
		threshold = t;
	}

	modifier condition(bool _condition) {
		require(_condition);
		_;
	}

	modifier onlyAdmin() {
		require(
			msg.sender == admin,
			'Only the admin can call this.'
		);
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

	// Cancel the donations if threshold not met, can only do as admin
	function cancel()
		public
		onlyAdmin()
		inState(State.Created) 
	{
		emit Cancelled();
		state = State.Inactive;
		uint len = donators.length;
		// refund all donators how much they donated if the threshold is not met
		for (uint i = 0; i < len; i++) {
			donators[i].dAddr.transfer(donators[i].value);
		}
	}

	function addDonation()
		public
		payable
	{
		emit DonationAdded();
		donators.push(Donator( { 
			dAddr: msg.sender,
			value: msg.value
		}));
		total += msg.value;
		if (total >= threshold) {
			emit ThresholdReached();
		}
	}

	function getTotal() public returns (uint){
		return total;
	}

}