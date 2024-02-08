import * as bcrypt from 'bcrypt';

export const createHash = (payload: string): string => {
  const hash = bcrypt.hashSync(payload, 10);
  return hash;
};

export const compareHash = (hash_password: string, plain_password: string): boolean => {
  const isMatched = bcrypt.compareSync(plain_password, hash_password);
  return isMatched;
};
