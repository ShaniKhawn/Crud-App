import React, { Component } from 'react';
import './edit.css';
import axios from 'axios';

class EditCustomers extends Component {
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
    this.emailRef = React.createRef();
    this.phoneRef = React.createRef();
  }

  state = {
    id: '',
    name: '',
    email: '',
    phone: '',
    response: '',
  };

  onChangeHandler = (e) => this.setState({ [e.target.name]: e.target.value });

  async componentDidMount() {
    try {
      const { id } = this.props.match.params;
      const updatedCustomers = await axios.get(`http://localhost:9002/customers/${id}`);
      const { name, email, phone } = updatedCustomers.data.customer;
      this.setState({ id, name, email, phone });
    } catch (err) {
      this.setState({ response: 'Customer not found!' });
    }
  }

  updateCustomerHandler = async (e) => {
    e.preventDefault();
    try {
      const { id, name, email, phone } = this.state;
      console.log('Updating customer with id:', id); // Add this log statement
      const customer = await axios.put(`http://localhost:9002/customers/${id}`, {
        name,
        email,
        phone,
      });
      alert(customer.data.message);
      this.props.history.push('/home');
    } catch (err) {
      alert(err.message);
    }
  };
  

  render() {
    return (
      <div className="Edit-Student-Wrapper">
        <h1>Edit Customer Details</h1>

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          placeholder="Name"
          value={this.state.name}
          name="name"
          ref={this.nameRef}
          onChange={this.onChangeHandler}
          className="Add-Student-Input"
          required
          id="name"
        />

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          ref={this.emailRef}
          value={this.state.email}
          onChange={this.onChangeHandler}
          className="Add-Student-Input"
          required
          id="email"
        />

        <label htmlFor="phone">Phone:</label>

        <input
          type="text"
          placeholder="Enter Phone"
          name="phone"
          ref={this.phoneRef}
          value={this.state.phone}
          onChange={this.onChangeHandler}
          className="Add-Student-Input"
          required
          id="phone"
        />

        <button onClick={this.updateCustomerHandler}>Update</button>
      </div>
    );
  }
}

export default EditCustomers;
