import axios from "axios";
import React, { memo, use, useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import { BsMoonStarsFill } from "react-icons/bs";

const Header = ({ likedCount, setPage, setLiked, like }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/recipes")
      .then((res) => {
        setData(res.data.recipes);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLike = (id) => {
    if (like.includes(id)) {
      let arr = like.filter((item) => {
        return item !== id;
      });
      setLiked(arr);
    } else setLiked([...like, id]);
  };

  const [isDark, setIsDark] = useState(false);

  // Brauzerdan oxirgi tema holatini o‘qib olish
  useEffect(() => {
    const theme = localStorage.getItem("dark");
    if (theme === "true") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);
  
  // Toggle qilish
  const handleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("dark", JSON.stringify(newTheme));
  };
  

  return (
    <div className="bg-[#d5d9e2] w-full mx-auto flex justify-around px-[10px] py-[10px] text-2xl fixed top-0 left-0 z-10 dark:bg-slate-700">
      <button onClick={() => setPage("Home")} className="cursor-pointer dark:text-white">
        Home
      </button>

      <div className="flex gap-10  dark:bg-slate-700">
        <span
          className="flex w-[40px] h-[40px] justify-center items-center relative"
          onClick={() => setPage("wishlist")}
        >
          <FaRegHeart className="text-[30px] cursor-pointer dark:text-white" />
          {likedCount > 0 && (
            <p className="absolute top-[-6px] right-[-6px] bg-red-500 text-white text-xs w-5 h-5 flex justify-center items-center rounded-full">
              {likedCount}
            </p>
          )}
        </span>
        <span
          className=" h-[40px] w-[80px] justify-center items-center flex"
          onClick={handleTheme}
        >
          {isDark ? (
            <BsMoonStarsFill className="text-[35px] cursor-pointer" />
          ) : (
            <IoSunnyOutline className="text-[35px] cursor-pointer" />
          )}
        </span>
      </div>
    </div>
  );
};

export default memo(Header);
