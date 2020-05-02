import * as crypto from 'crypto';

export const getHash = (password: string): string => {
  return crypto
    .createHmac('sha256', process.env.SECRET_KEY)
    .update(password)
    .digest('hex');
};
