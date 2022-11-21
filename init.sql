SHOW databases;

CREATE DATABASE curbis DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
USE curbis;

-- 기존 테이블 지움 (필요없음)
DROP TABLE list;

SHOW tables;
alter table user DROP column name;

-- TODO: 새로운 데이터베이스 생성
CREATE TABLE user (
    userid VARCHAR(15) NOT NULL PRIMARY KEY,
    pw VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL,
    picture VARCHAR(100) NOT NULL,
    nickname VARCHAR(10) NOT NULL
);

CREATE TABLE list (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    topic VARCHAR(20) NOT NULL,
    introduce MEDIUMTEXT NOT NULL,
    address VARCHAR(50) NOT NULL,
    headcount INT,
    user_id VARCHAR(15) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES user(userid) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE chat (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    list_id INT NOT NULL,
    user_id VARCHAR(15) NOT NULL,
    msg MEDIUMTEXT NOT NULL,
    picture VARCHAR(100) NULL,
    time VARCHAR(10) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES user(userid) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(list_id) REFERENCES list(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE member (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    user_id VARCHAR(15) NOT NULL,
    list_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES user(userid) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(list_id) REFERENCES list(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE favorite (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    user_id VARCHAR(15) NOT NULL,
    list_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES user(userid) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(list_id) REFERENCES list(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- user 데이블 데이터 추가
INSERT INTO user (userid, name, pw) VALUES ('sean', 'sean', '1234');
INSERT INTO user (userid, name, pw) VALUES ('test', 'test', '1234');
INSERT INTO user (userid, name, pw) VALUES ('apple', 'apple', '1234');
INSERT INTO user (userid, name, pw) VALUES ('hello', 'hello', '1234');


-- user 테이블 구조 보기
DESC list; 
DESC user; 
DESC favorite; 
DESC chat; 
DESC member; 

-- user 테이블 데이터 조회
SELECT * FROM user;

-- 테이블 수정
alter table user DROP column email;
ALTER TABLE user ADD address VARCHAR(100) NOT NULL;