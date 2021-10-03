import express from 'express'
import cors from 'cors'
import { ethers } from 'hardhat'
import { abi } from './configs/EmpresaContract'

import Decoder from 'ethereum-input-data-decoder'

const decoder = new Decoder(abi as any)

const api = require('etherscan-api').init(process.env.ETHERSCAN_API, 'ropsten')

const port = process.env.PORT || 3333

const app = express()

app.use(express.json())
app.use(cors())

app.get('/transaction', async (request, response) => {
  try {
    const { address } = request.query
    let deployer = { address }

    if (!address)
      [deployer] = await ethers.getSigners()

    const txList = await api.account.txlist(deployer.address, 1, 'latest', 1, 100, 'asc')

    await Promise.all(txList.result.map(async (tx: any) => {
      const txReceipt = await ethers.provider.send('eth_getTransactionReceipt', [tx.hash])

      if (txReceipt?.contractAddress) {
        const Empresa: any = await ethers.getContractAt(abi, txReceipt.contractAddress)

        tx.empresa = await Empresa?.callStatic?.getEmpresa()
      }

      tx.input = decoder.decodeData(tx.input)
    }))

    return response.json({ txList })
  } catch (error: any) {
    return response.status(500).json({ error: error.message })
  }
})

app.listen(port, () => console.log(`🚀 server runnin on port: ${port}`))