const models = require("../models");

exports.main = async(req, res) => {
console.log('세션', req.session.user);
  const user = req.session.user;
  // const result = await models.Mlist.findAll(); // 전체  [ {}, {}, {}, {} ]
  // let memberArray= {};
  // // for (i = 0; i < Object.keys(result).length; i++){ // 4
  //   const members = await models.Mmember.findAll({
  //     include: [
  //       // { model: models.Orderlist, attributes: ['product_name', 'quantity'] },
  //       { model: models.Mlist,
  //         where: { id: result[i].id }
  //       },
  //     ],
  //     raw: true,
  //   })
  //   console.log('****', members)

  //   // for (j = 0; j < Object.keys(members).length; j++){
  //   //   // memberArray[result[i].id] = memberss[j].user_id

  //   // }
  //   // console.log('memberArray',memberArray);
  // }

  const members = await models.Mlist.findAll({
    include: [
      {model: models.Mmember,
      include: [
        {
          model: models.Muser
        }
      ]
      }
    ],
    // raw: true
  })
  // res.send(members);


// console.log('memberArray >>>', memberArray);
  if (user !== undefined){
    const userInfo = await models.Muser.findOne({
      where: { 
        userid: user
      },
  })
    res.render('main', {isLogin: true, userInfo: userInfo, result: members});
    console.log(userInfo);
  } else {
    res.render('main', {isLogin: false, result: members});
  }
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
  res.render("chat");
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
      req.session.user = result.userid;
      console.log('로그인',req.session.user);
      res.send(true);
    }
  });
};

exports.overlapId = (req, res) => {
console.log(req.body.userid);
  models.Muser.findOne({
    where: { userid: req.body.userid },
  }).then((result) => {
    console.log("findOne >> ", result);
      if (result === null){
      res.send(false); // 중복검사 통과
    } else{
      res.send(true); // 중복검사 불통과
    };
  });
};



exports.overlapNick = (req, res) => {
  console.log(req.body.nickname);
    models.Muser.findOne({
      where: { nickname: req.body.nickname },
    }).then((result) => {
      console.log("findOne >> ", result);
        if (result === null){
        res.send(false); // 중복검사 통과
      } else{
        res.send(true); // 중복검사 불통과
      };
    });
  };
  