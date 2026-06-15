import * as express from express

declare global {
  namespace Express {
    interface Request {
      idUser?: number;
      idTransp?: number;
      role?: string;
    }
  }
}
