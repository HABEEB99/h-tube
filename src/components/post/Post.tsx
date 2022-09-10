import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ReactPlayer from "react-player/lazy";
import { PostProp } from "../../../typings";

type PostProps = {
  post: PostProp;
};

const Post: React.FC<PostProps> = ({ post }) => {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <div className="w-full md:w-[20rem] md:gap-2 lg:w-[23rem] p-2 h-[18rem] md:h-[18rem] lg:h-[19rem] cursor-pointer bg-light dark:bg-gray-900 rounded-lg shadow-2xl hover:shadow-dark hover:dark:shadow-light">
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
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold">{post.title}</h2>
        <div className="flex items-center space-x-1 text-gray-400 dark:text-gray-600">
          <span className="text-xs">by: </span>
          <div className="relative w-4 h-4 rounded-full">
            <Image
              className="rounded-full"
              src={post.postedBy?.picture}
              alt="user image"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h2 className="text-xs">{post.postedBy?.userName}</h2>
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-gray-400">({post.category})</span>
        <div className="flex items-center justify-between pb-2">
          <span className="text-xs italic text-gray-400 dark:text-gray-600">
            on {post._createdAt}
          </span>

          <Link href={`/post/${post._id}`}>
            <a className="hover:bg-btn w-24 hover:text-white h-8 text-sm font-bold rounded-lg flex items-center justify-center">
              View Details
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Post;
