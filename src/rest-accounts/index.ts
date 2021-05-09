import express from 'express';
import { testEndPoint } from '../common/testEndPoint';
import { init as routerInit } from './router';

const app = express();
const port = 10222;

async function init() {
  await routerInit(app);
  app.get('/', testEndPoint);
}

init().then(() => {
  app.listen(port, () => {
    console.log(`http://localhost:${port} core-accounts`);
  });
});
