let myNick = document.querySelector(".hi").id;
let socket = io.connect(); // socket 사용을 위한 객체 생성

let dateinit;

window.history.forward();
window.onload = function () {
  let chatList = document.querySelector("#chat-list");

  chatList.scrollTop = chatList.scrollHeight;
};

function noBack() {
  window.history.forward();
}
socket.on("connect", () => {
  console.log("**** ⭕ Client Socket Connected >>", socket.id);
  let entire = document.querySelector(".entire");
  socket.emit("id", {
    nick: myNick,
    group: entire.id,
  });
});

// [실습44] 채팅창 입장 안내 문구
// notice 이벤트를 받아서 공지 문구를 출력
socket.on("notice", (msg) => {
  console.log("socket on notice >> ", msg);

  document
    .querySelector("#chat-list")
    .insertAdjacentHTML("beforeend", `<div class="notice">${msg}</div>`);
});

socket.on("error", (msg) => {
  alert(msg);
});
chatDb = () => {
  let msg = document.querySelector("#message").value;
  let entire = document.querySelector(".entire");
  let today = new Date();
  let hours = today.getHours(); // 시
  let minutes = today.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let timeSet = `${hours}:${minutes}`;
  // console.log('content', data.msg);
  console.log("list_id!!!", entire.id);
  // console.log('time', timeSet);
  axios({
    method: "POST",
    url: "/chatSave",
    data: {
      content: msg,
      list_id: entire.id,
      time: timeSet,
    },
  });
  console.log(document.querySelector("#message").value);
  if (document.querySelector("#message").value == "") {
    return;
  }
  const data = {
    msg: document.querySelector("#message").value,
  };
  // document.createElement()
  socket.emit("send", data);
  document.querySelector("#message").value = "";
  let chatList = document.querySelector("#chat-list");
};

// [실습45] 채팅창 메세지 전송 step1
// "send" 이벤트 전송하기
handleKeyPress = () => {
  if (event.keyCode === 13) {
    chatDb();
  }
  //   console.dir(event.keyCode);
};

document.querySelector(".msgForm").addEventListener("submit", function send(e) {
  e.preventDefault();
});

socket.on("entire", (data) => {
  let parentH = document.querySelector("h1");

  entire = document.querySelector(".entire");
  entire.textContent = `접속자 : ${data}명`;
  console.log(Object.values(data)[0]);
});

socket.on("newMessage", (data) => {
  console.log(data.nick);
  console.log("data.nick", data.nick);
  console.log("data.msg", data.msg);
  let chatList = document.querySelector("#chat-list");
  // 상대방 or 나 일때 구분하는 div
  let div = document.createElement("div");
  // 상대방 닉네임
  let nickDiv = document.createElement("p");
  nickDiv.classList.add("nickDiv");
  // 메세지 채팅 내용
  let divChat = document.createElement("div");
  // div class="chathere"
  divChat.classList.add("chathere");
  // innerDiv
  let innerDiv = document.createElement("div");
  innerDiv.classList.add("innerDiv");
  // 프사
  let kakaoImg = document.createElement("img");
  kakaoImg.src = "/static/img/kakao.jpg";

  let today = new Date();
  let hours = today.getHours(); // 시
  let minutes = today.getMinutes();

  console.log(`0${hours}`);

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  console.log(chatList.lastChild);
  let timeDiv = document.createElement("span");
  timeDiv.classList.add("timeDiv");
  // span 작성 시간
  timeDiv.innerHTML = `${hours}:${minutes}`;
  divChat.textContent = data.msg;
  nickDiv.textContent = data.nick;

  if (chatList.lastChild.className == "my-chat") {
    let daterinit = `${hours}:${minutes}`;

    console.log(dateinit == daterinit);

    if (dateinit == daterinit) {
      if (myNick == data.nick) {
        // my-chat 내 채팅일때 클래스 네임
        div.classList.add("my-chat");

        console.log("요소선택", chatList.lastChild.querySelector("span"));
        if (chatList.lastChild.querySelector("span")) {
          chatList.lastChild.querySelector("span").remove();
        }
        innerDiv.appendChild(timeDiv);
        innerDiv.appendChild(divChat);
      } else {
        // other-chat 상대방 채팅일때 클래스 네임
        div.classList.add("other-chat");
        // 채팅구분하는 div 안에 nickDiv (p) 있음
        div.appendChild(nickDiv);
        // nickDiv.appendChild(kakaoImg)
        // innerDiv <= timeDiv(시간이 들어간 div), divChat(채팅내용 )
        innerDiv.appendChild(divChat);
        innerDiv.appendChild(timeDiv);
      }
    } else {
      if (myNick == data.nick) {
        div.classList.add("my-chat");
        innerDiv.appendChild(timeDiv);
        innerDiv.appendChild(divChat);
      } else {
        div.classList.add("other-chat");

        div.appendChild(nickDiv);
        // nickDiv.appendChild(kakaoImg)

        innerDiv.appendChild(divChat);
        innerDiv.appendChild(timeDiv);
      }
      dateinit = `${hours}:${minutes}`;
    }
  } else {
    let daterinit = `${hours}:${minutes}`;

    console.log(dateinit == daterinit);

    if (dateinit == daterinit) {
      if (myNick == data.nick) {
        div.classList.add("my-chat");
        innerDiv.appendChild(timeDiv);
        innerDiv.appendChild(divChat);
      } else {
        div.classList.add("other-chat");

        div.appendChild(nickDiv);
        // nickDiv.appendChild(kakaoImg)

        innerDiv.appendChild(divChat);
        innerDiv.appendChild(timeDiv);
      }
    } else {
      if (myNick == data.nick) {
        div.classList.add("my-chat");
        innerDiv.appendChild(timeDiv);
        innerDiv.appendChild(divChat);
      } else {
        div.classList.add("other-chat");

        div.appendChild(nickDiv);
        // nickDiv.appendChild(kakaoImg)

        innerDiv.appendChild(divChat);
        innerDiv.appendChild(timeDiv);
      }
      dateinit = `${hours}:${minutes}`;
    }
  }
  div.appendChild(innerDiv);
  chatList.appendChild(div);

  chatList.scrollTop = chatList.scrollHeight;
});

window.onresize = function (event) {
  let chatList = document.querySelector("#chat-list");

  chatList.scrollTop = chatList.scrollHeight;
};
