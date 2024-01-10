const Customers = require("../models/customers");

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customers.find({});
    res.send({
      success: true,
      message: "Customers fetched successfully",
      data: customers,
    });
  } catch (err) {
    res
      .status(400)
      .send({
        success: false,
        message: "Failed to fetch customers",
        error: err,
      });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customers = await Customers.findById(req.params.id);
    res.send({
      success: true,
      message: "Customer fetched successfully",
      data: customers,
    });
  } catch (err) {
    res
      .status(404)
      .send({ success: false, message: "Customer not found", error: err });
  }
};

// const updateCustomer = async (req, res) => {
//   try {
//     const { id } = req.body; // Get the customer ID from the request body
//     const updatedCustomers = await Customers.findByIdAndUpdate(id, req.body, { new: true });
//     res.send({ success: true, message: 'Customer updated successfully', data: updatedCustomers });
//   } catch (err) {
//     res.status(400).send({ success: false, message: 'Failed to update customer', error: err.message });
//   }
// };

const updateCustomer = async (req, res) => {
  const updateData = req.body;
  try {
    const updatedCustomers = await Customers.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );
    res.status(200).send({
      success: true,
      message: "Customer updated successfully",
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: "Failed to update customer",
      error: err.message,
    });
  }
};

const addCustomer = async (req, res) => {
  try {
    const newCustomer = await Customers.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });
    res.send({
      success: true,
      message: "Customer added successfully",
      data: newCustomer,
    });
  } catch (err) {
    res
      .status(400)
      .send({ success: false, message: "Failed to add customer", error: err });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const removedCustomer = await Customers.findByIdAndRemove(req.params.id);
    res.send({
      success: true,
      message: "Customer deleted successfully",
      data: removedCustomer,
    });
  } catch (err) {
    res
      .status(400)
      .send({
        success: false,
        message: "Failed to delete customer",
        error: err,
      });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};
