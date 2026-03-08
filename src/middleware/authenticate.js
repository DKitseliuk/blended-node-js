import createHttpError from 'http-errors';
import { findSession, findUserById } from '../services/authService.js';

export const authenticate = async (req, res, next) => {
  if (!req.cookies.accessToken) {
    throw createHttpError(401, 'Access token expired');
  }

  const session = await findSession({ _id: req.cookies.sessionId });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    throw createHttpError(401, 'Access token expired');
  }

  const user = await findUserById(session.userId);

  if (!user) {
    throw createHttpError(401, 'User not found');
  }

  req.user = user;
  next();
};
