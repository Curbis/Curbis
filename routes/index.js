const express = require('express');
const controller = require('../controller/Cmain');
const router = express.Router();

// 기본주소: localhost:PORT

// GET / => localhost:PORT/
router.get('/', controller.main);

router.get('/groupCreate', controller.getGroupCreate);

router.get('/register', controller.getRegister);

router.get('/chat', controller.getChat);

// router.post('/register', controller.postRegister);

// // GET /visitor => localhost:PORT/visitor
router.get('/login', controller.login); // 전체 조회    

// // GET /visitor/get => localhost:PORT/visitor/get
// router.get('/visitor/get', controller.getVisitor); // 하나 조회

// // POST /visitor/write => localhost:PORT/visitor/write
// router.post('/visitor/write', controller.postVisitor); // 하나 추가

// // PATCH /visitor/edit => localhost:PORT/visitor/edit
// router.patch('/visitor/edit', controller.patchVisitor);  // 하나 수정

// // DELETE / visitor/delete => localhost:PORT/visitor/delete
// router.delete('/visitor/delete', controller.deleteVisitor)  // 하나 삭제


module.exports = router;