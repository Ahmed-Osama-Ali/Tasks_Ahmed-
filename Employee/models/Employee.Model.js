const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  address: String,
  salary: Number,
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
