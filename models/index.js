// sequelize-cli 자동 생성한 파일
'use strict';

const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/config.json')['development'];
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);


db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Muser = require('./Muser')(sequelize, Sequelize);
db.Mlist = require('./Mlist')(sequelize, Sequelize);
db.Mmember = require('./Mmember')(sequelize, Sequelize);

// Mlist에서 FK 가져오기
  db.Muser.hasMany(db.Mlist, {
    foreignKey: 'user_id',
    sourceKey: 'userid',
  });
  db.Mlist.belongsTo(db.Muser, {
    foreignKey: 'user_id',
    targetKey: 'userid',
  });

  db.Muser.hasMany(db.Mlist, {
    foreignKey: 'host',
    sourceKey: 'userid',
  });
  db.Mlist.belongsTo(db.Muser, {
    foreignKey: 'host',
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