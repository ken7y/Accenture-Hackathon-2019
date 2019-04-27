var Transaction = artifacts.require("./BuyGoods.sol");

module.exports = function(deployer) {
  deployer.deploy(Transaction);
};
