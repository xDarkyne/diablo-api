import { Request, Response } from "express";

/**
 * Maybe think about actually handleing errors later on...
 */
export abstract class ErrorHandler {
  public static async Handle(req: Request, res: Response, errorMessage: string, statusCode: number = 500) {
    res.status(statusCode).send(errorMessage);
  }
} 