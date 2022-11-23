const { application } = require("express");
const express = require("express");
const controller = require("../controller/Cmain");
const router = express.Router();

// multer 설정
const multer = require("multer");
const path = require("path");
const upload = multer({
  dest: "uploads/",
});

const uploadDetail = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      // req: 요청에 대한 정보
      // file: 파일에 대한 정보
      // done(에러, 저장경로): 함수
      done(null, "uploads/"); // 경로설정
    },
    filename(req, file, done) {
      // req: 요청에 대한 정보
      // file: 파일에 대한 정보
      // done: 함수
      const ext = path.extname(file.originalname); // file.originalname에서 "확장자" 추출

      // test
      console.log(file.originalname); // peach.jpg
      console.log(ext); // .jpg
      console.log(path.basename(file.originalname, ext)); // path.basename('peach.jpg', '.jpg') => 'peach'

      done(null, path.basename(file.originalname, ext) + Date.now() + ext); // peach + 123123123123 + .jpg

      // [파일명+현재시간.확장자] 이름으로 바꿔서 파일 업로드
      // 현재시간: 파일명이 겹치는 것을 막기 위함
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// 기본주소: localhost:PORT

// GET / => localhost:PORT/
router.get("/", controller.main);

router.get("/groupCreate", controller.getGroupCreate);

router.get("/register", controller.getRegister);

// router.get("/create", controller.Creater);

router.get("/chat", controller.getChat);

// router.post('/register', controller.postRegister);

// // GET /visitor => localhost:PORT/visitor
router.get("/login", controller.login); // 전체 조회

router.post(
  "/dynamicFile",
  uploadDetail.single("dynamicFile"),
  controller.postProfileImg
);

router.post("/signup", controller.postSignup);

router.post("/signin", controller.postSignin);

// router.post('/upload', controller.postUpload)///

// // GET /visitor/get => localhost:PORT/visitor/get
// router.get('/visitor/get', controller.getVisitor); // 하나 조회

// // POST /visitor/write => localhost:PORT/visitor/write
// router.post('/visitor/write', controller.postVisitor); // 하나 추가

// // PATCH /visitor/edit => localhost:PORT/visitor/edit
// router.patch('/visitor/edit', controller.patchVisitor);  // 하나 수정

// // DELETE / visitor/delete => localhost:PORT/visitor/delete
// router.delete('/visitor/delete', controller.deleteVisitor)  // 하나 삭제

module.exports = router;
