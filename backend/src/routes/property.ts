import { Request, Response, Router } from 'express';
import isAuthenticated from '../middleware/auth';
import { getLandingPage, getSearchedPage, getFavorites } from '../services/puppeteer';
import { Favorite, Search } from '../models/index';
const router = Router();


router.get(
  '/',
  // Agraegar validaciones
  isAuthenticated,
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
  isAuthenticated,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { contract, type, address } = req.body;
      if (req.session.userId === undefined) {
        res.status(400).json({ error: 'User ID is missing' });
        return;
      }
      Search.create({
        userId: req.session.userId,
        contract,
        type,
        address
      });
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

router.get(
  '/search-history',
  isAuthenticated,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const searches = await Search.findAll({
        attributes: ['contract', 'type', 'address', 'createdAt'],
        where: {
          userId: req.session.userId
        }
      });
      res.status(200).json(searches);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
);

router.get(
  '/favorites',
  isAuthenticated,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const favorites_url = await Favorite.findAll({
        attributes: ['property_url'],
        where: {
          userId: 1 // req.session.userId
        }
      })
      const favoriteUrls = favorites_url.map(favorite => favorite.property_url);
      const favorites = await getFavorites(favoriteUrls);
      res.status(200).json(favorites);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
);

router.post(
  '/favorites',
  isAuthenticated,
  async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("Agregando a favoritos");
      console.log(req.body);
      console.log(req.session.userId);
      const { property_url } = req.body;
      const favorite = await Favorite.create({
        userId: req.session.userId as number,
        property_url
      });
      res.status(201).json(favorite);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
);
export default router;