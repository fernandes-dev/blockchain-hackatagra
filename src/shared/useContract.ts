import { ethers } from "hardhat";
import { ethereumAPI } from "../provider/ethereum.api";

interface UseContractsDTO {
  address: string
  abi: any[]
  contractName: string
}

export async function useContract({ address, abi, contractName }: UseContractsDTO): Promise<any> {
  const txList = await ethereumAPI.account.txlist(address, 1, 'latest', 1, 100, 'asc')

  await Promise.all(txList.result.map(async (tx: any) => {
    const txReceipt = await ethers.provider.send('eth_getTransactionReceipt', [tx.hash])

    if (txReceipt?.contractAddress) {
      const Contract: any = await ethers.getContractAt(abi, txReceipt.contractAddress)

      tx[contractName] = await Contract?.callStatic?.get()
    }
  }))

  return txList
}