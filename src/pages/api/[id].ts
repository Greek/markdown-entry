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
    case 'PATCH':
      return handlePATCH(req, res);
    case 'DELETE':
      return handleDELETE(req, res);
    default:
      return res
        .status(405)
        .end('Only GET, PATCH and DELETE methods are allowed.');
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

  console.table(entry);

  return res.status(200).json(entry);
}

function handlePATCH(req: NextApiRequest, res: NextApiResponse<any>) {
  throw new Error('Function not implemented.');
}

function handleDELETE(req: NextApiRequest, res: NextApiResponse<any>) {
  throw new Error('Function not implemented.');
}
