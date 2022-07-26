import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../lib/client';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const user = req.body;

		client
			.createIfNotExists(user)
			.then(() => res.status(200).json('Signed in successfully'));
	}
};

export default handler;
