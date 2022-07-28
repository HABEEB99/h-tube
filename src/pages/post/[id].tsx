import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { PostProp } from '../../../typings';
import Button from '../../components/button/Button';
import PageLayout from '../../components/layout/PageLayout';
import { BASE_URL } from '../../lib/utils';
import Image from 'next/image';
import CreatePost from '../../components/create-post/CreatePost';

import { BsArrow90DegDown, BsArrowLeft } from 'react-icons/bs';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';

type PostDetailsProps = {
	post: PostProp;
};

const PostDetails: React.FC<PostDetailsProps> = ({ post }) => {
	const [playVideo, setPlayVideo] = useState(false);
	const [liked, setLiked] = useState(false);

	return (
		<PageLayout title="POST DETAILS" description="Post details page">
			<div className="p-2 w-full">
				<Link href="/">
					<div>
						<Button className="w-28 h-10 rounded-lg ">
							<BsArrowLeft className="mr-1 text-2xl font-bold" />
							Home
						</Button>
					</div>
				</Link>

				<div className="w-full flex flex-col lg:flex-row lg:space-x-12">
					<div className="flex flex-col w-full lg:w-[50%]">
						<div
							onMouseEnter={() => setPlayVideo(true)}
							onMouseLeave={() => setPlayVideo(false)}
							className="pt-[56.25%] relative h-96"
						>
							<ReactPlayer
								url={post.video?.asset.url}
								controls={playVideo}
								width="100%"
								height="100%"
								style={{ position: 'absolute', top: 0, left: 0 }}
							/>
						</div>

						<div className="flex items-center justify-between">
							<h3>{`${post.title} (${post.category})`}</h3>
							<span className="text-xl font-bold cursor-pointer text-red-600">
								{liked ? (
									<AiFillLike onClick={() => setLiked((prev) => !prev)} />
								) : (
									<AiOutlineLike onClick={() => setLiked((prev) => !prev)} />
								)}
							</span>
						</div>

						<div className="w-full h-60">
							<p className="text-base text-gray-400">
								<span className="text-lg font-bold dark:text-gray-200 text-gray-600">
									Description :
								</span>{' '}
								{post.caption}
							</p>
						</div>
					</div>

					<div className="w-full lg:w-[50%] lg:px-4 py-2 flex flex-col">
						<div className=" w-full">
							<CreatePost />
						</div>

						<div className="w-full mt-3 md:mt-6">
							<div className="flex items-center space-x-1">
								<BsArrow90DegDown className="text-2xl text-btn mt-6 font-bold" />
								<h4 className="font-bold text-2xl">Comments</h4>
							</div>
							{post.comments.map((comment) => (
								<div key={comment._key} className="w-full flex items-center">
									<div className="w-[70%]">
										<p>{comment.comment}</p>
									</div>

									<div className="flex items-center space-x-1 my-4">
										<div className="relative w-6 h-6 rounded-full">
											<Image
												src={comment.postedBy.picture}
												alt="user pic"
												layout="fill"
												objectFit="cover"
												className="rounded-full"
											/>
										</div>
										<span className="text-base text-gray-400 dark:text-gray-400">
											{comment.postedBy.userName}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</PageLayout>
	);
};
export default PostDetails;

export const getServerSideProps = async ({
	params: { id },
}: {
	params: { id: string };
}) => {
	const { data } = await axios.get(`${BASE_URL}/api/posts/${id}`);

	return {
		props: {
			post: data,
		},
	};
};
