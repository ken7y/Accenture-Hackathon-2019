const getAccount = (web3) => {
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((error, accounts) => {
      if(typeof error === null) {
        return reject(error);
      }
      resolve(accounts[0]);
    });
  });
}

const getTransactions = (todo) => {
  return new Promise((resolve, reject) => {
    todo.getTransactionIds()
    .then((transactionIds) => {
      const promises = [];
      transactionIds.forEach((transsactionId) => {
        promises.push(todo.getTransactions(transsactionId));
      });
      return Promise.all(promises);
    })
    .then((transactions) => {
      resolve(transactions);
    })
    .catch((error) => {
      reject(error);
    });
  });
};

export {
  getAccount,
  getTransactions
};
