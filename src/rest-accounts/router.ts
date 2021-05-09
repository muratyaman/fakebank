import express, { Express } from 'express';
import { init as storeInit } from './store';

const router = express.Router();

export async function init(app: Express, path = '/api') {

  const db = await storeInit();

  router.get('/accounts/:id', async (req, res) => {
    const { id } = req.params;
    const rows = await db.accounts({ ids: id });
    const data = rows[0] || null;
    res.json({ data });
  });

  router.get('/accounts', async (req, res) => {
    const data = await db.accounts(req.query);
    res.json({ data });
  });

  router.get('/transactions/:id', async (req, res) => {
    const { id } = req.params;
    const rows = await db.transactions({ ids: id });
    const data = rows[0] || null;
    res.json({ data });
  });

  router.get('/transactions', async (req, res) => {
    const data = await db.transactions(req.query);
    res.json({ data });
  });

  // create new transaction
  router.post('/transactions', async (req, res) => {
    const data = await db.saveTransaction(req.body);
    res.json({ data });
  });

  app.use(path, router);
  return Promise.resolve(true);
}
