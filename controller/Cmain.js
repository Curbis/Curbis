const models = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

exports.main = async (req, res) => {
  // console.log("세션", req.session.user);
  let user = req.session.user;
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
      {
        model: models.Mmember,
        include: [
          {
            model: models.Muser,
          },
        ],
      },
    ],
    // raw: true
  });
  // res.send(members);

  if (user !== undefined) {
    const userInfo = await models.Muser.findOne({
      where: {
        userid: user,
      },
    });
    res.render("main", { isLogin: true, userInfo: userInfo, result: members });
  
  } else {
    res.render("main", { isLogin: false, result: members });
  }
};

// console.log('memberArray >>>', memberArray);

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
     
    } else {
      res.render("main", { isLogin: false, result: groups });
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
    // 유저가 브라우저에서 /logout 경로로 직접 접근
    // res.send()
    // - alert()
    // - / 경로로 이동
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
      res.send(false);
    } else {
      req.session.user = result.userid;
  
      res.send(true);
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
    if (result.host == user){
     res.send({result: result, btn: 'host'});
   } else {
      res.send({result: result, btn: 'nohost'});
   }
  })
};

exports.groupIn = (req, res) => {
  let user = req.session.user;

  if (user !== undefined) {
    models.Mmember.create({
      user_id: user,
      list_id: req.body.listId
    })
     
      .then((result) => {
        res.send(true);
      });
  } else {
    res.send(false);
  }
};