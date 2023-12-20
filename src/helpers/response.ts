import { Response } from "express";
export function success(res: Response, data: any = {}, status: number = 200) {
  return res.status(status).json(data);
}