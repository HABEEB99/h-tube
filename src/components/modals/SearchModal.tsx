import React from 'react';
import { FaSearch } from 'react-icons/fa';

type SearchModalProps = {};

const SearchModal: React.FC<SearchModalProps> = () => {
	return (
		<div className=" md:hidden items-center h-10 absolute top-20 flex right-2 px-2 z-10 bg-gray-300 w-[95%] rounded-lg  space-x-1">
			<FaSearch className="text-xl text-btn" />
			<input
				type="text"
				placeholder="Search"
				className="flex-1 h-full outline-none bg-gray-300 rounded-lg text-blue-500"
			/>
		</div>
	);
};
export default SearchModal;
