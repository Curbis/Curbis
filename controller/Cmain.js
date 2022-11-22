const models = require("../models");

exports.main = (req, res) => {
  res.render("main");
};

exports.login = (req, res) => {
  res.render("login");
};

exports.getGroupCreate = (req, res) => {
  res.render("groupCreate");
};

exports.getRegister = (req, res) => {
  res.render("register");
};

exports.getChat =  (req, res) => {
  res.render("chat")
};

exports.postProfileImg = (req, res) => {
  // uploadDetail.single('dynamicFile');
  res.send(req.file);
};

exports.postSignup = (req, res) => {
  console.log("postSignup", req.body);
  models.Muser.create({
    picture: req.body.profile,
    userid: req.body.userid,
    pw: req.body.pw,
    nickname: req.body.nickname,
    address: req.body.address,
  }).then((result) => {
    console.log("create >> ", result);
    res.send(result);
  });
}

exports.postSignin = (req, res) => {
  models.Muser.findOne({
    where: { 
      userid: req.body.userid,
      pw: req.body.pw,
    },
  }).then((result) => {
    if (result == null) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
};



exports.overlap = (req, res) => {
console.log(req.body.userid);
  models.Muser.findOne({
    where: { userid: req.body.userid },
  }).then((result) => {
    console.log("findOne >> ", result);
      if (result === null){
      res.send(false); // 중복검사 통과
    } else{
      res.send(true); // 중복검사 불통과
    }
  });
};

