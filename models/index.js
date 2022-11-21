// sequelize-cli 자동 생성한 파일
'use strict';

const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/config.json')['development'];
// const a = require(__dirname + '/../config/config.json');
// const a = {
//   "development": { "username": "user", "password": "1234", "database": "kdt", "host": "127.0.0.1", "dialect": "mysql" },
//   "test": {},
//   "production": {}
// }
// const config = a["development"];
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
// sequelize 객체 선언시 매개변수로 정보들을 받음

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// db = { sequelize: sequelize, Sequelize: Sequelize }

db.Mchat = require('./Mchat')(sequelize, Sequelize);
db.Muser = require('./Muser')(sequelize, Sequelize);
db.Mlist = require('./Mlist')(sequelize, Sequelize);
db.Mmember = require('./Mmember')(sequelize, Sequelize);
db.Mfavorite = require('./Mfavorite')(sequelize, Sequelize);
// models/Visitor.js 정의한 model이 db.Visitor에 들어감
// db = { sequelize: sequelize, Sequelize: Sequelize, Visitor: model }

// Mchat에서 FK 가져오기
db.Mlist.hasMany(db.Mchat, {
    foreignKey: 'list_id',
    sourceKey: 'id',
  });
  db.Mchat.belongsTo(db.Mlist, {
    foreignKey: 'list_id',
    targetKey: 'id',
  });


  

  db.Muser.hasMany(db.Mchat, {
    foreignKey: 'user_id',
    sourceKey: 'userid',
  });
  db.Mchat.belongsTo(db.Muser, {
    foreignKey: 'user_id',
    targetKey: 'userid',
  });


  
// Mlist에서 FK 가져오기
  db.Muser.hasMany(db.Mlist, {
    foreignKey: 'user_id',
    sourceKey: 'userid',
  });
  db.Mlist.belongsTo(db.Muser, {
    foreignKey: 'user_id',
    targetKey: 'userid',
  });



// Mfavorite에서 FK 가져오기
  db.Mlist.hasMany(db.Mfavorite, {
    foreignKey: 'list_id',
    sourceKey: 'id',
  });
  db.Mfavorite.belongsTo(db.Mlist, {
    foreignKey: 'list_id',
    targetKey: 'id',
  });


  db.Muser.hasMany(db.Mfavorite, {
    foreignKey: 'user_id',
    sourceKey: 'userid',
  });
  db.Mfavorite.belongsTo(db.Muser, {
    foreignKey: 'user_id',
    targetKey: 'userid',
  });
  
// Mmember에서 FK 가져오기
  db.Muser.hasMany(db.Mmember, {
    foreignKey: 'user_id',
    sourceKey: 'userid',
  });
  db.Mmember.belongsTo(db.Muser, {
    foreignKey: 'user_id',
    targetKey: 'userid',
  });

  db.Mlist.hasMany(db.Mmember, {
    foreignKey: 'list_id',
    sourceKey: 'id',
  });
  db.Mmember.belongsTo(db.Mlist, {
    foreignKey: 'list_id',
    targetKey: 'id',
  });







  module.exports = db;
  

// db 변수 내보냄 -> 다른 파일에서 사용하기 때문