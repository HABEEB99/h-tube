import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../lib/client';
import { postsQuery } from '../../../lib/queries';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'GET') {
		const data = await client.fetch(postsQuery);

		res.status(200).json(data);
	}
};

export default handler;
