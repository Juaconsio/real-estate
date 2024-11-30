import { Request, Response, Router } from 'express';
import isAuthenticated from '../middleware/auth';
import { getLandingPage, getSearchedPage } from '../puppeter';

const router = Router();


router.get(
  '/',
  // Agraegar validaciones
  // isAuthenticated,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const properties = await getLandingPage();
      res.status(200).json(properties);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
);

router.post(
  '/search',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { contract, type, address } = req.body;
      console.log("Buscando propiedades");
      const properties = await getSearchedPage(
        contract as string,
        type as string,
        address as string
      );
      res.status(200).json(properties);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
);

export default router;