import React from "react";

function Loader() {
  return (
    <div className="flex justify-center mt-[200px]">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
