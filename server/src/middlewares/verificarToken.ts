import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
  const headerAuth = req.headers["authorization"];

  if (!headerAuth) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  const token = headerAuth.split(" ")[1];
  if (!token) {
    return res.status(401).json({ mensaje: "Formato de token inválido" });
  }

  try {
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret as jwt.Secret);
    (req as any).usuario = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ mensaje: "Token inválido o expirado" });
  }
};
