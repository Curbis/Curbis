const List = function (Sequelize, DataTypes) {
    const model = Sequelize.define(
      "list",
      {
        id: {
          type: DataTypes.INTEGER, 
          primaryKey: true, 
          autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
          },
        topic: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        introduce: {
          type: DataTypes.TEXT('medium'),
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        day: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        hour: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        picture: {
          type: DataTypes.TEXT('medium'),
          allowNull: false,
        },
        headcount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
      {
        tableName: "list", // 실제 DB의 테이블 이름
        freezeTableName: true, // 테이블 이름 고정
        timestamps: false, // 데이터가 추가/수정 시간을 자동으로 컬럼 만들어서 기록
      }
    );
  
    return model;
  };
  
  module.exports = List;
  
