let useridInput = document.querySelector("#userid");
let nicknameInput = document.querySelector("#nickname");
let pwInput = document.querySelector("#pw");
let pwConfirm = document.querySelector("#pw-confirm");
let useridGuide = document.querySelector(".guide-id");
let usernickGuide = document.querySelector(".guide-nick");
let userpwGuide = document.querySelector(".guide-pw");
let disBtn = document.querySelector("#disBtn");
let profileDiv = document.querySelector(".profile-div");
let guideNick = document.querySelector(".guide-nick");
let guideId = document.querySelector(".guide-id");
let reg_id2 = /^[a-z0-9]{3,10}$/;
let reg_pw3 = /(?=.*\d)(?=.*[a-zA-ZS]).{8,16}/;

function changeId() {
  guideId.setAttribute("data-value", true);
}

function changeNick() {
  guideNick.setAttribute("data-value", true);
}


// let check = false;
function overlapId() {
  const form = document.forms["register-form"];

  if (!reg_id2.test(useridInput.value)) {
    return swal("아이디를 확인해주세요.");
  }

  axios({
    method: "POST",
    url: "/overlapId",
    data: {
      userid: form.userid.value,
    },
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      if (data) {
        swal("중복된 아이디입니다");
          guideId.setAttribute("data-value", true);
      } else {
        swal("사용가능한 아이디입니다").then(function () {
          guideId.setAttribute("data-value", false);
        });
      }
    });
}

function overlapNick() {
  const form = document.forms["register-form"];
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
      // true, false
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

function idInputCheck(obj, max) {
  charCheck(obj);
  handleInputLength(obj, max);

  if (!reg_id2.test(useridInput.value)) {
    useridGuide.innerText =
      "아이디는 특수문자를 제외한 3 - 10자리로 작성해주세요.";
  } else {
    useridGuide.innerText = "";
  }
}

function nickInputCheck(obj, max) {
  charCheck(obj);
  handleInputLength(obj, max);

  // 조건을 만족하지 않으면 가이드 보임
  if ((nicknameInput.value.length = 0 || nicknameInput.value.length < 2)) {
    usernickGuide.innerText =
      "닉네임은 특수문자를 제외한 2 - 6 자로 만들어주세요";

  } else {
    usernickGuide.innerText = "";
  }
}

function fileUpload() {
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

function register() {
  const form = document.forms["register-form"];
  if (
    form.userid.value == "" ||
    form.pw.value == "" ||
    form.nickname.value == "" ||
    form.address.value == ""
  ) {
    return swal("모든 정보를 입력해주세요");
  }

  if (profileDiv.dataset.value == "true") {
    return swal("프로필 저장을 완료해주세요");
  }
  if (!reg_pw3.test(pwInput.value) || pwInput.value != pwConfirm.value) {
    return swal("비밀번호를 확인해주세요");
  }

  if (guideId.dataset.value == 'true'){
    return swal("아이디 중복체크를 확인해주세요");
  }

  if (guideNick.dataset.value == 'true'){
    return swal("닉네임 중복체크를 확인해주세요");
  }

  axios({
    method: "POST",
    url: "/signup",
    data: {
      profile: document.getElementById("preview").src,
      userid: form.userid.value,
      pw: form.pw.value,
      nickname: form.nickname.value,
      address: form.address.value,
    },
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      form.userid.value = "";
      form.pw.value = "";
      form.nickname.value = "";
      form.address.value = "";
      const disBtn = document.querySelector("#disBtn");
      disBtn.disabled = true;
      swal("회원이 되신 것을 축하해요!").then(function () {
        document.location.href = "/login";
      });
    });
}