const hre = require("hardhat");

async function main() {

  const callingContract = await hre.ethers.getContractFactory("callingContract");
  const emitWinner = await hre.ethers.getContractFactory("emitWinner");

  const callingcontract = await callingContract.deploy();
  const emitwinner = await emitWinner.deploy();

  await callingcontract.deployed();
  await emitwinner.deployed();

  emitWinnerAddress = emitwinner.address;
  const [me] = await ethers.getSigners()
  console.log(`Emit winner Address: ${emitWinnerAddress}`);
  console.log(`My address: ${me.address}`);

  const result = await callingcontract.callemitWinner(emitWinnerAddress);


  const receipt = await result.wait();

  console.log(receipt.events);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
