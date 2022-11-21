const models = require("../models/Muser");

exports.main = (req, res) => {
  res.render("main");
};

exports.login = (req, res) => {
  res.render("login");
};

// exports.getGroupCreate =  (req, res) => {
//   res.render("groupCreate")
// };

exports.getRegister =  (req, res) => {
  res.render("register")
};

exports.postProfileImg = (req, res) => {
    // uploadDetail.single('dynamicFile');
    res.send(req.file);
}

exports.postSignup = (req, res) => {
  console.log('postSignup', req.body);
  models.MUser.create({
    profile: req.body.profile,
    userid: req.body.userid,
    pw: req.body.pw,
    name: req.body.name,
    nickname: req.body.nickname,
    address: req.body.address,
  }).then((result)=> {
    console.log('create >> ', result);
    res.send(result);
  });
}