const Favorite = function (Sequelize, DataTypes) {
    // Sequelize: models/index.js 의 sequelize
    // DataTypes: models/index.js 의 Sequelize
  
    // Sequelize.define(param1, param2, param3)
    // param1: 모델 이름 설정 -> ''
    // param2: 컬럼 정의 -> {}
    // param3: 모델 옵션 정의 -> {}
  
    const model = Sequelize.define(
      "favorite",
      {
        // id INT NOT NULL PRIMARY KEY AUTO_INCREMENT
        id: {
          type: DataTypes.INTEGER,
  
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
      
      },
      {
        tableName: "favorite", // 실제 DB의 테이블 이름
        freezeTableName: true, // 테이블 이름 고정
        timestamps: false, // 데이터가 추가/수정 시간을 자동으로 컬럼 만들어서 기록
      }
    );
  
    return model;
  };
  
  module.exports = Favorite;
  