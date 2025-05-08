import React, { memo } from "react";

const Skelaton = () => {
  return (
    <div className="container mx-auto">
      <div className="w-[300px] bg-[#fdf7f7] h-[350px] rounded-[5px] shadow-2xl dark:bg-slate-800">
        <div className="w-full h-1/2 bg-[#DFDFDF] rounded-[5px] scelaton__animation"></div>
        <div className="w-full h-1/2 flex flex-col gap-4 justify-center ml-2">
          <div className="w-[250px] h-[30px] rounded-[5px] bg-[#DFDFDF] scelaton__animation"></div>
          <div className="w-[250px] h-[30px] flex gap-2">
            <div className="w-[70px] h-[30px] rounded-[5px] bg-[#DFDFDF] scelaton__animation"></div>
            <div className="w-[50px] h-[30px] rounded-[5px] bg-[#DFDFDF] scelaton__animation"></div>
            <div className="w-[50px] h-[30px] rounded-[5px] bg-[#DFDFDF] scelaton__animation"></div>
            <div className="w-[50px] h-[30px] rounded-[5px] bg-[#DFDFDF] scelaton__animation"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Skelaton);
