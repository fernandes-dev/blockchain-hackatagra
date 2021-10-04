import { setPropertiesWithName } from "../../src/shared/useContract"
import { defaultTests } from "./defaultTests"
import { mock } from "./mock/addressMock"

describe("Move", () => {
  defaultTests('moves', mock)
})

describe("Use Contract Moves", () => {
  test("should be return moves properties", async () => {
    const moveDataFromEthereumAPI = [
      "789",
      30000,
      0,
      "Venda",
      "Soja",
      "Soja",
      "0x4E3C7Fe4f5d255e81e134A970eB1637e91ae43b3",
      "0x23D5d77f5C91E2d8E7279Dd5D7768b98d65DEe8a",
      "",
      false
    ]
    const result = setPropertiesWithName('move', moveDataFromEthereumAPI)

    expect(result).toHaveProperty('nfce')
  })
})