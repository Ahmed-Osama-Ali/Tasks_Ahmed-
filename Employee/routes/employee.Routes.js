const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee.Model.js");

router.get("/", async (req, res) => {
  const employees = await Employee.find();
  res.render("index", { title: "Employee Manager", employees });
});

router.get("/new", (req, res) => {
  res.render("form", { title: "Add Employee" });
});

router.post("/", async (req, res) => {
  await Employee.create(req.body);
  res.redirect("/");
});

router.get("/edit/:id", async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.render("edit", { title: "Edit Employee", employee });
});

router.post("/update/:id", async (req, res) => {
  await Employee.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
});

router.delete("/delete/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;
