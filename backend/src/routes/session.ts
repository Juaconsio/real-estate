import { Request, Response, Router } from 'express';
import { initUserModel } from '../models/user';
import { sequelize } from '../config/database';
import bcrypt from 'bcrypt';


const router = Router();
const User = initUserModel(sequelize);

router.post(
  '/register',
  // Agraegar validaciones
  async (req: Request, res: Response): Promise<void> => {
    const user = await User.create(req.body);
    res.status(201).json({ user });
  }
);

router.post(
  '/login',
  // Agraegar validaciones
  async (req: Request, res: Response): Promise<void> => {
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
  }
);


router.post(
  '/logout',
  // Agraegar validaciones
  async (req: Request, res: Response): Promise<void> => {
    req.session.destroy(() => {
      console.log('User logged out');
    });
    res.status(200).json({ message: 'User logged out' });
  }
);

export default router;