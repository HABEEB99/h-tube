import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../lib/client';
import { postsQuery } from '../../../lib/queries';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'GET') {
		const data = await client.fetch(postsQuery);

		res.status(200).json(data);
	} else if (req.method === 'POST') {
		const postDoc = req.body;

		client
			.create(postDoc)
			.then(() => res.status(201).json('Posted Successfully'));
	}
};

export default handler;
