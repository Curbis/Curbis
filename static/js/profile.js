let useridInput = document.querySelector("#userid");
let nicknameInput = document.querySelector("#nickname");
let pwInput = document.querySelector("#pw");
let pwConfirm = document.querySelector("#pw-confirm");
let useridGuide = document.querySelector(".guide-id");
let usernickGuide = document.querySelector(".guide-nick");
let nickLabel = document.querySelector(".nickLabel");
let userpwGuide = document.querySelector(".guide-pw");
let disBtn = document.querySelector("#disBtn");
let profileDiv = document.querySelector(".profile-div");
let guideNick = document.querySelector(".guide-nick");
let reg_id2 = /^[a-z0-9]{3,10}$/;
let reg_pw3 = /(?=.*\d)(?=.*[a-zA-ZS]).{8,16}/;
const form = document.forms["register-form"];

function passPw() {
  const editForm = document.querySelectorAll(".register-form .form-div");
  axios({
    method: "POST",
    url: "/passPw",
    data: {
      pw: form.nowPw.value,
    },
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      if (data) {
        swal("비밀번호 확인이 완료되었습니다").then(function () {
          let afterCheck1 = document.querySelectorAll(".after-check");
          let checkBtn = document.querySelector(".confirm-btn");
          let nowPw = document.querySelector(".now-pw");
          let afterName = document.querySelector(".after-name");
          afterCheck1[0].classList.remove("after-check");
          afterCheck1[1].classList.remove("after-check");
          afterName.innerText = "내 프로필";
          checkBtn.classList.add("after-check");
          nowPw.classList.add("after-check");
        });

      } else {
        swal("비밀번호를 다시 입력해주세요");
      }
    });
}

function nickChange() {
  disBtn.setAttribute("data-value", false);
}

function overlapNick() {
  if (nickLabel.id == form.nickname.value) {
    guideNick.setAttribute("data-value", false);
    return swal("사용중인 닉네임과 동일합니다");
  }

  if (form.nickname.value.length < 2) {
    return swal("닉네임을 2글자 이상으로 만들어주세요");
  }

  axios({
    method: "POST",
    url: "/overlapNick",
    data: {
      nickname: form.nickname.value,
    },
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      if (data) {
        swal("중복된 닉네임입니다").then(function () {
          guideNick.setAttribute("data-value", true);
        });
      } else {
        swal("사용가능한 닉네임입니다").then(function () {
          guideNick.setAttribute("data-value", false);
        });
      }
    });
}

function charCheck(obj) {
  // 특수문자 판별
  var specialChar = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;

  // 배열에서 하나씩 값을 비교
  if (specialChar.test(obj.value)) {
    // 값이 일치하면 문자를 삭제
    obj.value = obj.value.substring(0, obj.value.length - 1);
  }
}

// maxlength 넘었을 때 텍스트를 잘라서 value값에 넣어줌
function handleInputLength(el, max) {
  if (el.value.length > max) {
    el.value = el.value.substr(0, max);
  }
}

function changeNick() {
  guideNick.setAttribute("data-value", true);
}

function nickInputCheck(obj, max) {
  charCheck(obj);
  handleInputLength(obj, max);

  // 조건을 만족하지 않으면 가이드 보임
  if ((nicknameInput.value.length = 0 || nicknameInput.value.length < 2)) {
    usernickGuide.innerText =
      "닉네임은 특수문자를 제외한 2 - 6자로 만들어주세요";

    // 6자 이상 16자 이하로 특수문자 제외
  } else {
    usernickGuide.innerText = "";
  }
}

function editPw() {
  if (!reg_pw3.test(pwInput.value) || pwInput.value != pwConfirm.value) {
    return swal("비밀번호를 확인해주세요");
  }

  axios({
    method: "POST",
    url: "/editPw",
    data: {
      pw: pwInput.value,
    },
  })
  .then((res) => {
    return res.data;
  })
  .then((data) => {
    if(data){
    swal("비밀번호 수정 완료");
    } else{
      swal("로그인이 만료되었습니다").then(function () {
        document.location.href = "/";
      });
    }
  });
}

