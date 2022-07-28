import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../button/Button';

type CreatePostProps = {};

const CreatePost: React.FC<CreatePostProps> = () => {
	const {
		reset,
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const postComment = () => {};
	return (
		<form
			onSubmit={handleSubmit(postComment)}
			className="flex flex-col space-y-2 w-full"
		>
			<div className="relative w-full">
				<input
					type="text"
					id="comment"
					{...register('comment', {
						required: true,
					})}
					placeholder="Input Comment"
					className="w-full h-10 px-2 placeholder-transparent peer outline-none transition-all duration-300 ease-in-out"
				/>
				<label
					htmlFor="comment"
					className="top-2 text-blue-400 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:left-2 left-0 absolute text-sm peer-focus:-top-6"
				>
					Input Comment
				</label>
			</div>

			<div>
				<Button className="w-full h-10 rounded-lg">Add Comment</Button>
			</div>
		</form>
	);
};
export default CreatePost;
