function login(event) {
  event.preventDefault();
  const formLogin = document.forms["login-form"];

  if (!formLogin.checkValidity()) {
    formLogin.reportValidity();
    return;
  }

  axios({
    method: "POST",
    url: "/signin",
    data: {
      userid: formLogin.userid.value,
      pw: formLogin.pw.value,
    },
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      console.log(data.islogin);
      if (data.islogin) {
        swal(
          "로그인 성공!",
          data.nick + "님 로그인되었습니다",
          "success"
        ).then(function () {
          document.location.href = "/";
        });
      } else {
        swal(
          "로그인 실패!",
          "아이디 또는 비밀번호를 확인해주세요",
          "warning"
        ).then(function () {
          formLogin.reset();
        });
      }
    });
}

document.querySelector('.login-form').addEventListener('submit', login);