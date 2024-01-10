import React, { Component } from "react";
import axios from "axios";
import { PropagateLoader } from "react-spinners";
import swal from "sweetalert";
import Customer from "../Customer/Customer";
import "./Home.css";

class TotalCustomer extends Component {
  state = {
    data: null,
    error: "",
  };

  async componentDidMount() {
    try {
      const customers = await axios.get("http://localhost:9002/customers");
      this.setState({ data: customers.data.data });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  removeCustomer = async (id) => {
    console.log("Removing customer with id:", id);
    try {
      await axios.delete(`http://localhost:9002/customers/${id}`);
      const customers = await axios.get("http://localhost:9002/customers");
      this.setState({ data: customers.data.data });
      swal("Deleted!", "Successfully!", "success");
    } catch (err) {
      this.setState({ error: err.message });
      console.error("Error deleting customer:", err);
      swal("Deleted!", "Error!", "error");
    }
  };

  render() {
    let customers;

    if (this.state.data) {
      customers = this.state.data.map((customer) => (
        <Customer key={customer._id} {...customer} removeCustomer={() => this.removeCustomer(customer._id)} />
      ));
    } else {
      return (
        <div className="Spinner-Wrapper">
          {" "}
          <PropagateLoader color={"#333"} />{" "}
        </div>
      );
    }

    return (
      <div className="Table-Wrapper">
        <h1>Customers</h1>
        <table className="Table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{customers}</tbody>
        </table>
      </div>
    );
  }
}

export default TotalCustomer;
