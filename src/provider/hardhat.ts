import { artifacts, ethers, web3 } from "hardhat";
const api = require('etherscan-api').init(process.env.ETHERSCAN_API, 'ropsten')

async function tokenContractFunctions() {
  const Token = await ethers.getContractFactory("Token")
    .catch((err: any) => console.log('erro em obter token', err.message));

  const token = await (Token as any).deploy()
    .catch((err: any) => console.log('erro no deploy', err.message));

  console.log("Token address:", token?.address);

  const transaction = await token.transfer('0xc4a7d833700b8339f9E64e80CFa1053A7252F518', 7)

  const trace = await ethers.provider.send("debug_traceTransaction", [transaction.hash])

  console.log('transaction', transaction);
  console.log('trace', trace.structLogs[0]);
}

async function greeterContractFunctions(): Promise<{ hash: string, address: string }> {
  const Greeter = artifacts.require("Greeter");

  const greeter = await Greeter.new(`Olá às ${new Date().toISOString()}`);

  // console.log('first greeter: ', (await greeter.greet()).toString());
  // const transaction = await ethers.provider.getTransaction(greeter.transactionHash)
  // console.log(transaction);

  await greeter.setGreeting(`Olá às ${new Date().toISOString()}`);
  // const transaction2 = await ethers.provider.getTransaction(greeter.transactionHash)
  // console.log(transaction2);

  // console.log('second greeter: ', (await greeter.greet()).toString());

  const result = {
    address: greeter.address,
    hash: greeter.transactionHash
  }

  return result
}

async function main() {
  try {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    // const Token = await ethers.getContractFactory("Token")

    // const token = await (Token as any).deploy()
    let txList = await api.account.txlist(deployer.address, 1, 'latest', 1, 100, 'asc');

    console.log('quantidade de transações', txList.result.length);
  } catch (error: any) {
    console.log(error.message);
  }

}

main()
  .then(() => process.exit(0))
  .catch((error: any) => {
    console.error(error);
    process.exit(1);
  });