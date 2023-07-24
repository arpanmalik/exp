/** @format */

import React from "react";

const Filter = ({ setQuery  , placeholder}) => {
  return (
    <div className="filterBox">
      <img
        src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
        alt=""
      />
      <input
        type="search"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default Filter;
