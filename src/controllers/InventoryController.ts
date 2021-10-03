import { Request, Response } from "express";

import { inventoryAbi } from "../configs/abi";
import { useContract } from "../shared/useContract";

class InventoryController {
  async show(request: Request, response: Response): Promise<Response> {
    try {
      const { address } = request.params

      if (!address)
        return response.status(404).json({ error: 'Address required' })

      const list = await useContract({ abi: inventoryAbi, address, contractName: 'inventory' })

      return response.json({ list })
    } catch (error: any) {
      return response.status(500).json({ error: error.message })
    }
  }
}

export { InventoryController }