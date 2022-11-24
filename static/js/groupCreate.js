const next = document.querySelector(".goNext");
const First = document.querySelector(".sectionFirst");
const Second = document.querySelector(".sectionSecond");
const Third = document.querySelector(".sectionThird");
const stop1 = document.querySelector(".sectionstop1");
const stop2 = document.querySelector(".sectionstop2");
const stop3 = document.querySelector(".sectionstop3");

보이기;

function secondStep() {
  First.style.display = "none";
  Second.style.display = "block";
  Third.style.display = "none";
}

function ThirdStep() {
  First.style.display = "none";
  Second.style.display = "none";
  Third.style.display = "block";
}

window.onload = function () {
  document.getElementById("address").addEventListener("click", function () {
    //주소입력칸을 클릭하면
    //카카오 지도 발생
    new daum.Postcode({
      oncomplete: function (data) {
        console.log(data);
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
        // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var roadAddr = data.roadAddress; // 도로명 주소 변수
        var jibunAddr = data.jibunAddress; // 지번 주소 변수
        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        // document.getElementById('member_post').value = data.zonecode;
        if (roadAddr !== "") {
          document.getElementById("address").value = roadAddr;
        } else if (jibunAddr !== "") {
          document.getElementById("address").value = jibunAddr;
        }
      },
    }).open();
  });
};

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
    document.getElementById("preview").src = "/static/img/profile-basic.png";
  }
  document.querySelector(".profile-save-btn").style.display = "block";
}

// function register() {
//   const form = document.forms["register-form"];
//   console.log(form);
//   if (
//     form.userid.value == "" ||
//     form.pw.value == "" ||
//     form.nickname.value == "" ||
//     form.address.value == ""
//   ) {
//     return alert("값을 입력해주세요");
//   }
// 이미지 업로드
// axios({
//   method: "POST",
//   url: "/signup",
//   data: {
//     profile: document.getElementById("preview").src,
//     userid: form.userid.value,
//     pw: form.pw.value,
//     nickname: form.nickname.value,
//     address: form.address.value,
//   },
// })
//   .then((res) => {
//     console.log(res);
//     console.log(res.data);
//     return res.data;
//   })
//   .then((data) => {
//     // (1) alert 띄우기
//     alert("회원이 되신 것을 축하해요!");
//     // (2) 가입 성공시 로그인 페이지로 이동
//     // document.location.href란?
//     // javascript에서 페이지 이동할 수 있는 방법
//     // document 객체를 사용하기 때문에 프론트에서 사용 가능
//     form.userid.value = "";
//     form.pw.value = "";
//     form.nickname.value = "";
//     form.address.value = "";
//     const disBtn = document.querySelector("#disBtn");
//     disBtn.disabled = true;
//     document.location.href = "/login";
//   });
