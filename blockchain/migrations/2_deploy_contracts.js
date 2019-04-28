var buyGoods = artifacts.require("./BuyGoods.sol");

module.exports = function(deployer) {
  deployer.deploy(buyGoods, "QLD Flood", "0x9c918D66f72eBf6A0Bd6ccE6E301dF5E503d4d64", 10000);
  console.log(buyGoods.getTotal());
};
