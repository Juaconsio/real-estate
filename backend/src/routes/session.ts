import { Request, Response, Router, NextFunction } from 'express';
import { User } from '../models/index';
import bcrypt from 'bcrypt';
import isAuthenticated from '../middleware/auth';


const router = Router();

router.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

      const user = await User.create(req.body);
      res.status(201).json({ user });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

      const email = req.body.email;
      const password = req.body.password;
      const user = await User.findOne({ where: { email }, attributes: ['id', 'password'], });
      if (!user) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }
      req.session.userId = user.id;
      res.status(200).json({ message: 'User logged in' });
    } catch (error) {
      next(error);
    }
  }
);


router.post(
  '/logout',
  isAuthenticated,
  // Agraegar validaciones
  async (req: Request, res: Response): Promise<void> => {
    req.session.destroy(() => {
      console.log('User logged out');
    });
    res.status(200).json({ message: 'User logged out' });
  }
);

export default router;