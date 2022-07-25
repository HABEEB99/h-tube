import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { categories } from '../../lib/categories';
import Button from '../button/Button';

type SidebarProps = {};

const Sidebar: React.FC<SidebarProps> = () => {
	const router = useRouter();
	const { category } = router.query;
	const { theme, setTheme, systemTheme } = useTheme();

	const toggleTheme = () => {
		const currentTheme = theme === 'system' ? systemTheme : theme;

		if (currentTheme === 'dark') {
			return (
				<div onClick={() => setTheme('light')}>
					<Button className="w-full h-10 rounded-lg">
						Toggle Theme <BsFillSunFill className="ml-2" />
					</Button>
				</div>
			);
		} else {
			return (
				<div onClick={() => setTheme('dark')}>
					<Button className="w-full h-10 rounded-lg">
						Toggle Theme <BsFillMoonFill className="ml-2" />
					</Button>
				</div>
			);
		}
	};

	const activeCategory =
		'text-sky-600 flex space-x-1 items-center text-md text-gray-400 cursor-pointer font-bold mt-2';
	const normalCategory =
		'flex space-x-1 items-center text-md text-gray-400 cursor-pointer hover:text-sky-500 mt-2';
	return (
		<div className="hidden md:w-[20%] lg:w-[15%] md:flex flex-col justify-between h-full px-4 md:px-6 bg-lightSidebar dark:bg-darkSidebar py-3 space-y-3">
			<div>
				<h2 className="text-2xl font-bold">Categories</h2>
				{categories.map((item) => (
					<Link href={`/?category=${item.name}`} key={item.name}>
						<div
							className={
								category === item.name ? activeCategory : normalCategory
							}
						>
							<span>{item.icon}</span>
							<h3 className="capitalize ">{item.name}</h3>
						</div>
					</Link>
				))}
			</div>

			<div>{toggleTheme()}</div>
		</div>
	);
};
export default Sidebar;
