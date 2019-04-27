import $ from 'jquery'; 
import Web3 from 'web3'; 
import TruffleContract from 'truffle-contract'; 
import artifact from '../../../contracts/BuyGoods.sol'; 
import { renderTransactions } from './render';
import { getAccount, getTransactions } from './actions';

class App { 
  constructor(config) { 
    this.config = config; 
  }

  setup() { 
    const { ethereumUrl } = this.config; 
    const web3 = new Web3(new Web3.providers.HttpProvider(ethereumUrl));

    const Transaction = new TruffleContract(artifact);
    Transaction.setProvider(web3.currentProvider);

    const networks = Object.keys(artifact.networks);
    const network = networks[networks.length - 1];
    const address = artifact.networks[network].address;

    this.web3 = web3;
    this.address = address;
    this.Transaction = Transaction;
    this.$transactions = $('#transactions');
    this.$newTransaction = $('#new-transaction');
    this.$transactionEvent = $('#transaction-eventName');
    this.$transactionDonation = $('#transaction-donation');
    this.$transactionDonator = $('transaction-donator');
    this.$transactionSupplier = $('transaction-supplier');

    return new Promise((resolve, reject) => {
      getAccount(this.web3)
      .then((account) => {
        this.account = account;
        return Transaction.at(address);
      })
      .then((transaction) => {
         this.transaction = transaction;
         resolve(transaction);
      })
      .catch((error) => {
        reject(error);
      });
    });   
  }

  init() { 
    this.$newTransaction.on('submit', (event) => {
      event.preventDefault();

      this.transaction.createTransaction(
        this.$transactionEvent.val(),
        this.$transactionDonation.val(),
        this.$transactionDonator.val(),
        this.$transactionSupplier.val(),
      ).then(() => {
        console.log('Transaction created!');
      })
      .catch((error) => {
        console.log(`Oops... There was an error: ${error}`);
      });
    });

    return new Promise((resolve, reject) => { 
      getTransactions(this.transaction)
      .then((transactions) => { 
        renderTransactions(this.$transactions, transactions);  
      }); 
    }); 
  } 
}

export default App;