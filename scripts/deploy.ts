const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying LegacyLedger contract...");

  const [deployer] = await ethers.getSigners();
  const LegacyLedger = await ethers.getContractFactory("LegacyLedger");
  const legacyLedger = await LegacyLedger.deploy();

  await legacyLedger.waitForDeployment();
  const address = await legacyLedger.getAddress();

  console.log(`LegacyLedger deployed to: ${address}`);
  console.log("\nVerify contract on Etherscan:");
  console.log(`npx hardhat verify --network sepolia ${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 