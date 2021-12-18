import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

export default async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  const id = req.user.id;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError("Usuario nao e administrador", 401);
  }

  return next();
}