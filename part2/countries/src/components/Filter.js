import React from 'react'

const Filter = ({ onChange }) => {
  return (
    <p>
      find countries <input onChange={onChange} />
    </p>
  );
};

export default Filter
