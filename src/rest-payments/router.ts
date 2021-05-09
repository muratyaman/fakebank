import express, { Express } from 'express';
import { init as storeInit } from './store';

const router = express.Router();

export async function init(app: Express, path = '/api') {

  const db = await storeInit();

  router.get('/transfers/:id', async (req, res) => {
    const { id } = req.params;
    const rows = await db.transfers({ ids: id });
    const data = rows[0] || null;
    res.json({ data });
  });

  router.get('/transfers', async (req, res) => {
    const data = await db.transfers(req.query);
    res.json({ data });
  });

  // create new transfer
  router.post('/transfers', async (req, res) => {
    const data = await db.saveTransfer(req.body);
    res.json({ data });
  });

  app.use(path, router);

  return Promise.resolve(true);
}
