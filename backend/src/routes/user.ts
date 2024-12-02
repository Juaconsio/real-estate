import { Request, Response, Router } from 'express';
import { initUserModel } from '../models/user';
import { sequelize } from '../config/database';
import isAuthenticated from '../middleware/auth';


const router = Router();
const User = initUserModel(sequelize);

router.get(
  '/',
  // Agraegar validaciones
  isAuthenticated,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the user' });
    }
  }
);

export default router;
