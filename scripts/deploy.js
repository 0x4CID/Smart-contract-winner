// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
require('dotenv').config()

async function main() {

  const url = process.env.GOERLI_URL;
  console.log(url);

  let artifacts = await hre.artifacts.readArtifact("callingContract");

  const provider = new ethers.providers.JsonRpcProvider(url);

  let privateKey = process.env.PRIVATE_KEY;

  let wallet = new ethers.Wallet(privateKey, provider);

  let factory = new ethers.ContractFactory(artifacts.abi,artifacts.bytecode, wallet);

  const callingContract = await factory.deploy();
  //const emitWinner = await hre.ethers.getContractFactory("emitWinner");

  console.log("callingContract address:", callingContract.address);

  //const emitwinner = await emitWinner.deploy();

  await callingContract.deployed();
  
  let result = await callingContract.callemitWinner();

  const receipt = await result.wait();

  console.log(receipt.events);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
