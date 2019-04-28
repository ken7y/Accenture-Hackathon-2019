var buyGoods = artifacts.require("./BuyGoods.sol");

module.exports = function(deployer) {
  console.log(buyGoods.getTotal());
};
