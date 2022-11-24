// const session = require("express-session");
const models = require("../models");

exports.main = async(req, res) => {
console.log('세션', req.session.user);
  const user = req.session.user;
  // console.log(user);
  const result = await models.Mlist.findAll()

// result: result
  if (user !== undefined){
    const userInfo = await models.Muser.findOne({
      where: { 
        userid: user
      },
  })
    res.render('main', {isLogin: true, userInfo: userInfo, result: result})
    console.log(result);
  } else {
    res.render('main', {isLogin: false,  result: result})
  }
  // console.log(req.session.user);
  // res.render('index');
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
      req.session.user = result.userid;
      console.log('로그인',req.session.user);
      res.send(true);
    }
  });
};

// exports.profile = (req, res) => {

//   models.Muser.findOne({
//     where: {
//       userid: req.body.userid,
//     },
//   }).then((result) => {
//     console.log(result);
//     if (result == undefined) {
//       res.redirect("/login");
//     } else {
//       res.redirect("/" );
//     }
//   });
// };


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
    }
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
      }
    });
  };
  
  exports.getLogout = (req, res) => {
    const user = req.session.user;
    console.log('요청받은 세션 유저 >>>>>', user)
  
    if (user !== undefined) {
      req.session.destroy((err) => {
        if(err) {
          throw err;
        }
        console.log('세션을 지운 후, req.seesion.user >>', user);
        res.send(`
          <script>
            alert('로그아웃 되었어요');
            document.location.href = '/'; 
          </script>
        `)
      });
    } else {
      // 유저가 브라우저에서 /logout 경로로 직접 접근
      // res.send()
      // - alert()
      // - / 경로로 이동
      res.send(`
        <script>
          alert('잘못된 접근입니다');
          document.location.href = '/'; 
        </script>
      `)
    }
  }