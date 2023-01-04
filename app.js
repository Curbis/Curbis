const session = require("express-session");
const express = require("express");
const app = express();
const PORT = 8090;
const models = require("./models");
const http = require("http").Server(app);
const io = require("socket.io")(http); // http-socket 연결
const controller = require("./controller/Cmain");

app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
  })
);
app.set("view engine", "ejs");
app.use("/views", express.static(__dirname + "/views"));
app.use("/static", express.static(__dirname + "/static"));
app.use("/uploads", express.static(__dirname + "/uploads")); // upload 폴더 접근 가능하게끔

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// [라우터 분리]
const indexRouter = require("./routes");
app.use("/", indexRouter); // localhost:PORT/경로는 기본으로 ./routes/index.js 파일에 선언

// [404 error] 맨 마지막 라우트로 선언 -> 나머지 코드 무시되기 때문!!
app.get("*", (req, res) => {
  res.render("404");
});
const nickArray = {};
const entireRoom = {};
let room;

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
  // socket.on("join", (roomName) => {
  //   // console.log("제발되주세요", controller.sessionId());

  //   // 프론트에서 입력한 닉네임 값
  //   console.log("닉네임", roomName.nick);
  //   // console.log('그룹',roomName.group);
  //   room = roomName.group;
  //   console.log("그룹", room);
  //   socket.join(room);
  //   console.log(room);

  // });

  socket.on("id", (nick) => {
    room = nick.group;
    nickArray[socket.id] = nick.nick;
    entireRoom[socket.id] = room;

    // entireRoom[room] = ["바보"];

    console.log(nickArray);
    console.log(Object.values(entireRoom));
    let dog = Object.values(entireRoom);
    // let enKey = Object.keys(entireRoom).find((key) => entireRoom[key] === room);
    let cat = dog.filter((v) => v === room);
    console.log("cat", cat.length);
    let visitorNum = cat.length;
    socket.join(room);

    // console.log("접속 유저 목록 >> ", nickArray);
    // io.to(room).emit("notice", `${roomName.nick}님이 입장하였습니다`);
    // console.log("살려주세요", nick.nick);
    // socket.emit("entrySuccess");
    io.to(room).emit("entire", visitorNum);
  });

  // [실습 44-3] 접속자 퇴장시
  // 'notice' 이벤트로 퇴장 공지
  socket.on("disconnect", () => {
    if (nickArray[socket.id] == undefined) {
      console.log("누가왔다감");
    } else {
      // 1. socket.id 콘솔로그 찍기
      // 2. 전체 공지 ('notice', 퇴장메세지(유저 닉네임 포함해서))
      //  ex. aa님이 퇴장하셨습니다
      // 3. nickArray에서 해당 유저 삭제
      console.log(nickArray[socket.id]);

      // io.to(room).emit("notice", `${nickArray[socket.id]}님이 퇴장하셨습니다`);
      delete nickArray[socket.id];
      delete entireRoom[socket.id];
      // io.to(room).emit("entire", nickArray[socket.id]);
      socket.leave(room);
    }
  });

  socket.on("send", (data) => {
    console.log("socket on send >> ", data, room);
    console.log(nickArray[socket.id]);
    const sendData = { nick: nickArray[socket.id], msg: data.msg };
    io.to(room).emit("newMessage", sendData);
  });
});

http.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
