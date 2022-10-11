import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  status: string
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(403).send({ status: 'invalid csrf token' });
}