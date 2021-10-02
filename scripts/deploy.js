async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("Token")
    .catch(err => console.log('erro em obter token', err.message));

  const token = await Token.deploy()
    .catch(err => console.log('erro no deploy', err.message));;

  console.log("Token address:", token?.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });