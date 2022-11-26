const models = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

exports.main = async (req, res) => {
  console.log("세션", req.session.user);
  let user = req.session.user;
  const members = await models.Mlist.findAll({
    include: [
      {
        model: models.Mmember,
        include: [
          {
            model: models.Muser,
          },
        ],
      },
    ],
  });

  if (user !== undefined) {
    const userInfo = await models.Muser.findOne({
      where: {
        userid: user,
      },
    });
    res.render("main", { isLogin: true, userInfo: userInfo, result: members });
    console.log(userInfo);
  } else {
    res.render("main", { isLogin: false, result: members });
  }
};

exports.postSerch = async (req, res) => {
  let user = req.session.user;
  let groups = await models.Mlist.findAll({
    include: [
      {
        model: models.Mmember,
        include: [
          {
            model: models.Muser,
          },
        ],
      },
    ],
    where: {
      name: {
        [Op.like]: `%${req.body.serch}%`,
      },
    },
  });
  console.log("members는 이거다", groups);
  if (groups == "") {
    groups = await models.Mlist.findAll({
      include: [
        {
          model: models.Mmember,
          include: [
            {
              model: models.Muser,
            },
          ],
        },
      ],
      where: {
        topic: {
          [Op.like]: `%${req.body.serch}%`,
        },
      },
    });
  }

  if (groups == "") {
    groups = await models.Mlist.findAll({
      include: [
        {
          model: models.Mmember,
          include: [
            {
              model: models.Muser,
            },
          ],
        },
      ],
      where: {
        address: {
          [Op.like]: `%${req.body.serch}%`,
        },
      },
    });
  }

  if (groups == "") {
    res.send(`
        <script>
          alert('검색 결과가 없어요');
          document.location.href = '/'; 
        </script>
      `);
  } else {
    if (user !== undefined) {
      const userInfo = await models.Muser.findOne({
        where: {
          userid: user,
        },
      });

      res.render("main", { isLogin: true, userInfo: userInfo, result: groups });
      console.log(userInfo);
    } else {
      res.render("main", { isLogin: false, result: groups });
    }
  }
};

exports.login = (req, res) => {
  res.render("login");
};

exports.getGroupCreate = (req, res) => {

  let user = req.session.user
  if (user !== undefined) {
      res.render("groupCreate");
  } else {
    res.send(`
        <script>
          alert('로그인 후 모임 생성이 가능합니다');
          document.location.href = '/'; 
        </script>
      `);
  }
};

exports.getRegister = (req, res) => {
  res.render("register");
};

exports.getChat = (req, res) => {
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
};

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
      console.log("로그인", req.session.user);
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
    if (result === null) {
      res.send(false); // 중복검사 통과
    } else {
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
    if (result === null) {
      res.send(false); // 중복검사 통과
    } else {
      res.send(true); // 중복검사 불통과
    }
  });
};

exports.getLogout = (req, res) => {
  const user = req.session.user;
  console.log("요청받은 세션 유저 >>>>>", user);

  if (user !== undefined) {
    req.session.destroy((err) => {
      if (err) {
        throw err;
      }
      console.log("세션을 지운 후, req.seesion.user >>", user);
      res.send(`
          <script>
            alert('로그아웃 되었어요');
            document.location.href = '/'; 
          </script>
        `);
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
      `);
  }
};
exports.makeGroup =  (req, res) => {

  let user = req.session.user
 
  if (user !== undefined) {

    models.Mlist.create({
      picture: req.body.picture,
      topic: req.body.topic,
      introduce: req.body.introduce,
      address: req.body.address,
      name: req.body.name,
      day: req.body.day,
      hour: req.body.hour,
      headcount: req.body.headcount,
      user_id: req.session.user,
      host: req.session.user,
    }).then((result) => {
      models.Mmember.create({
        user_id: req.session.user,
        list_id: result.dataValues.id,
      })
    }).then((result) => {
      res.send(true)
    })
  } else {
    res.send(false)
  }
};


exports.profile =  (req, res) => {
  let user = req.session.user
  if (user !== undefined) {
    models.Muser.findOne({
      where: {
        userid: user,
      },
    }).then((result) => {
    res.render('profile',{result:result})
    })
  } else {
    res.redirect('/')
  }
}

exports.passPw =  (req, res) => {
  let user = req.session.user
  if (user !== undefined) {
    models.Muser.findOne({
      where: {
        userid: user,
      },
    }).then((result) => {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..',result.pw)
      if(result == null || result == undefined || result == ''){
    res.send(false)
      } else {
        res.send(true)
      }
    })
  } else {
    res.redirect('/')
  }
}

exports.postDetail = (req, res) => {
  models.Mlist.findOne({
    include: [
      {
        model: models.Mmember,
        include: [
          {
            model: models.Muser,
          },
        ],
      },
    ],
    where: {
      id: req.body.groupId,
    },
  }).then((result) => {
    res.send(result);
  });
};
