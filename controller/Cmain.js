const models = require("../models/Muser");

exports.main = (req, res) => {
  res.render("main");
};

exports.getGroupCreate =  (req, res) => {
  res.render("groupCreate")
};

exports.getRegister =  (req, res) => {
  res.render("register")
};
