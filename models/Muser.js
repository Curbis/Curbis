const User = function (Sequelize, DataTypes) {
    const model = Sequelize.define(
      "user",
      {
        userid: {
          type: DataTypes.STRING(15),
          allowNull: false,
          primaryKey: true,
        },
        pw: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        picture: {
          type: DataTypes.TEXT('medium'),
          allowNull: false,
        },
        nickname: {
            type: DataTypes.STRING(10),
            allowNull: false, 
        },
        address: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
      {
        tableName: "user", // 실제 DB의 테이블 이름
        freezeTableName: true, // 테이블 이름 고정
        timestamps: false, // 데이터가 추가/수정 시간을 자동으로 컬럼 만들어서 기록
      }
    );

    return model;
  };
  
  module.exports = User;
  