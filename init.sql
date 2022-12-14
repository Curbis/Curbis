SHOW databases;

CREATE DATABASE curbis DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;

USE curbis;


-- 기존 테이블 지움 (필요없음)
-- DROP TABLE list;


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



CREATE TABLE member (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    user_id VARCHAR(15) NOT NULL,
    list_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES user(userid) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(list_id) REFERENCES list(id) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE chat (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    list_id INT NOT NULL,
    user_id VARCHAR(15) NOT NULL,
    content MEDIUMTEXT NOT NULL,
    time VARCHAR(50) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES user(userid) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(list_id) REFERENCES list(id) ON UPDATE CASCADE ON DELETE CASCADE
);


INSERT INTO chat (user_id, list_id, content, time) VALUES ('aaa', '43', '채팅입니다', '14:30');
INSERT INTO chat (user_id, list_id, content, time) VALUES ('aaa', '43', '채팅입니다', '14:30');
INSERT INTO chat (user_id, list_id, content, time) VALUES ('aaa', '43', '채팅입니다', '14:30');
INSERT INTO chat (user_id, list_id, content, time) VALUES ('aaa', '43', '채팅입니다', '14:30');


-- user 테이블 데이터 조회
-- SELECT * FROM list;
-- SELECT * FROM user;


-- DELETE FROM list WHERE id > 0;
-- DELETE FROM user WHERE id > 0;
