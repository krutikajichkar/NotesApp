import React from "react";

const MainScreen = ({ title, children }) => {
  return (
    <>
      <div className="container pt-[120px]">
        {title && (
          <>
            <h1 className=" text-3xl sm:text-5xl pb-4 font-['work sans',sans sarif] flex justify-center">{title}</h1>
            <hr className="pb-8 font-bold " />
          </>
        )}

        {children}
      </div>
    </>
  );
};

export default MainScreen;
