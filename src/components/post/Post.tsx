import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { PostProp } from '../../../typings';

type PostProps = {
	post: PostProp;
};

const Post: React.FC<PostProps> = ({ post }) => {
	const [playVideo, setPlayVideo] = useState(false);

	return (
		<div className="w-full md:w-[24rem] lg:w-[26rem] p-2 h-[18rem] md:h-[20rem] lg:h-[21rem] cursor-pointer bg-light dark:bg-gray-900 rounded-lg shadow-2xl hover:shadow-dark hover:dark:shadow-light">
			<div
				onMouseEnter={() => setPlayVideo(true)}
				onMouseLeave={() => setPlayVideo(false)}
				className="pt-[56.25%] relative"
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
				<h2 className="text-xl font-bold">{post.title}</h2>
				<div className="flex items-center space-x-1 text-gray-400 dark:text-gray-600">
					<span>by</span>
					<div className="relative w-6 h-6 rounded-full">
						<Image
							className="rounded-full"
							src={post.postedBy?.picture}
							alt="user image"
							layout="fill"
							objectFit="cover"
						/>
					</div>
					<h2>{post.postedBy?.userName}</h2>
				</div>
			</div>

			<div className="flex flex-col">
				<span className="text-gray-400">({post.category})</span>
				<div className="flex items-center justify-between">
					<span className="text-base italic text-gray-400 dark:text-gray-600">
						on {post._createdAt}
					</span>

					<Link href={`/post/${post._id}`}>
						<a className="hover:bg-btn w-28 h-10 rounded-lg flex items-center justify-center">
							View Details
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default Post;
