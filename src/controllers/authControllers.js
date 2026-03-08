import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import {
  createSession,
  deleteSessionById,
  deleteUsersSessions,
  findSession,
  findUserByEmail,
  registerUser,
  setSessionCookies,
} from '../services/authService.js';

export const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await findUserByEmail(email);

  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await registerUser({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ data: newUser });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    throw createHttpError(401, 'User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw createHttpError(401, 'Invalid credentials');
  }

  await deleteUsersSessions(user._id);

  const session = await createSession(user._id);

  setSessionCookies(res, session);

  res.status(200).json({ data: user });
};

export const logoutController = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await deleteSessionById(sessionId);
  }

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).send();
};

export const refreshController = async (req, res) => {
  const session = await findSession({
    _id: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isRefreshTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isRefreshTokenExpired) {
    throw createHttpError(401, 'Session expired');
  }

  await deleteSessionById(session._id);

  const newSession = await createSession(session.userId);

  setSessionCookies(res, newSession);

  res.status(200).json({ message: 'Successfully refreshed a session!' });
};
