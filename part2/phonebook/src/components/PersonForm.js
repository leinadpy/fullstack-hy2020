import React from "react";

const PersonForm = ({ onSubmit, onChange, newName, newNumber }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input name="name" value={newName} onChange={onChange} />
      </div>
      <div>
        number: <input name="number" value={newNumber} onChange={onChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
