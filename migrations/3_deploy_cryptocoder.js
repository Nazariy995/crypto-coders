var CryptoCoder = artifacts.require("./CryptoCoder.sol");

module.exports = function(deployer) {
  deployer.deploy(CryptoCoder);
};
