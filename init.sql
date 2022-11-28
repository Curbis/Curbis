SHOW databases;

CREATE DATABASE curbis DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;

USE curbis;


-- 기존 테이블 지움 (필요없음)
DROP TABLE list;

SHOW tables;
alter table list DROP column name;
ALTER TABLE list ADD picture mediumtext NOT NULL;
ALTER TABLE user ADD day VARCHAR(50) NOT NULL;
ALTER TABLE user ADD hour VARCHAR(10) NOT NULL;
ALTER TABLE list ADD picture mediumtext NOT NULL;
ALTER TABLE list ADD day VARCHAR(50) NOT NULL;
ALTER TABLE list ADD hour VARCHAR(10) NOT NULL;
ALTER TABLE list ADD host VARCHAR(15) NOT NULL;
ALTER TABLE list ADD introduce mediumtext NOT NULL;
ALTER TABLE list ADD name VARCHAR(50) NOT NULL;



-- TODO: 새로운 데이터베이스 생성
CREATE TABLE user (
    userid VARCHAR(15) NOT NULL PRIMARY KEY,
    pw VARCHAR(20) NOT NULL,
    address VARCHAR(50) NOT NULL,
    picture MEDIUMTEXT NOT NULL,
    nickname VARCHAR(10) NOT NULL
);

CREATE TABLE list (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    topic VARCHAR(20) NOT NULL,
    introduce MEDIUMTEXT NOT NULL,
    address VARCHAR(50) NOT NULL,
    headcount INT,
    day VARCHAR(50) NOT NULL,
    hour VARCHAR(10) NOT NULL,
    picture MEDIUMTEXT NOT NULL,
    user_id VARCHAR(15) NOT NULL,
    host VARCHAR(15) NOT NULL,
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
INSERT INTO list (name, topic, introduce, picture, address, day, hour, headcount, user_id) VALUES ('낚시하실래요?', '낚시' ,'같이 낚시하실분들 모여주세요', 'http://localhost:8090/uploads/calzone1669115323399.jpg','서울시 동작구 구배동 112', '2022-11-25', '17:30', '6', 'aa');
INSERT INTO user (userid, name, pw) VALUES ('test', 'test', '1234');
INSERT INTO user (userid, name, pw) VALUES ('apple', 'apple', '1234');
INSERT INTO member (user_id, list_id) VALUES ('aa', '7');
INSERT INTO member (user_id, list_id) VALUES ('aaa', '9');
INSERT INTO member (user_id, list_id) VALUES ('aaaa', '8');
INSERT INTO member (user_id, list_id) VALUES ('aa', '9');
INSERT INTO member (user_id, list_id) VALUES ('aaaaa', '7');
INSERT INTO member (user_id, list_id) VALUES ('aaaaa', '6');



-- user 테이블 구조 보기
DESC list; 
DESC user; 
DESC member; 

-- user 테이블 데이터 조회
SELECT * FROM list;
SELECT * FROM user;


DELETE FROM list WHERE id > 0;
DELETE FROM user WHERE id > 0;
