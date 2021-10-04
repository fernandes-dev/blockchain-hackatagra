import { setPropertiesWithName } from "../../src/shared/useContract"
import { defaultTests } from "./defaultTests"
import { mock } from "./mock/addressMock"

describe("Supplies", () => {
  defaultTests('supplies', mock)
})

describe("Use Contract Supplies", () => {
  test("should be return supplies properties", async () => {
    const suppliesDataFromEthereumAPI = [
      "0x248e4A9dA571a4549014FfBE690ae299be6088A1",
      "8978",
      3,
      "Fertilizante",
      300,
      12000,
      "12/09/2021",
      "2021"
    ]
    const result = setPropertiesWithName('supplies', suppliesDataFromEthereumAPI)

    expect(result).toHaveProperty('supplies_code')
  })
})