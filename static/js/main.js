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
let Gdel = document.querySelector(".group-delete-btn");
let Gout = document.querySelector(".group-out-btn");
let sessionId = document.querySelector(".hi").id;
let hostImg = document.querySelector("#hostImg")
let hostName = document.querySelector(".hostName")
let userMember = [];
scrollLeft.onclick = () => {
  cardArticle.scrollLeft -= 1020;
};

scrollRight.onclick = () => {
  cardArticle.scrollLeft += 1020;
};

function mypage() {
  document.location.href = "/profile";
}

let card = document.card;

function detail(data) {
  modal.style.display = "flex";
  console.log("각각의 그룹 아이디 >>>", data.id);

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
      hostImg.src = data.result.members[0].user.picture
      hostName.innerText = data.result.members[0].user.nickname
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
        if (data.btn == "host") {
          let Gde = document.querySelector(".group-in-btn");
          Gdel.style.display = "block";

          // GPic.setAttribute("onclick", exileBtn(this));
        } else {
          userMember.push(data.result.members[j].user.userid);

          // console.log(userInfo)

          let find = userMember.find((element) => {
            return element == sessionId;
          });

          if (find !== undefined) {
            Gout.style.display = "block";
            Gin.style.display = "none";
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

// function exileBtn(data) {
//   console.log('>>>>>>>>>>>>>>>>>',data)
// }

closeBtn.addEventListener("click", (e) => {
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
  }).then((res) => {
    swal("모임 참여 완료", "", "info").then(function () {
      history.go(0);
    });
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
        swal("탈퇴를 취소하였습니다.");
        break;
      case "defeat":
        axios({
          method: "POST",
          url: "/groupOut",
          data: {
            listId: Gin.id,
            userId: sessionId,
          },
        }).then((res) => {
          swal("탈퇴를 완료하였습니다.").then(function () {
            history.go(0);
          });
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
        swal("삭제를 취소하였습니다.");
        break;
      case "defeat":
        axios({
          method: "POST",
          url: "/groupDelete",
          data: {
            listId: Gin.id,
            userId: sessionId,
          },
        }).then((res) => {
          swal("삭제를 완료하였습니다.").then(function () {
            history.go(0);
          });
        });
        break;
    }
  });
}
