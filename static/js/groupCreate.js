const next = document.querySelector(".goNext");
const First = document.querySelector(".sectionFirst");
const Second = document.querySelector(".sectionSecond");
const Third = document.querySelector(".sectionThird");
const stop1 = document.querySelector(".stop1");
const stop2 = document.querySelector(".stop2");
const stop3 = document.querySelector(".stop3");

const goBack = document.getElementById("goBack");
const buttonback = document.querySelector("buttonBack");

const profileDiv = document.querySelector(".profile-div");

// 보이기;
function goFirst() {
  First.style.display = "block";
  Second.style.display = "none";
  Third.style.display = "none";
  stop1.style.color = "#ff9671";
  stop2.style.color = "#ccc";
  stop3.style.color = "#ccc";
}

function goSecond() {
  First.style.display = "none";
  Second.style.display = "block";
  Third.style.display = "none";
  stop1.style.color = "#ccc";
  stop2.style.color = "#ff9671";
  stop3.style.color = "#ccc";
  buttonback.style.display = "block";
}

function gothird() {
  First.style.display = "none";
  Second.style.display = "none";
  Third.style.display = "block";
  stop1.style.color = "#ccc";
  stop2.style.color = "#ccc";
  stop3.style.color = "#ff9671";
}

function secondStep() {
  First.style.display = "none";
  Second.style.display = "block";
  Third.style.display = "none";
  stop1.style.color = "#ccc";
  stop2.style.color = "#ff9671";
}

function backStep() {
  First.style.display = "block";
  Second.style.display = "none";
  Third.style.display = "none";
  stop1.style.color = "#ff9671";
  stop2.style.color = "#ccc";
}

function ThirdStep() {
  const form = document.forms["groupCreat"];

  if (
    form.text.value == "" ||
    form.moreText.value == "" ||
    form.date.value == "" ||
    form.time.value == "" ||
    form.headcount.value == "" ||
    form.address.value == ""
  ) {
    return swal("공백이 존재합니다");
  }

  if (profileDiv.dataset.value == "true") {
    return swal("프로필 저장을 완료해주세요");
  }

  if (form.headcount.value > 6 || form.headcount.value < 3) {
    return swal("인원수는 3 - 6 명으로 설정해주세요");
  }

  First.style.display = "none";
  Second.style.display = "none";
  Third.style.display = "block";
  stop1.style.color = "#ccc";
  stop2.style.color = "#ccc";
  stop3.style.color = "#ff9671";

  axios({
    method: "POST",
    url: "/makeGroup",
    data: {
      name: form.text.value,
      picture: document.getElementById("preview").src,
      topic: form.r1.value,
      introduce: form.moreText.value,
      address: form.address.value,
      day: form.date.value,
      hour: form.time.value,
      headcount: form.headcount.value,
    },
  })
    .then((res) => {
      // console.log(res);
      // console.log(res.data);
      return res.data;
    })
    .then((data) => {
      // (1) swal 띄우기

      if (data) {
        swal("그룹 생성 성공");
      } else {
        swal("로그인 시간이 만료되었습니다").then(function () {
          document.location.href = "/login";
        });
      }
    });
}

console.log("dd", $("input[name='r1']:checked").val());

function goMain() {
  document.location.href = "/";
}

function selectImg1() {
  const pickImg = document.getElementById("preview");
  const select2 = document.getElementById("r2");

  pickImg.src = "/static/img/mountain-g7d103621e_1280.jpg";
}

function selectImg2() {
  const pickImg = document.getElementById("preview");
  const select2 = document.getElementById("r2");

  pickImg.src = "/static/img/woman-g62120f928_1280.jpg";
}
function selectImg3() {
  const pickImg = document.getElementById("preview");
  const select3 = document.getElementById("r3");

  pickImg.src = "/static/img/concert-g3e959554c_1280.jpg";
}

window.onload = function () {
  document.getElementById("address").addEventListener("click", function () {
    new daum.Postcode({
      oncomplete: function (data) {
        console.log(data);
        var roadAddr = data.roadAddress; // 도로명 주소 변수
        var jibunAddr = data.jibunAddress; // 지번 주소 변수
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
  const formData = new FormData(); // 폼 객체 생성
  const file = document.getElementById("dynamicFile"); // file input
  formData.append("dynamicFile", file.files[0]);
  axios({
    method: "POST",
    url: "/dynamicFile",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data", // enctype: "multipart/form-data"
    },
  }).then(function (res) {
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

const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);

const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);

function shareTwitter() {
  var sendText = "Curbis 소모임 커뮤니티"; // 전달할 텍스트

  var sendUrl = "http://118.67.142.249:8090/"; // 전달할 URL

  window.open(
    "https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl
  );
}

function shareFacebook() {
  var sendUrl = "http://118.67.142.249:8090/"; // 전달할 URL

  window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
}

function shareKakao() {
  // 사용할 앱의 JavaScript 키 설정
  Kakao.init("842656a06fd53c5d26ad06533039f42e");
  // 카카오링크 버튼 생성
  Kakao.Link.createDefaultButton({
    container: "#btnKakao", // 카카오공유버튼ID
    objectType: "feed",
    content: {
      title: "Curbis 소모임 커뮤니티", // 보여질 제목
      description: "취미를 공유하는 사람들과 함께하는 시간", // 보여질 설명

      imageUrl: "http://118.67.142.249:8090/", // 콘텐츠 URL
      link: {
        mobileWebUrl: "http://118.67.142.249:8090/",
        webUrl: "http://118.67.142.249:8090/",
      },
    },
  });
}

function clip() {
  var url = ""; // <a>태그에서 호출한 함수인 clip 생성
  var textarea = document.createElement("textarea");
  //url 변수 생성 후, textarea라는 변수에 textarea의 요소를 생성

  document.body.appendChild(textarea); //</body> 바로 위에 textarea를 추가(임시 공간이라 위치는 상관 없음)
  url = window.document.location.href; //url에는 현재 주소값을 넣어줌
  textarea.value = url; // textarea 값에 url를 넣어줌
  textarea.select(); //textarea를 설정
  document.execCommand("copy"); // 복사
  document.body.removeChild(textarea); //extarea 요소를 없애줌

  swal("URL이 복사되었습니다."); // 알림창
}

$(function () {
  const now = new Date();
  $("#startDate").datepicker({
    dateFormat: "yy-mm-dd",
    prevText: "이전 달",
    nextText: "다음 달",
    monthNames: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    monthNamesShort: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    dayNames: ["일", "월", "화", "수", "목", "금", "토"],
    dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
    dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
    showMonthAfterYear: true,
    yearSuffix: "년",
    minDate: 1,
  });

  $(function () {
    $("#datepicker1").datepicker();
  });
});
