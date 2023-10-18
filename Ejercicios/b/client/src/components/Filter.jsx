import React from "react";

const Filter = ({ filterPersons}) => {

  return (
    <div>
      filter shown with : <input name="filter" onChange={filterPersons} />
    </div>
  );
};

export default Filter;
