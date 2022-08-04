import React, { useEffect, useState } from 'react';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { useAuthStore } from '../../store/authStore';

type LikePostProps = {
	upVote: () => void;
	downVote: () => void;
	likes: Array<any>;
};

const LikePost: React.FC<LikePostProps> = ({ upVote, downVote, likes }) => {
	const [liked, setLiked] = useState(false);

	const { user }: { user: any } = useAuthStore();

	const filterLikes = likes?.filter((like) => like._ref === user?._id);

	useEffect(() => {
		if (filterLikes?.length > 0) {
			setLiked(true);
		} else {
			setLiked(false);
		}
	}, [likes, filterLikes]);
	return (
		<div className="flex space-x-2 items-center">
			<span>{likes?.length || 0}</span>
			<span className="text-xl font-bold cursor-pointer text-red-600">
				{liked ? (
					<div onClick={upVote}>
						<AiFillLike />
					</div>
				) : (
					<div onClick={downVote}>
						<AiOutlineLike />
					</div>
				)}
			</span>
		</div>
	);
};
export default LikePost;
