import { setPropertiesWithName } from "../../src/shared/useContract"
import { defaultTests } from "./defaultTests"
import { mock } from "./mock/addressMock"

describe("Inventory", () => {
  defaultTests('inventory', mock)
})

describe("Use Contract Inventory", () => {
  test("should be return inventory properties", async () => {
    const inventaryDataFromEthereumAPI = [
      mock.inventory,
      0,
      50000,
      0,
      0
    ]
    const result = setPropertiesWithName('inventory', inventaryDataFromEthereumAPI)

    expect(result).toHaveProperty('soySold')
  })
})