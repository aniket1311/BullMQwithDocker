import { Request, Response } from 'express';
import { createUser, fetchUser } from '../services/user.service.js';

export const getUser = async (req: Request, res: Response) => {
  const page = req.query?.page;
  const limit = req.query?.limit;
  const sortBy = req.query?.sortBy;
  const search = req.query?.search;
  const data = await fetchUser({ page, limit, sortBy, search });
  return res.json(data);
};
export const addUser = async (req: Request, res: Response) => {
  const response = await createUser();
  return res.json(response);
};
