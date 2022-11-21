const models = require("../models");


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

// exports.postRegister = (req, res) => {
//     // User.signupBtn(req.body, (result) => {
//     //   console.log("signupBtn", result);
//     //   res.send();
//     // });
//     models.Muser.create({
//       userid: req.body.userid,
//       pw: req.body.pw,
//       email: req.body.email,
//       picture: req.body.picture,
//       nickname: req.body.name,
//       address: req.body.address,
//     }).then((result) => {

//       console.log("create >> ", result);
//       res.send();
//     });
//   };


exports.getChat =  (req, res) => {
  res.render("chat")
};

exports.postProfileImg = (req, res) => {
    // uploadDetail.single('dynamicFile');
    res.send(req.file);
}

exports.postSignup = (req, res) => {
  console.log('postSignup', req.body);
  models.Muser.create({
    picture: req.body.profile,
    userid: req.body.userid,
    pw: req.body.pw,
    nickname: req.body.nickname,
    address: req.body.address,

  }).then((result)=> {
    console.log('create >> ', result);
    res.send(result);
  });
}

exports.postSignin = (req, res) => {
  // [After]
  // SELECT * FROM user WHERE userid = '${data.userid}' AND pw = '${data.pw}'
  models.Muser.findOne({
    where: { 
      userid: req.body.userid,
      pw: req.body.pw,
    },
  }).then((result) => {
     if(result) {
      res.send(result);
     }
  });
};