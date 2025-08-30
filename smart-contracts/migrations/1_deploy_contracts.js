const GreenEnergyToken = artifacts.require("GreenEnergyToken");

module.exports = async function (deployer, network, accounts) {
  const initialOwner = accounts[0];
  await deployer.deploy(GreenEnergyToken, initialOwner);
};
