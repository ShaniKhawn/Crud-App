import React from "react";
import "./Customer.css";
import { Link } from "react-router-dom";

const Customer = ({ id, name, email, phone, removeCustomer }) => {
  const handleRemoveClick = () => {
    console.log("Deleting customer with id:", id);
    removeCustomer(id);
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>
        <button onClick={handleRemoveClick} className="Action-Button delete">
          Delete
        </button>
        <Link to={{ pathname: `/edit/${id}` }}>
          <button className="Action-Button edit">Edit</button>
        </Link>
      </td>
    </tr>
  );
};

export default Customer;
