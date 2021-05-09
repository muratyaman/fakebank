import { Request, Response } from 'express';
import { randUuid } from './rand';

export function testEndPoint(req: Request, res: Response) {
  res.json({
    test: randUuid(),
    ts: new Date().toISOString(),
  });
}
