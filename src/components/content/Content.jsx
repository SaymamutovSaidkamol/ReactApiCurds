import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { FaHeart } from "react-icons/fa";
import Skelaton from "../Skelaton/Skelaton";

const Content = ({ setLiked, like, page, filteredData, data, setData }) => {
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchData = (append = false) => {
    axios
      .get(`https://dummyjson.com/recipes?limit=8&skip=${skip}`)
      .then((res) => {
        const newData = res.data.recipes;
        console.log(res.data.recipes);

        if (newData.length === 0) {
          setHasMore(false); 
        }
        if (res.data.recipes.length < 8) {
          console.log("Button hidden");
          setHasMore(false); 
        }

        setData((prevData) => (append ? [...prevData, ...newData] : newData));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSeeMore = () => {
    const newSkip = skip + 8;
    setSkip(newSkip); 
    setTimeout(() => {
      fetchData(true); 
    }, 100);
  };

  const handleLike = (id) => {
    // console.log(like);

    if (like.includes(id)) {
      let arr = like.filter((item) => {
        return item !== id;
      });
      setLiked(arr);
    } else setLiked([...like, id]);
  };

  useEffect(() => {
    localStorage.setItem("like", JSON.stringify(like));
  }, [like]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const displayData = filteredData || data;

  return (
    <>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <Skelaton key={index} />
            ))
          : displayData
              ?.slice(0, 8)
              .map((item, id) => (
                <div key={id} className="w-[300px] ..."></div>
              ))}
      </div>
      <div className="w-[900px] mx-auto grid grid-cols-4 gap-[20px]  justify-center mt-28 container items-center justify-items-center max-[1400px]:w-[800px] max-[1300px]:grid-cols-3 max-[950px]:grid-cols-2 max-[650px]:grid-cols-1">
        {displayData && page === "Home"
          ? displayData.map((item, id) => (
              <div
                className=" w-[300px] flex flex-col justify-between items-center relative p-4 bg-[#EFEFEF] dark:bg-slate-950 dark:text-white   rounded shadow-lg transition-transform duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl"
                key={id}
              >
                {/* Image */}
                <div className="w-full mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-[200px] object-cover rounded-lg"
                  />
                </div>

                {/* Product Information */}
                <div className="w-full">
                  <h1 className="font-semibold text-lg mb-2">{item.name}</h1>
                  <h3 className="flex flex-wrap gap-2 mb-2 max-w-full">
                    <strong className="dark:text-yellow-400">tags:</strong>
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="p-0.5 rounded bg-[#DFDFDF] text-[#666866] dark:text-white dark:bg-slate-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </h3>
                </div>

                {/* Like Button */}
                <button
                  onClick={() => handleLike(item.id)}
                  className="w-[60px] h-[60px] absolute top-2 right-3 cursor-pointer flex justify-center items-center p-2"
                >
                  {like.includes(item.id) ? (
                    <FcLike className="w-[50px] h-[50px] mx-auto" />
                  ) : (
                    <FaHeart className="w-[50px] h-[50px] mx-auto text-[#888383]  dark:text-white" />
                  )}
                </button>
              </div>
            ))
          : displayData
              ?.filter((prod) => like.includes(prod.id))
              .map((item, id) => (
                <div
                  className=" w-[300px] flex flex-col justify-between items-center relative p-4 bg-[#EFEFEF] rounded  dark:bg-slate-950 dark:text-white"
                  key={id}
                >
                  {/* Image */}
                  <div className="w-full mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-[200px] object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Information */}
                  <div className="w-full">
                    <h1 className="font-semibold text-lg mb-2">{item.name}</h1>
                    <h3 className="flex flex-wrap gap-2 mb-2 max-w-full">
                      <strong className="dark:text-yellow-400">tags:</strong>
                      {item.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="p-0.5 rounded bg-[#DFDFDF] text-[#666866]  dark:text-white dark:bg-slate-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </h3>
                  </div>

                  {/* Like Button */}
                  <button
                    onClick={() => handleLike(item.id)}
                    className="w-[60px] h-[60px] absolute top-2 right-3 cursor-pointer flex justify-center items-center p-2"
                  >
                    {like.includes(item.id) ? (
                      <FcLike className="w-[50px] h-[50px] mx-auto" />
                    ) : (
                      <FaHeart className="w-[50px] h-[50px] mx-auto text-[#888383] dark:text-white" />
                    )}
                  </button>
                </div>
              ))}
      </div>
      {hasMore && (
        <div className="container mx-auto flex mt-10 justify-center items-center h-[50px]">
          <button
            onClick={handleSeeMore}
            className="border h-full w-[150px] bg-[#a9b2c7] rounded-[8px] text-white cursor-pointer hover:bg-[#929ebb]"
          >
            See more +10
          </button>
        </div>
      )}
    </>
  );
};

export default memo(Content);
