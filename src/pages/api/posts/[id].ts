import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../lib/client';
import { postDetailsQuery } from '../../../lib/queries';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'GET') {
		const { id } = req.query;
		const query = postDetailsQuery(id!);

		const data = await client.fetch(query);

		res.status(200).json(data[0]);
	}
};

export default handler;
