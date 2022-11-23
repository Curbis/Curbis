const express = require('express');
const session = require('express-session');
const app = express();
// socket은 express가 아닌 http 모듈에 연결해야 사용 가능
const http = require("http").Server(app);
const io = require("socket.io")(http); // http-socket 연결
const PORT = 8090;
const models = require("./models");
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

app.use(
  session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
  })
);
app.set('view engine', 'ejs');
app.use('/views', express.static(__dirname + '/views'));
app.use('/static', express.static(__dirname + '/static'));
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




const nickArray = {}; // 유저 목록

// io.on()
// : socket과 관련된 통신작업을 처리
io.on("connection", (socket) => {
  // "connection" event
  // : 클라이언트가 접속했을 때 발생, 콜백으로 socket 객체를 제공!

  console.log("**** ⭕ Server Socket Connected >> ", socket.id);
  // socket.id: 소켓 고유 아이디 -> socket은 웹 페이지 별로 생김!!

  // [실습44] 채팅창 입장 안내 문구
  // io.emit('notice', `${socket.id.slice(0, 5)}님이 입장하셨습니다.`);

  // [실습44-2] 채팅창 입장 안내 문구 socket.id -> nickname
  socket.on("setNick", (nick) => {
    // 프론트에서 입력한 닉네임 값
    console.log("socket on setNick >> ", nick);

    // nickArray: { socketId1: nick1, socketId2: nick2, ... }
    // -> { nick1, nick2, nick2, ... }
    // -> nick 이 존재하는지


    if ( Object.values(nickArray).indexOf(nick) > -1 ) {
      // 닉네임 중복이 있다면
 
      socket.emit("error", '닉네임이 중복되었습니다')
    } else {
      // 닉네임 중복이 없다면
      nickArray[socket.id] = nick; // { socket.id: nick }
      console.log("접속 유저 목록 >> ", nickArray);
      io.emit("notice", `${nick}님이 입장하였습니다`);

      socket.emit("entrySuccess", nick);
      io.emit("entire", nickArray)
    }
  });

  // [실습 44-3] 접속자 퇴장시
  // 'notice' 이벤트로 퇴장 공지
  // socket.on('disconnect', () => {
  //   if (nickArray[socket.id] == undefined){
  //     console.log('누가왔다감');
  //     } else {

  //   // 1. socket.id 콘솔로그 찍기
  //   // 2. 전체 공지 ('notice', 퇴장메세지(유저 닉네임 포함해서))
  //   //  ex. aa님이 퇴장하셨습니다
  //   // 3. nickArray에서 해당 유저 삭제
  //   console.log(nickArray[socket.id]);
 
  //   io.emit('notice', `${nickArray[socket.id]}님이 퇴장하셨습니다`);
  //   delete nickArray [socket.id]
  //   io.emit("entire", nickArray)

  //   }
  // });

  socket.on('send', (data) => {
    console.log('socket on send >> ', data);;
    const sendData = { nick: data.myNick, msg: data.msg}
    io.emit('newMessage', sendData)
  });
});


// [404 error] 맨 마지막 라우트로 선언 -> 나머지 코드 무시되기 때문!!
app.get('*', (req, res) => {
    res.render('404');
});
http.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})