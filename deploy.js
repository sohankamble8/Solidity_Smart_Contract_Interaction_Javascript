const ethers = require("ethers");
require("dotenv").config();
const fs = require("fs");

async function main() {
  const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
  const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;

  const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL);
  const wallet = new ethers.Wallet(GOERLI_PRIVATE_KEY, provider);
  const ABI = fs.readFileSync("SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const Binary = fs.readFileSync("SimpleStorage_sol_SimpleStorage.bin", "utf8");
  const contractFactory = new ethers.ContractFactory(ABI, Binary, wallet);
  console.log("Deploying contract, Please wait...");
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);
  const favouriteNumber = await contract.getFavouriteNumber();
  console.log("Initial Favourite Number is ", favouriteNumber.toString());
  const txResponse = await contract.store("7");
  const txReceipts = await txResponse.wait(1);
  //   favouriteNumber = await contract.getFavouriteNumber();
  const updatedFavouriteNumber = await contract.getFavouriteNumber();
  console.log(
    "Updated Favourite Number is ",
    updatedFavouriteNumber.toString()
  );
  console.log("Deployed Contract Address: ", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
