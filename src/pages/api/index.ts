import prisma from '../../lib/prisma';

import { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';
import { getCsrfToken } from 'next-auth/react';

export default async function submit(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const csrfToken = await getCsrfToken({ req });

  if (process.env.NODE_ENV == 'production') {
    if (!req.headers.referer?.includes('https://apap04.com'))
      return res
        .status(403)
        .end(
          'Referer check failed; Origin does not match trusted origin list.'
        );
  }

  switch (method) {
    case 'POST':
      if (!csrfToken)
        return res.status(403).end('Missing or invalid CSRF token.');
      return handlePOST(req, res);
    default:
      return res.status(405).end('Only POST requests are allowed.');
  }
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  const editCode = nanoid(7);

  if (!req.body.content)
    return res.status(400).end('No content has been provided.');

  const entry = await prisma.entry.create({
    data: {
      id: `${nanoid(7)}`,
      editCode: req.body.editCode ?? `${editCode}`,
      content: req.body.content,
    },
  });

  return res.status(200).json(entry);
}
