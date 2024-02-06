import jwt from 'jsonwebtoken';
require('dotenv').config();

export const create_access_token = (payload,expiresIn) => {

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
}

export const create_fresh_token = (payload,expiresIn) => {

    return jwt.sign(payload, process.env.FRESH_TOKEN_SECRET, { expiresIn});
  }