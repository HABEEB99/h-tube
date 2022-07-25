import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import Button from '../button/Button';

import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { FaBars, FaSearch } from 'react-icons/fa';
import { ImUser, ImVideoCamera } from 'react-icons/im';
import { IoMdClose } from 'react-icons/io';
import MobileNavModals from '../modals/MobileNavModals';
import SearchModal from '../modals/SearchModal';
import Link from 'next/link';

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
	const [isMobileNavOpened, setIsMobileNavOpened] = useState(false);
	const [isSearchModalOpened, setIsSearchModalOpened] = useState(false);
	// const [isUserModalOpened, setIsUserModalOpened] = useState(false);

	const { theme, setTheme, systemTheme } = useTheme();

	const toggleTheme = () => {
		const currentTheme = theme === 'system' ? systemTheme : theme;

		if (currentTheme === 'dark') {
			return (
				<div onClick={() => setTheme('light')}>
					<Button className="h-10 w-10 rounded-md">
						<BsFillSunFill />
					</Button>
				</div>
			);
		} else {
			return (
				<div onClick={() => setTheme('dark')}>
					<Button className="h-10 w-10 rounded-md">
						<BsFillMoonFill />
					</Button>
				</div>
			);
		}
	};

	return (
		<header className="h-[8vh] w-screen  bg-lightSidebar dark:bg-darkSidebar flex items-center justify-between px-4 md:px-6">
			<Link href="/" passHref>
				<div className="flex items-center justify-center space-x-1 font-bold text-2xl text-red-400  cursor-pointer">
					<ImVideoCamera className="animate-bounce" />
					<h1>H-TUBE</h1>
				</div>
			</Link>

			<div className="hidden md:flex items-center h-10 bg-gray-200 md:w-[20rem] lg:w-[30rem] rounded-lg px-2 space-x-1">
				<FaSearch className="text-xl text-btn" />
				<input
					type="text"
					placeholder="Search"
					className="flex-1 h-full outline-none bg-gray-200 rounded-lg text-blue-500"
				/>
			</div>

			{toggleTheme()}

			<div className="flex items-center space-x-2 md:hidden">
				{/* <div>
					<ImUser />
				</div> */}

				<div onClick={() => setIsSearchModalOpened((prev) => !prev)}>
					<FaSearch className="text-xl cursor-pointer font-bold text-btn hover:text-btnHover" />
				</div>

				<div>
					{isMobileNavOpened ? (
						<IoMdClose
							onClick={() => setIsMobileNavOpened((prev) => !prev)}
							className="cursor-pointer font-bold text-btn hover:text-btnHover text-xl"
						/>
					) : (
						<FaBars
							onClick={() => setIsMobileNavOpened((prev) => !prev)}
							className="cursor-pointer font-bold text-btn hover:text-btnHover text-xl"
						/>
					)}
				</div>
			</div>

			{isMobileNavOpened && <MobileNavModals />}
			{isSearchModalOpened && <SearchModal />}
		</header>
	);
};
export default Header;
