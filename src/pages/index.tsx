import React from 'react';
import PageLayout from '../components/layout/PageLayout';

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
	return (
		<PageLayout title="HOME PAGE" description="The Home Page">
			home page
		</PageLayout>
	);
};
export default Home;
