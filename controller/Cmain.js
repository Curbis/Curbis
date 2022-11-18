const models = require("../models/Muser");

exports.main = (req, res) => {
  res.render("main");
};

exports.login = (req, res) => {
  res.render("login");
};