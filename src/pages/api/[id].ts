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
    default:
      return res.status(405).end('Only GET and PATCH requests are allowed.');
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

  if (!entry) return res.status(404).json({ error: 'Entry not found.' });

  return res.status(200).json(entry);
}

async function handlePATCH(req: NextApiRequest, res: NextApiResponse) {
  const entryToEdit = await prisma.entry.findUnique({
    where: {
      id: `${req.query.id}`,
    },
    select: {
      editCode: true,
    },
  });

  if (!entryToEdit) return res.status(404).json({ error: 'Entry not found.' });

  if (req.body.editCode !== entryToEdit.editCode)
    return res.status(401).json({ error: 'Incorrect edit code provided' });

  const entry = await prisma.entry.update({
    where: {
      id: `${req.query.id}`,
    },
    data: {
      content: req.body.content,
    },
  });

  return res.status(200).json(entry);
}
