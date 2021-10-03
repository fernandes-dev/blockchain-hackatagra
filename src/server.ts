import express from 'express'
import cors from 'cors'
import { ethers } from 'hardhat'
const api = require('etherscan-api').init(process.env.ETHERSCAN_API, 'ropsten')
const port = process.env.PORT || 3333

const app = express()

app.use(express.json())
app.use(cors())

app.get('/transaction', async (request, response) => {
  const { address } = request.body
  let deployer = { address }

  if (!address)
    [deployer] = await ethers.getSigners()

  const txList = await api.account.txlist(deployer.address, 1, 'latest', 1, 100, 'asc')


  return response.json({ txList })
})

app.listen(port, () => console.log(`🚀 server runnin on port: ${port}`))