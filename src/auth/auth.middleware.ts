import { Request, Response, NextFunction } from 'express';
import { supabase } from './supabaseClient';

export interface AuthRequest extends Request {
  user?: { id: string; email?: string | undefined };
}

export const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const token = authHeader.split(' ')[1];
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  req.user = { id: data.user.id, email: data.user.email };
  next();
};