let scrollLeft = document.querySelector(".prev");
let scrollRight = document.querySelector(".next");
let cardArticle = document.querySelector(".cardArticle");
let serchInput = document.querySelector(".serch-input");
let closeBtn = modal.querySelector(".close-area");
let GPic = document.querySelector(".group-pic");
let GAdress = document.querySelector(".group-address");
let GName = document.querySelector(".group-name");
let GIntro = document.querySelector(".group-intro");
let GDay = document.querySelector(".group-day");
let Ghour = document.querySelector(".group-hour");
let profileDiv = document.querySelector(".profile-user");
let Gmember = document.querySelector(".group-headcount");
let Gin = document.querySelector(".group-in-btn");
let Cin = document.querySelector(".chat-in-btn");
let Pbtn = document.querySelector(".profile-btn");
let Gdel = document.querySelector(".group-delete-btn");
let Gout = document.querySelector(".group-out-btn");
let sessionId = document.querySelector(".hi").id;
let hostImg = document.querySelector("#hostImg");
let hostName = document.querySelector(".hostName");
let userMember = [];
scrollLeft.onclick = () => {
  cardArticle.scrollLeft -= 340;
};

scrollRight.onclick = () => {
  cardArticle.scrollLeft += 340;
};

if (cardArticle.childElementCount < 3) {
  cardArticle.style.justifyContent = "center";
}

function mypage() {
  document.location.href = "/profile";
}

let card = document.card;

function detail(data) {
  modal.style.display = "flex";
  axios({
    method: "POST",
    url: "/detail",
    data: {
      groupId: data.id,
    },
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      GPic.src = data.result.picture;
      hostImg.src = data.result.members[0].user.picture;
      hostName.innerText = data.result.members[0].user.nickname;
      GIntro.innerText = data.result.introduce;
      GDay.innerText = data.result.day;
      Ghour.innerText = data.result.hour;
      profileDiv.innerHTML = ``;
      Gmember.innerText = `${Object.keys(data.result.members).length} / ${
        data.result.headcount
      }`;
      Gin.id = data.result.id;
      GName.innerText = data.result.name;
      GAdress.innerText = data.result.address;
      outModal();
      for (j = 0; j < Object.keys(data.result.members).length; j++) {
        let profileImg = document.createElement("img");
        let profileId = document.createElement("p");
        let profileAll = document.createElement("div");
        profileImg.classList.add("profileImg");
        profileAll.classList.add("profileAll");
        profileImg.src = data.result.members[j].user.picture;
        profileAll.appendChild(profileImg);
        profileId.classList.add("profileId");
        profileId.innerText = data.result.members[j].user.nickname;
        profileAll.appendChild(profileId);
        profileDiv.appendChild(profileAll);
        if (data.btn == "host" || sessionId == "admin") {
          let Gde = document.querySelector(".group-in-btn");
          Gdel.style.display = "block";
          Cin.style.display = "block";
        } else {
          userMember.push(data.result.members[j].user.userid);
          let find = userMember.find((element) => {
            return element == sessionId;
          });
          if (find !== undefined) {
            Gout.style.display = "block";
            Gin.style.display = "none";
            Cin.style.display = "block";
          } else if (
            sessionId != "id" &&
            data.result.headcount > Object.keys(data.result.members).length
          ) {
            Gin.style.display = "block";
          }
        }
      }
    });
}

closeBtn.addEventListener("click", (e) => {
  console.log("close btn click!!!");
  modal.style.display = "none";
  userMember = [];
  outModal();
});

modal.addEventListener("click", (e) => {
  const evTarget = e.target;
  if (evTarget.classList.contains("modal-overlay")) {
    modal.style.display = "none";
    userMember = [];
    outModal();
  }
});

function outModal() {
  Gin.style.display = "none";
  Gdel.style.display = "none";
  Gout.style.display = "none";
  Cin.style.display = "none";
}

function groupIn() {
  console.log(Gin.id, sessionId);
  axios({
    method: "POST",
    url: "/groupIn",
    data: {
      listId: Gin.id,
      userId: sessionId,
    },
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      if (data) {
        swal("모임 참여 완료").then(function () {
          history.go(0);
        });
      } else {
        swal("로그인이 만료되었습니다").then(function () {
          document.location.href = "/";
        });
      }
    });
}

function groupOut() {
  swal("정말로 모임을 탈퇴 하시겠습니까?", {
    buttons: {
      next: "아니요",
      defeat: "네",
    },
  }).then((value) => {
    switch (value) {
      case "next":
        swal("탈퇴를 취소하였습니다");
        break;
      case "defeat":
        axios({
          method: "POST",
          url: "/groupOut",
          data: {
            listId: Gin.id,
            userId: sessionId,
          },
        })
          .then((res) => {
            return res.data;
          })
          .then((data) => {
            if (data) {
              swal("탈퇴를 완료하였습니다").then(function () {
                document.location.href = "/";
              });
            } else {
              swal("로그인이 만료되었습니다").then(function () {
                document.location.href = "/";
              });
            }
          });

        break;
    }
  });
}

function groupDelete() {
  console.log(Gin.id, sessionId);

  swal("정말로 모임을 삭제 하시겠습니까?", {
    buttons: {
      next: "아니요",
      defeat: "네",
    },
  }).then((value) => {
    switch (value) {
      case "next":
        swal("삭제를 취소하였습니다");
        break;
      case "defeat":
        axios({
          method: "POST",
          url: "/groupDelete",
          data: {
            listId: Gin.id,
            userId: sessionId,
          },
        })
          .then((res) => {
            return res.data;
          })
          .then((data) => {
            if (data) {
              swal("삭제를 완료하였습니다").then(function () {
                history.go(0);
              });
            } else {
              swal("로그인이 만료되었습니다").then(function () {
                document.location.href = "/";
              });
            }
          });
        break;
    }
  });
}

function logout() {
  swal("정말로 로그아웃 하시겠습니까?", {
    buttons: {
      next: "아니요",
      defeat: "네",
    },
  }).then((value) => {
    switch (value) {
      case "next":
        swal("로그아웃을 취소하였습니다");
        break;
      case "defeat":
        axios({
          method: "GET",
          url: "/logout",
          data: {},
        })
          .then((res) => {
            return res.data;
          })
          .then((data) => {
            if (data) {
              swal("로그아웃을 완료하였습니다").then(function () {
                document.location.href = "/";
              });
            } else {
              swal("로그인이 만료되었습니다").then(function () {
                document.location.href = "/";
              });
            }
          });
        break;
    }
  });
}
let socket = io.connect();
function chatIn() {
  socket.emit("join", { group: Gin.id, nick: Pbtn.id });

  let state = { group: Gin.id, nick: Pbtn.id };
  let title = "chat";
  document.location.href = "/chat";
  history.pushState(state, title, "/chat");
}
