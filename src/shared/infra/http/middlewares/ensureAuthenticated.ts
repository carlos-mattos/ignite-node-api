import AppError from "@shared/errors/AppError";
import UsersRepository from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import auth from "@config/auth";
import UsersTokensRepository from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";

interface IPayload {
  sub: string;
}

export default async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token inexistente", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

    req.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    throw new AppError("Token invalido", 401);
  }
}
