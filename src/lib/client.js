import { createClient } from 'next-sanity';

export const config = {
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	apiVersion: '2022-07-25',
	useCdn: process.env.NODE_ENV === 'production',
	token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
};

if (!config.projectId) {
	throw Error('The Project ID is not set. Check your environment variables.');
}

const client = createClient(config);

export default client;
