import { Request, Response } from "express";

/**
 * implement proper error handler later.
 */
export abstract class ErrorHandler {
  public static async Handle(req: Request, res: Response, errorMessage: string, statusCode: number = 500) {
    res.status(statusCode).send(errorMessage);
  }
} 