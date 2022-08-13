import prisma from '../../lib/prisma';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function submit(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return handleGET(req, res);
    default:
      return res.status(405).end('Only GET requests are allowed.');
  }
}

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  const entry = await prisma.entry.findUnique({
    where: {
      id: `${req.query.id}`,
    },
    select: {
      id: true,
      datePublished: true,
      lastEdited: true,
      content: true,
    },
  });

  if (!entry) return res.status(404).end('Entry not found.');

  return res.status(200).json(entry);
}
