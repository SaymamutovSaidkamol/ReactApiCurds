import axios from "axios";
import React, { useEffect, useState } from "react";

const Category = ({ setFilteredData }) => {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/recipes/tags/")
      .then((res) => {

        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Categoryhandle = (e) => {
    const categoryText = e.target.textContent;
    let url = ""

    if (categoryText === "All") {
        // setData()
        setFilteredData(null)
        return
    }else{
        url = `https://dummyjson.com/recipes/tag/${categoryText}`;
    }

    axios
      .get(url)
      .then((res) => {
        // console.log(res.data.recipes);
        setFilteredData(res.data.recipes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container bg-[#EFEFEF] rounded-2xl h-20 mx-auto mt-15 px-5 dark:bg-slate-900 ">
        <ul className="flex  items-center gap-[20px] overflow-auto h-full scrollbar-hide">
          <li
            onClick={Categoryhandle}
            className="text-nowrap px-1 bg-[#EFEFEF] rounded text-[20px] cursor-pointer hover:bg-[#bebcbc]  dark:bg-slate-800 dark:text-white"
          >
            All
          </li>
          {category?.map((item, index) => (
            <li
              key={index}
              onClick={Categoryhandle}
              className="text-nowrap px-1 bg-[#EFEFEF] rounded text-[20px] cursor-pointer hover:bg-[#bebcbc] dark:bg-slate-800 dark:text-white"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Category;
