SHOW databases;
USE curbis;
SHOW tables;

-- 기존 테이블 지움 (필요없음)
DROP TABLE user;

-- TODO: 새로운 데이터베이스 생성
CREATE TABLE user (
    userid VARCHAR(15) NOT NULL PRIMARY KEY,
    pw VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL,
    picture VARCHAR(100) NOT NULL,
    name VARCHAR(10) NOT NULL,
    address VARCHAR(50) NOT NULL,
);

CREATE TABLE group (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    topic VARCHAR(20) NOT NULL,
    introduce VARCHAR(100) NOT NULL,
    address VARCHAR(50) NOT NULL,
    headcount INT NOT NULL,
    user_id VARCHAR(15) NOT NULL,
    chat_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES user(userid) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(chat_id) REFERENCES chat(id) ON UPDATE CASCADE ON DELETE CASCADE,
);

CREATE TABLE chat (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    group_id INT NOT NULL,
    user_id INT NOT NULL,
    msg VARCHAR(1000) NOT NULL,
    picture VARCHAR(100) NOT NULL,
    time VARCHAR(10) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES user(userid) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(group_id) REFERENCES group(id) ON UPDATE CASCADE ON DELETE CASCADE,
);

CREATE TABLE member (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    group_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES user(userid) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(group_id) REFERENCES group(id) ON UPDATE CASCADE ON DELETE CASCADE,
);

CREATE TABLE favorite (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    group_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES user(userid) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(group_id) REFERENCES group(id) ON UPDATE CASCADE ON DELETE CASCADE,
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

