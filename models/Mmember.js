const Member = function (Sequelize, DataTypes) {
    const model = Sequelize.define(
      "member",
      {
        id: {
          type: DataTypes.INTEGER, 
          primaryKey: true, 
          autoIncrement: true,
        },
      },
      {
        tableName: "member", // 실제 DB의 테이블 이름
        freezeTableName: true, // 테이블 이름 고정
        timestamps: false, // 데이터가 추가/수정 시간을 자동으로 컬럼 만들어서 기록
      }
    );
    return model;
  };

  module.exports = Member;