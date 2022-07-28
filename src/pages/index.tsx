import axios from 'axios';
import React from 'react';
import { PostProp } from '../../typings';
import PageLayout from '../components/layout/PageLayout';
import Post from '../components/post/Post';
import { BASE_URL } from '../lib/utils';

type HomeProps = {
	posts: Array<PostProp>;
};

const Home: React.FC<HomeProps> = ({ posts }) => {
	console.log(posts);
	return (
		<PageLayout title="HOME PAGE" description="The Home Page">
			<div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{posts.map((post) => (
					<Post key={post._id} post={post} />
				))}
			</div>
		</PageLayout>
	);
};
export default Home;

export const getServerSideProps = async () => {
	const { data } = await axios.get(`${BASE_URL}/api/posts`);
	return {
		props: {
			posts: data,
		},
	};
};
