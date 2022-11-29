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
      done(null, "uploads/"); // 경로설정
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // file.originalname에서 "확장자" 추출
      done(null, path.basename(file.originalname, ext) + Date.now() + ext); // peach + 123123123123 + .jpg
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.get("/", controller.main);

router.get("/groupCreate", controller.getGroupCreate);

router.get("/register", controller.getRegister);controller

router.get("/login", controller.login);

router.get("/profile", controller.profile);

router.post(
  "/dynamicFile",
  uploadDetail.single("dynamicFile"),
  controller.postProfileImg
);

router.post("/signup", controller.postSignup);

router.post("/signin", controller.postSignin);

router.post("/overlapNick", controller.overlapNick);

router.post("/overlapId", controller.overlapId);

router.get("/logout", controller.getLogout);

router.post("/serch", controller.postSerch)

router.post("/detail", controller.postDetail)

router.post("/profileEdittor", controller.profileEdittor)

router.post("/withdrawal", controller.withdrawal)

router.post("/overlapNick", controller.overlapNick);

router.post("/overlapId", controller.overlapId);


router.post("/makeGroup", controller.makeGroup);

router.post("/groupIn", controller.groupIn);

router.post("/groupOut", controller.groupOut);

router.post("/groupDelete", controller.groupDelete);

router.post("/passPw", controller.passPw);

router.post("/editPw", controller.editPw);

router.post("/groupFind", controller.groupFind);


module.exports = router;

