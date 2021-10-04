import { Request, Response } from "express";

import { suppliesAbi } from "../configs/abi";
import { useContract } from "../shared/useContract";


class SuppliesController {
  async show(request: Request, response: Response): Promise<Response> {
    try {
      const { address } = request.params

      const list = await useContract({ abi: suppliesAbi, address, contractName: 'supplies' })

      return response.json({ list })
    } catch (error: any) {
      return response.status(500).json({ error: error.message })
    }
  }
}

export { SuppliesController }