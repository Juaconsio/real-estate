import { Request, Response, NextFunction } from 'express';

function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
  // Verifica si hay un `userId` en la sesión
  if (req.session.userId) {
    // Si el usuario está autenticado, pasa al siguiente middleware o ruta
    return next();
  }

  // Si no está autenticado, retorna un error o redirige al login
  res.status(401).json({ message: 'Unauthorized. Please log in.' });
}

export default isAuthenticated;