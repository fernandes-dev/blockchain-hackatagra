import { defaultTests } from "./defaultTests"
import { mock } from "./mock/addressMock"
import { setPropertiesWithName } from '../../src/shared/useContract'

describe("Company", () => {
  defaultTests('company', mock)
})

describe("Use Contract Company", () => {
  test("should be return company properties", async () => {
    const companyDataFromEthereumAPI = [
      mock.company,
      'Company Name Test',
      '00000000000',
      '123123',
      '321321',
      '1200',
      '10/05/1999',
      '2021',
      0,
      'Produtor',
      '0x4E3C7Fe4f5d255e81e134A970eB1637e91ae43b3'
    ]
    const result = setPropertiesWithName('company', companyDataFromEthereumAPI)

    expect(result).toHaveProperty('name')
  })
})