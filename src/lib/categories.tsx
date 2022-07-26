import { MdSportsSoccer, MdHealthAndSafety } from 'react-icons/md';
import { SiJavascript } from 'react-icons/si';
import { FaMusic } from 'react-icons/fa';
import { BsEmojiLaughing } from 'react-icons/bs';
import { GiWorld } from 'react-icons/gi';
import { BiMoviePlay } from 'react-icons/bi';

export const categories = [
	{
		name: 'sport',
		icon: <MdSportsSoccer />,
	},
	{
		name: 'programming',
		icon: <SiJavascript />,
	},
	{
		name: 'music',
		icon: <FaMusic />,
	},
	{
		name: 'politics',
		icon: <GiWorld />,
	},
	{
		name: 'comedy',
		icon: <BsEmojiLaughing />,
	},
	{
		name: 'health',
		icon: <MdHealthAndSafety />,
	},
	{
		name: 'movies',
		icon: <BiMoviePlay />,
	},
];
