import React from "react";

const Filter = ({ onChange }) => {
  return (
    <>
      filter shown with <input name="search" onChange={onChange} />
    </>
  );
};

export default Filter;
