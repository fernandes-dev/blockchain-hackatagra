import { HardhatUserConfig } from "hardhat/config";

import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-truffle5"

import dotenv from 'dotenv'
dotenv.config()


const { ALCHEMY_API_KEY, ROPSTEN_PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`],
    },
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`],
    },
  },
};

export default config
