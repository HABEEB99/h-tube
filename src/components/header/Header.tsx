import { useTheme } from "next-themes";
import React, { useState } from "react";
import Button from "../button/Button";

import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { BiLogOutCircle } from "react-icons/bi";
import { FaBars, FaSearch } from "react-icons/fa";
import { ImUser, ImVideoCamera } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import MobileNavModals from "../modals/MobileNavModals";
import SearchModal from "../modals/SearchModal";
import Link from "next/link";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "../../lib/utils";
import { useAuthStore } from "../../store/authStore";
import Image from "next/image";
import dynamic from "next/dynamic";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const [isMobileNavOpened, setIsMobileNavOpened] = useState(false);
  const [isSearchModalOpened, setIsSearchModalOpened] = useState(false);
  const [openLogoutBtn, setOpenLogoutBtn] = useState(false);

  const handleLogout = () => {
    googleLogout();
    removeUser();
    setOpenLogoutBtn(false);
  };

  const { addUser, user, removeUser } = useAuthStore();

  return (
    <header className="h-[8vh] w-screen  bg-lightSidebar dark:bg-darkSidebar flex items-center justify-between px-4 md:px-6">
      <Link href="/" passHref>
        <div className="flex items-center justify-center space-x-1 font-bold text-base md:text-2xl text-red-400  cursor-pointer">
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

      {user ? (
        <div
          onClick={() => setOpenLogoutBtn(!openLogoutBtn)}
          className="flex items-center space-x-2 bg-gray-200 py-1 px-2 rounded-md shadow-xl cursor-pointer"
        >
          <div className="relative w-8 h-8 rounded-full">
            <Image
              src={user.picture}
              alt="Author picture"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <h1 className="text-xs font-bold text-btn">{user.userName}</h1>
        </div>
      ) : (
        <div>
          <GoogleLogin
            onSuccess={(response) => {
              createOrGetUser(response, addUser);
            }}
            onError={() => console.log("login error")}
            text="signin"
            width="60"
          />
        </div>
      )}

      {openLogoutBtn && (
        <div
          className="absolute top-[11vh] right-4 md:right-6 z-10 transition-transform duration-200 ease-out"
          onClick={handleLogout}
        >
          <Button className="w-32 h-10 gap-2 rounded-lg flex items-center justify-center  text-xl font-bold bg-red-600 hover:bg-red-800">
            <BiLogOutCircle className="" />
            Logout
          </Button>
        </div>
      )}
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

export default dynamic(() => Promise.resolve(Header), { ssr: false });
// export default Header;
