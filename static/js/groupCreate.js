const next = document.querySelector(".goNext");
const First = document.querySelector(".sectionFirst");
const Second = document.querySelector(".sectionSecond");
const Third = document.querySelector(".sectionThird");
const stop1 = document.querySelector(".stop1");
const stop2 = document.querySelector(".stop2");
const stop3 = document.querySelector(".stop3");

// 보이기;

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
  First.style.display = "none";
  Second.style.display = "none";
  Third.style.display = "block";
  stop1.style.color = "#ccc";
  stop2.style.color = "#ccc";
  stop3.style.color = "#ff9671";
}

function goMain() {
  document.location.href = "/";
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
      document.getElementById("preview").src =
        "/static/img/woman-g62120f928_1280.jpg";
    }
    document.querySelector(".profile-save-btn").style.display = "block";
  }

  function selectImg2(obj) {
    const pickImg = document.getElementById("preview");
    const select2 = document.getElementById("r2");

    pickImg.src = "/static/img/woman-g62120f928_1280.jpg";
  }
  function selectImg3(obj) {
    const pickImg = document.getElementById("preview");
    const select3 = document.getElementById("r3");

    pickImg.src = "/static/img/concert-g3e959554c_1280.jpg";
  }

  const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]'
  );
  const popoverList = [...popoverTriggerList].map(
    (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
  );
  function shareTwitter() {
    var sendText = "Curbis 소모임 커뮤니티"; // 전달할 텍스트
    var sendUrl = "devpad.tistory.com/"; // 전달할 URL
    window.open(
      "https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl
    );
  }
  function shareFacebook() {
    var sendUrl = "devpad.tistory.com/"; // 전달할 URL
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
        imageUrl: "localhost:8090/", // 콘텐츠 URL
        link: {
          mobileWebUrl: "localhost:8090/",
          webUrl: "localhost:8090/",
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

    alert("URL이 복사되었습니다."); // 알림창
  }

  function groupCreat() {
    // console.log('porfile<<',profileDiv.dataset.value);

    const form = document.forms["form-wrappers"];
    const imgFile = document.getElementById("dynamicFile");
    const dynamicFile = document.imgFile.value;

    if (
      form.text.value == "" ||
      form.moreText.value == "" ||
      form.date.value == "" ||
      form.time.value == "" ||
      form.number.value == "" ||
      form.address.value == ""
    ) {
      return alert("값을 입력해주세요");
    }

    axios({
      method: "POST",
      url: "/groupCreate",
      data: {
        profile: document.getElementById("preview").src,
        text: form.text.value,
        moreText: form.moreText.value,
        date: form.date.value,
        time: form.time.value,
        number: form.number.value,
        address: form.address.value,
      },
    }).then((res) => {
      console.log(res);
      console.log(res.data);
      return res.data;
    });
  }
};
$(function () {
  const now = new Date();
  $("#startDate").datepicker({
    dateFormat: "yy-mm-dd",
    minDate: 0,
    setDate: now,
    showOn: "button",
    buttonImageOnly: true,
    buttonImage: "/static/img/calendar.png",
    onClose: function (selectedDate) {
      $("#endDate").datepicker("option", "minDate", selectedDate);
    },
  });

  // $("#startDate").val(getToday());
});
