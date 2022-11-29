const models = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;
exports.main = async (req, res) => {
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
    res.render("main", { isLogin: true, userInfo: userInfo, result: members, mygroup: true, search: false });
  } else {
    res.render("main", { isLogin: false, result: members ,mygroup: true, search: false});
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
    if (user !== undefined) {
      const userInfo = await models.Muser.findOne({
        where: {
          userid: user,
        },
      });
      res.render("main", { isLogin: true, userInfo: userInfo, result: groups ,search: true, mygroup: false});
    } else {
      res.render("main", { isLogin: false, result: groups, search: true, mygroup: false });
    }
  } else {
    if (user !== undefined) {
      const userInfo = await models.Muser.findOne({
        where: {
          userid: user,
        },
      });
      res.render("main", { isLogin: true, userInfo: userInfo, result: groups ,search: false, mygroup: false});
    } else {
      res.render("main", { isLogin: false, result: groups, search: false, mygroup: false });
    }
  }
};
exports.login = (req, res) => {
  res.render("login");
};
exports.getGroupCreate = (req, res) => {
  let user = req.session.user;
  if (user !== undefined) {
    res.render("groupCreate");
  } else {
    res.send(`
        <script>
          alert("로그인 후 모임 생성이 가능합니다");
          document.location.href = "/";
        </script>
      `);
  }
};
exports.getRegister = (req, res) => {
  res.render("register");
};

exports.postProfileImg = (req, res) => {
  res.send(req.file);
};
exports.postSignup = (req, res) => {
  models.Muser.create({
    picture: req.body.profile,
    userid: req.body.userid,
    pw: req.body.pw,
    nickname: req.body.nickname,
    address: req.body.address,
  }).then((result) => {
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
      res.send({ islogin: false });
    } else {
      req.session.user = result.userid;
      res.send({ islogin: true, nick: result.nickname });
    }
  });
};
exports.overlapId = (req, res) => {
  models.Muser.findOne({
    where: { userid: req.body.userid },
  }).then((result) => {
    if (result === null) {
      res.send(false); // 중복검사 통과
    } else {
      res.send(true); // 중복검사 불통과
    }
  });
};
exports.overlapNick = (req, res) => {
  models.Muser.findOne({
    where: { nickname: req.body.nickname },
  }).then((result) => {
    if (result === null) {
      res.send(false); // 중복검사 통과
    } else {
      res.send(true); // 중복검사 불통과
    }
  });
};
exports.getLogout = (req, res) => {
  const user = req.session.user;
  if (user !== undefined) {
    req.session.destroy((err) => {
      if (err) {
        throw err;
      }
      res.send(true);
    });
  } else {
    res.send(false);
  }
};
exports.makeGroup = (req, res) => {
  let user = req.session.user;
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
    })
      .then((result) => {
        models.Mmember.create({
          user_id: req.session.user,
          list_id: result.dataValues.id,
        });
      })
      .then((result) => {
        res.send(true);
      });
  } else {
    res.send(false);
  }
};
exports.profile = (req, res) => {
  let user = req.session.user;
  if (user !== undefined) {
    models.Muser.findOne({
      where: {
        userid: user,
      },
    }).then((result) => {
      res.render("profile", { result: result });
    });
  } else {
    res.redirect("/");
  }
};
exports.passPw = (req, res) => {
  let user = req.session.user;
  let pw = req.body.pw;
  if (user !== undefined) {
    models.Muser.findOne({
      where: {
        userid: user,
      },
    }).then((result) => {
      if (result.pw == pw) {
        res.send(true);
      } else {
        res.send(false);
      }
    });
  } else {
    res.redirect("/");
  }
};
exports.postDetail = (req, res) => {
  let user = req.session.user;
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
    if (result.host == user) {
      res.send({ result: result, btn: "host" });
    } else {
      res.send({ result: result, btn: "nohost" });
    }
  });
};
exports.groupIn = (req, res) => {
  let user = req.session.user;
  if (user !== undefined) {
    models.Mmember.create({
      user_id: user,
      list_id: req.body.listId,
    }).then((result) => {
      res.send(true);
    });
  } else {
    res.send(false);
  }
};
exports.groupOut = (req, res) => {
  let user = req.session.user;
  if (user !== undefined) {
    models.Mmember.destroy({
      where: { user_id: user, list_id: req.body.listId },
    }).then((result) => {
      res.send(true);
    });
  } else {
    res.send(false);
  }
};
exports.groupDelete = (req, res) => {
  let user = req.session.user;
  if (user !== undefined) {
    models.Mlist.destroy({
      where: { id: req.body.listId },
    }).then((result) => {
      res.send(true);
    });
  } else {
    res.send(false);
  }
};
exports.groupFind = async (req, res) => {
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
        where: {
          user_id: user,
        },
      },
    ],
  });
  if (groups == "") {
  if (user !== undefined) {
    const userInfo = await models.Muser.findOne({
      where: {
        userid: user,
      },
    });
    res.render("main", { isLogin: true, userInfo: userInfo, result: groups, mygroup: false , search: true});
  } else {
    res.render("main", { isLogin: false, result: groups, mygroup: false, search: true });
  }
  } else {
    if (user !== undefined) {
      const userInfo = await models.Muser.findOne({
        where: {
          userid: user,
        },
      });
      res.render("main", { isLogin: true, userInfo: userInfo, result: groups, mygroup: false, search: false});
    } else {
      res.render("main", { isLogin: false, result: groups, mygroup: false, search: false});
    }
  }
};
exports.editPw = async (req, res) => {
  let user = req.session.user;
  if (user !== undefined) {
    models.Muser.update(
      {
        pw: req.body.pw,
      },
      {
        where: {
          userid: user,
        },
      }
    ).then((result) => {
      res.send(true);
    });
  } else {
    res.send(false);
  }
};
exports.profileEdittor = async (req, res) => {
  let user = req.session.user;
  if (user !== undefined) {
    models.Muser.update({
      picture: req.body.profile,
      nickname: req.body.nickname,
      address: req.body.address,
    },
    {
      where: {
        userid: user
      },
    }).then((result) => {
        res.send(true);
      });
  } else {
    res.send(false);
  }
};
exports.withdrawal = (req, res) => {
  let user = req.session.user;
  if (user !== undefined) {
    req.session.destroy((err) => {
      if (err) {
        throw err;
      }
    })
    models.Muser.destroy({
      where: { userid: user },
    }).then((result) => {
      res.send(true)
    })
  } else {
    res.send(false)
  }
};