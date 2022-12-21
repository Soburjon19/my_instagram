import React, { useContext, useState, useEffect, useRef } from "react";
import { FaPlusSquare } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { EDIT_PROFILE, HOME, LOGIN } from "../constants/routes";
import { HiHome } from "react-icons/hi";
import UserContext from "./../context/user";
import FirebaseContext from "./../context/firebase";
import { SIGN_UP } from "./../constants/routes";
import CreatePost from "../components/createPost/CreatePost";
import useUser from "../hooks/useUser";
import "./style.css";
import SearchBar from "./SearchBar";
import { IoLogOut } from "react-icons/io5";

const NavBar = () => {
  const navigate = useNavigate();
  const searchRef = useRef();
  const navbarRef = useRef(null);
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState("");
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    user: { avatarSrc, username },
  } = useUser();

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const isSticky = (e) => {
    const header = navbarRef.current;
    const scrollTop = window.scrollY;
    scrollTop >= 63
      ? header.classList.add("is-sticky")
      : header.classList.remove("is-sticky");
  };

  return (
    <>
      <CreatePost open={open} setOpen={setOpen} />
      <div className="border-b border-black h-20" ref={navbarRef}>
        <div className="flex items-center h-full justify-between container mx-auto max-w-screen-lg relative">
          <div className="navbar-logo cursor-pointer" onClick={() => navigate(HOME)}>
            <Link to="/">
              <img src="/images/Instagram_Logo_2016.png"
                className="h-10 w-auto object-cover" alt=""/>
            </Link>
          </div>
          <div className="w-60">
            <div>
              <input value={search} onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setFocused(true)} type="text"
                className="bg-[#EFEFEF] text-gray-900 outline-none text-sm rounded w-full px-4 py-2"
                placeholder="Search"/>
            </div>
            {focused && (
              <div className="absolute top-14 w-80 max-h-60 overflow-auto h-60 bg-white border rounded py-3 px-4"
                ref={searchRef}>
                <SearchBar searchInput={search} />
              </div>
            )}
          </div>

          <div>
            <div className="flex">
              {user ? (
                <>
                  <div className="p-2 mt-6 mr-2 h-90 text-white">
                    <HiHome className="text-[1.8rem]" />
                  </div>
                  <div className="cursor-pointer flex items-center justify-center mr-6 text-white"
                    onClick={() => setOpen(true)}>
                    <div></div>
                    <div className="p-2 mt-5 mr-2">
                      <FaPlusSquare className="text-[1.8rem]" />
                    </div>

                    <div className="mt-4 cursor-pointer flex items-center justify-center mr-4  text-white">
                      <button type="button" title="Sign Out" onClick={() => firebase.auth().signOut()}
                        className="p-4">
                        <IoLogOut className="text-[1.8rem]" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-7 rounded-full border-2 border-sky-600 cursor-pointerflex items-center justify-center w-8 h-8 relative select-none"
                    onClick={() => setDropdownOpen((prev) => !prev)}>
                    <img className=" rounded-full w-full h-full" src={avatarSrc} alt={""}/>
                    <div
                      className={
                        !dropdownOpen
                          ? "hidden"
                          : "" +
                            " bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow absolute top-10 right-0"
                      }>
                      <ul className="py-1" aria-labelledby="dropdown">
                        <li className="hover:bg-gray-100" onClick={() => navigate(`/${username}`)}>
                          <div className="flex items-center px-4 py-2">
                            <div className="flex items-center mr-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
                              </svg>
                            </div>
                            <span className="text-sm text-gray-700 block">
                              Profile
                            </span>
                          </div>
                        </li>
                        <li className="border-b hover:bg-gray-100" onClick={() => navigate(EDIT_PROFILE)}>
                          <div className="flex items-center px-4 py-2 pr-10">
                            <div className="flex items-center mr-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"/>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                              </svg>
                            </div>
                            <span className="text-sm text-gray-700 block">
                              Settings
                            </span>
                          </div>
                        </li>
                        <li onClick={() => firebase.auth().signOut()}>
                          <span className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                            Sign out
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link to={LOGIN}>
                    <button className="bg-blue-inst font-bold text-sm rounded text-white w-20 h-8" type="button">
                      Log In
                    </button>
                  </Link>
                  <Link to={SIGN_UP}>
                    <button className="text-blue-inst font-bold text-sm rounded text-white w-20 h-8" type="button">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
