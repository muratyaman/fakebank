import express, { Express } from 'express';
import { init as storeInit } from './store';

const router = express.Router();

export async function init(app: Express, path = '/api') {

  const db = await storeInit();

  router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const users = await db.users({ ids: id });
    const data = users[0] || null;
    res.json({ data });
  });

  router.get('/users', async (req, res) => {
    const data = await db.users(req.query);
    res.json({ data });
  });

  router.post('/login', async (req, res) => {
    const output = await db.login(req.body);
    res.json(output);
  });

  app.use(path, router);

  return Promise.resolve(true);
}
