const ethereumAPI = require('etherscan-api')
  .init(process.env.ETHERSCAN_API, 'ropsten')

export { ethereumAPI }