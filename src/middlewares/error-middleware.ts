import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export const ERRORS = {
  unauthorized: 401,
  conflict: 409,
  not_found: 404,
  bad_request: 400,
  forbidden: 403
}

export default function errorHandlerMiddleware(err, req: Request, res: Response, next: NextFunction) {
  console.log(err);
  const type: string = err.type;

  let statusCode = ERRORS[type];
  if (!statusCode) statusCode = httpStatus.INTERNAL_SERVER_ERROR;

  return res.status(statusCode).send(err.message);
}