import axios from 'axios';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BASE_URL } from '../../lib/utils';
import { useAuthStore } from '../../store/authStore';
import Button from '../button/Button';

type CreateCommentProps = {
	comment: string;
	setComment: Dispatch<SetStateAction<string>>;
	postComment: (e: React.FormEvent) => void;
	posting: boolean;
	// comments: Array<CommentProps>;
};

// interface CommentProps {
// 	comment: string;
// 	length?: number;
// 	_key: string;
// 	postedBy: {
// 		_ref: string;
// 		_id: string;
// 	};
// }

const CreateComment: React.FC<CreateCommentProps> = ({
	comment,
	setComment,
	postComment,
	posting,
}) => {
	const { user } = useAuthStore();

	return (
		<form onSubmit={postComment} className="flex flex-col space-y-2 w-full">
			<div className="relative w-full">
				<input
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					type="text"
					id="comment"
					placeholder="Input Comment"
					className="w-full h-10 px-2 placeholder-transparent text-white peer outline-none transition-all duration-300 ease-in-out"
				/>
				<label
					htmlFor="comment"
					className="-top-6 peer-placeholder-shown:top-2 text-blue-400 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:left-2 left-0 absolute text-sm peer-focus:-top-6"
				>
					Input Comment
				</label>
			</div>

			<div>
				<button
					onClick={postComment}
					type="submit"
					className="w-full h-10 rounded-lg bg-btn hover:bg-btnHover"
				>
					{posting ? (
						<div className="flex items-center space-x-1">
							<AiOutlineLoading3Quarters className="text-2xl animate-spin text-green-300" />
							<span className="text-xl text-green-500 animate-pulse">
								Posting Comment
							</span>
						</div>
					) : (
						'Add Comment'
					)}
				</button>
			</div>
		</form>
	);
};
export default CreateComment;
