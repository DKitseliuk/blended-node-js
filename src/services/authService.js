import crypto from 'crypto';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const createSession = (userId) => {
  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');

  return Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
    refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
};

export const deleteUsersSessions = (userId) => {
  return Session.deleteMany({ userId });
};

export const deleteSessionById = (sessionId) => {
  return Session.deleteOne({ _id: sessionId });
};

export const findSession = (obj) => {
  return Session.findOne(obj);
};

export const findUserByEmail = (email) => {
  return User.findOne({ email });
};

export const findUserById = (userId) => {
  return User.findById(userId);
};

export const registerUser = (payload) => {
  return User.create(payload);
};

export const setSessionCookies = (res, session) => {
  res.cookie('accessToken', session.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 15 * 60 * 1000,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};
