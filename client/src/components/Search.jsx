import React from "react";

const Search = () => {
  return (
    <div className="my-4 flex items-center justify-center px-18">
      <div className="w-full border rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-400">
        <input
          type="text"
          placeholder="Search product..."
          className="w-full bg-transparent p-2 rounded-lg border-none outline-none"
        />
      </div>
    </div>
  );
};

export default Search;
