import prisma from "../../lib/prisma";

import { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from "nanoid";
import { getCsrfToken } from "next-auth/react";

export default async function submit(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const { method } = req;
  
    switch (method) {
      case 'POST':
          return handlePOST(req, res)
      default:
        return res
          .status(405)
          .end('Only POST requests are allowed.');
    }
  }

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  const csrfToken = await getCsrfToken({ req })
    const editCode = nanoid(7)

    if (!csrfToken) return res.status(403).end("Missing or invalid CSRF token")

    const entry = await prisma.entry.create({
        data: {
            id: `${nanoid(7)}`,
            editCode: req.body.editCode ?? `${editCode}`,
            content: req.body.content ?? "There is content here.",
        }
    });
    
      if (!entry) return res.status(404).end("Entry not found.")
    
      console.table(entry)
    
      return res.status(200).json(entry);
}