SHOW databases;
USE kdt;
SHOW tables;

-- 기존 테이블 지움 (필요없음)
DROP TABLE user;

-- TODO: 새로운 데이터베이스 생성
CREATE TABLE user (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userid VARCHAR(20) NOT NULL, 
    name VARCHAR(10) NOT NULL,
    pw VARCHAR(20) NOT NULL
);

-- user 데이블 데이터 추가
INSERT INTO user (userid, name, pw) VALUES ('sean', 'sean', '1234');
INSERT INTO user (userid, name, pw) VALUES ('test', 'test', '1234');
INSERT INTO user (userid, name, pw) VALUES ('apple', 'apple', '1234');
INSERT INTO user (userid, name, pw) VALUES ('hello', 'hello', '1234');

-- user 테이블 구조 보기
DESC user; 

-- user 테이블 데이터 조회
SELECT * FROM user;