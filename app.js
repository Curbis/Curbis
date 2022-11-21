const express = require('express');
const app = express();
const PORT = 8090;

// // multer 설정
// const multer = require('multer');
// const path = require('path');
// const upload = multer({
//   dest: 'uploads/',
// });

// const uploadDetail = multer({
//   storage: multer.diskStorage({
//     destination(req, file, done) {
//       // req: 요청에 대한 정보
//       // file: 파일에 대한 정보
//       // done(에러, 저장경로): 함수
//       done(null, 'uploads/'); // 경로설정
//     },
//     filename(req, file, done) {
//       // req: 요청에 대한 정보
//       // file: 파일에 대한 정보
//       // done: 함수
//       const ext = path.extname(file.originalname); // file.originalname에서 "확장자" 추출

//       // test
//       console.log(file.originalname); // peach.jpg
//       console.log(ext); // .jpg
//       console.log(path.basename(file.originalname, ext)); // path.basename('peach.jpg', '.jpg') => 'peach'

//       done(null, path.basename(file.originalname, ext) + Date.now() + ext); // peach + 123123123123 + .jpg

//       // [파일명+현재시간.확장자] 이름으로 바꿔서 파일 업로드
//       // 현재시간: 파일명이 겹치는 것을 막기 위함
//     },
//   }),
//   limits: { fileSize: 5 * 1024 * 1024 },
// });

app.set('view engine', 'ejs');
app.use('/views', express.static(__dirname + '/views'));
app.use('/uploads', express.static(__dirname + '/uploads')); // upload 폴더 접근 가능하게끔
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// [라우터 분리]
const indexRouter = require('./routes');
app.use('/', indexRouter); // localhost:PORT/경로는 기본으로 ./routes/index.js 파일에 선언



// app.post(
//     '/dynamicFile', 
//     uploadDetail.single('dynamicFile'), 
//     function (req, res) {
//       console.log(req.file);
//       res.send(req.file)
//   })

// const chatRouter = require('./routes/Rchat'); // index는 생략가능
// app.use('/chat', chatRouter); // localhost:PORT/경로는 기본으로 ./routes/index.js 파일에 선언

// const userRouter = require('./routes/Ruser'); // index는 생략가능
// app.use('/user', userRouter); // localhost:PORT/경로는 기본으로 ./routes/index.js 파일에 선언

// const groupRouter = require('./routes/Rgroup'); // index는 생략가능
// app.use('/group', groupRouter); // localhost:PORT/경로는 기본으로 ./routes/index.js 파일에 선언

// [404 error] 맨 마지막 라우트로 선언 -> 나머지 코드 무시되기 때문!!
app.get('*', (req, res) => {
    res.render('404');
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})