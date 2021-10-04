import supertest from 'supertest'
import { app } from '../../src/server'
import { IMockAddress } from './mock/addressMock'

export function defaultTests(contractName: string, mock: IMockAddress): void {
  test(`should be return status 200 on get ${contractName} transactions by address`, async () => {
    const result = await supertest(app).get(`/${contractName}/${mock[contractName]}`)

    expect(result.status).toBe(200)
    expect(result.body).toHaveProperty("list")
  })

  test("should be return error on invalid address", async () => {
    const result = await supertest(app).get(`/${contractName}/invalidAddress`)

    expect(result.status).toBe(500)
  })
}