function fileUpload() {
  console.log("click fileUpload");

  // 멀티미디어 데이터는 비동기 데이터를 보여줄 때 폼 데이터를 만들어서 함
  const formData = new FormData(); // 폼 객체 생성
  const file = document.getElementById("dynamicFile"); // file input
  console.dir(file.files[0]); // 파일 input에 들어간 파일 정보

  // formData.append(name, value);
  // input의 name과 input의 value
  formData.append("dynamicFile", file.files[0]);

  // axios 통신
  axios({
    method: "POST",
    url: "/dynamicFile",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data", // enctype: "multipart/form-data"
    },
  }).then(function (res) {
    // res : 클라이언트의 POST /dynamicFile 요청을 보낸 응답 결과
    document.getElementById("preview").src = `/uploads/${res.data.filename}`;
    profileDiv.setAttribute("data-value", false);
    swal("프로필 저장이 완료되었어요!");
  });
}

// 이미지 미리보기
function readURL(input) {
  if (input.files[0]) {
    let reader = new FileReader();
    reader.onload = function (obj) {
      document.getElementById("preview").src = obj.target.result;
    };

    reader.readAsDataURL(input.files[0]);
  } else {
    // document.getElementById('preview').src = "/static/img/profile-basic.png";
  }
  profileDiv.setAttribute("data-value", true);
  console.log("미리보기", profileDiv.dataset.value);
  document.querySelector(".profile-save-btn").style.display = "block";
}

// 비밀번호 확인
function checkPw() {
  if (!reg_pw3.test(pwInput.value)) {
    userpwGuide.innerText =
      "비밀번호는 문자와 숫자를 포함해 8 - 16자리로 작성해주세요";
  } else if (pwInput.value != pwConfirm.value) {
    userpwGuide.innerText = "비밀번호가 일치하지 않습니다";
  } else {
    userpwGuide.innerText = "";
  }
}

// 주소찾기
function findAddr() {
  new daum.Postcode({
    oncomplete: function (data) {
      console.log(data);
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
      // 도로명 주소의 노출 규칙에 따라 주소를 표시한다
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다
      var roadAddr = data.roadAddress; // 도로명 주소 변수
      var jibunAddr = data.jibunAddress; // 지번 주소 변수
      // 우편번호와 주소 정보를 해당 필드에 넣는다
      // document.getElementById('member_post').value = data.zonecode;
      if (roadAddr !== "") {
        document.getElementById("address").value = roadAddr;
      } else if (jibunAddr !== "") {
        document.getElementById("address").value = jibunAddr;
      }
    },
  }).open();
}


function profileEdittor() {
  if (form.nickname.value == "" || form.address.value == "") {
    return swal("모든 정보를 입력해주세요");
  }
  if (profileDiv.dataset.value == "true") {
    return swal("프로필 저장을 완료해주세요");
  }

  if (guideNick.dataset.value == "true") {
    return swal("닉네임 중복체크를 확인해주세요");
  }

  axios({
    method: "POST",
    url: "/profileEdittor",
    data: {
      profile: document.getElementById("preview").src,
      nickname: form.nickname.value,
      address: form.address.value,
    },
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      if(data){
      swal("회원정보 수정 완료");
      } else{
        swal("로그인이 만료되었습니다").then(function () {
          document.location.href = "/";
        });
      }
    });
}

function withdrawal() {
  swal("정말로 회원을 탈퇴 하시겠습니까?", {
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
          url: "/withdrawal",
          data: {},
        })
          .then((res) => {
            return res.data;
          })
          .then((data) => {
            if(data){
              swal("회원탈퇴가 완료되었습니다").then(function () {
                document.location.href = "/";
              });
              } else{
                swal("로그인이 만료되었습니다").then(function () {
                  document.location.href = "/";
                });
              }
            
          });
        break;
    }
  });

}

function enterkey() {
	if (window.event.keyCode == 13) {
    passPw()
    }
}
