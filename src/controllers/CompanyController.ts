import { Request, Response } from "express";

import { companyAbi } from "../configs/abi";
import { useContract } from "../shared/useContract";

class CompanyController {
  async show(request: Request, response: Response): Promise<Response> {
    try {
      const { address } = request.params

      const list = await useContract({ abi: companyAbi, address, contractName: 'company' })

      return response.json({ list })
    } catch (error: any) {
      return response.status(500).json({ error: error.message })
    }
  }
}

export { CompanyController }