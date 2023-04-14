var Certifiacte = artifacts.require("Certificate.sol");

module.exports = function(deployer) {
  deployer.deploy(Certifiacte);
};