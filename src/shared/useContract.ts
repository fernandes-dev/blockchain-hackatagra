import { ethers } from "hardhat";
import { ethereumAPI } from "../provider/ethereum.api";

import abiDecoder from 'abi-decoder'
interface UseContractsDTO {
  address: string
  abi: any[]
  contractName: string
}

export function setPropertiesWithName(contractName: string, data: any[]): any {
  let newData: any;

  switch (contractName) {
    case 'company':
      newData = {
        address: data[8],
        name: data[0],
        cnpj: data[1],
        latitude: data[2],
        longitude: data[3],
        area: data[4],
        certificateValidityDate: data[5],
        harvest: data[6],
        compnayType: data[7],
        criptoAddress: data[9],
        conversionFactor: data[10],
      }
      break;
    case 'inventory':
      newData = {
        address: data[0],
        soySold: data[1],
        soyTransit: data[2],
        soyInventory: data[3],
        oilInventory: data[3]
      }
      break;
    case 'supplies':
      newData = {
        address: data[6],
        nfce: data[0],
        supplies_code: data[1],
        description: data[2],
        quantity: data[3],
        totalValue: data[4],
        date: data[5],
        harvest: data[7]
      }
      break;
    case 'move':
      newData = {
        nfce: data[0],
        originQuantity: data[1],
        origin: data[2],
        destination: data[3],
        previousHash: data[4]
      }
      break;

    default:
      break;
  }

  return newData
}

export function mapNewList(list: any[], contractName: string): any[] {
  return list.map(result => {
    const newResult = {
      hash: result.hash,
      blockHash: result.blockHash,
      transactionIndex: result.transactionIndex,
      timeStamp: result.timeStamp,
      from: result.from,
      to: result.to,
      value: result.value,
      txreceipt_status: result.txreceipt_status,
      input: result.input
    }
    newResult[contractName] = result[contractName]

    return newResult
  })
}

export async function useContract({ address, abi, contractName }: UseContractsDTO): Promise<any> {
  abiDecoder.addABI(abi)
  const txList = await ethereumAPI.account.txlist(address, 1, 'latest', 1, 100, 'asc')

  await Promise.all(txList.result.map(async (tx: any) => {
    const txReceipt = await ethers.provider.send('eth_getTransactionReceipt', [tx.hash])

    if (txReceipt?.contractAddress) {
      const Contract: any = await ethers.getContractAt(abi, txReceipt.contractAddress)

      tx[contractName] = await Contract?.callStatic?.get()

      const newContractData = []
      tx[contractName].forEach((data: any) => {
        if (typeof data === 'object') {
          const newData = JSON.parse(JSON.stringify(data))

          newContractData.push(parseInt(newData.hex, 16))
        } else {
          newContractData.push(data)
        }
      })

      tx[contractName] = setPropertiesWithName(contractName, newContractData)
    }
    tx.input = abiDecoder.decodeMethod(tx.input)
  }))

  const newList = mapNewList(txList.result, contractName);

  return newList
}