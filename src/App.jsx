import { memo, useEffect, useState } from "react";
import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Category from "./components/category/Category";

function App() {
  const [like, setLiked] = useState(
    JSON.parse(localStorage.getItem("like")) || []
  );
  const [page, setPage] = useState("Home");
  const [filteredData, setFilteredData] = useState(null);
  const [data, setData] = useState(null);

  return (
    <>
      <div className="bg-gray-100 min-h-screen dark:bg-slate-900">
        <Header
          likedCount={like.length}
          setPage={setPage}
          like={like}
          setLiked={setLiked}
        />
        <Category setFilteredData={setFilteredData} />
        <Content
          setLiked={setLiked}
          like={like}
          page={page}
          filteredData={filteredData}
          data={data}
          setData={setData}
        />
      </div>
    </>
  );
}

export default memo(App);
