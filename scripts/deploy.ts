import { run, ethers, web3 } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("Token")
    .catch((err: any) => console.log('erro em obter token', err.message));

  const token = await (Token as any).deploy()
    .catch((err: any) => console.log('erro no deploy', err.message));;

  console.log("Token address:", token?.address);
  console.log(await web3.eth.getAccounts());
}

main()
  .then(() => process.exit(0))
  .catch((error: any) => {
    console.error(error);
    process.exit(1);
  });