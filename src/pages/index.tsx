import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import { IoMdAdd } from 'react-icons/io';
import { PostProp } from '../../typings';
import Button from '../components/button/Button';
import PageLayout from '../components/layout/PageLayout';
import Post from '../components/post/Post';
import { BASE_URL } from '../lib/utils';
import { useAuthStore } from '../store/authStore';

type HomeProps = {
	posts: Array<PostProp>;
};

const Home: React.FC<HomeProps> = ({ posts }) => {
	const router = useRouter();
	const { user } = useAuthStore();

	const handleClick = () => {
		if (!user) {
			toast.error('Access denied. Please Login ');
			return;
		}
		router.push('/createpost');
	};
	return (
		<PageLayout title="HOME PAGE" description="The Home Page">
			<div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{posts.map((post) => (
					<Post key={post._id} post={post} />
				))}
			</div>

			<div onClick={handleClick} className="absolute top-[85vh] right-4">
				<button className="bg-btn hover:bg-btnHover text-white font-bold w-10 h-10 md:w-12 md:h-12 rounded-full text-3xl flex items-center justify-center">
					<IoMdAdd />
				</button>
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
