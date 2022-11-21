// kakao api 발급키 842656a06fd53c5d26ad06533039f42e

function kakaoLogin() {
    Kakao.init('842656a06fd53c5d26ad06533039f42e'); //발급받은 키 중 javascript키를 사용해준다.
    console.log(Kakao.isInitialized()); // sdk초기화여부판단
    Kakao.Auth.login({
      // scope: 'profile, account_email, gender, age_range, birthday',
      success: function (response) {
      
        Kakao.API.request({
          url: '/v2/user/me',
          success: function (response) {
            console.log(response)
            // console.log(response[[Prototype]])
            console.log(response.kakao_account.profile)
            // window.close();
          },
          fail: function (error) {
            console.log(error)
          },
        })
      },
      fail: function (error) {
        console.log(error)
      },
    })
  }
  
  function login() {
    const form_login = document.forms['form_login'];

    if (!form_login.checkValidity()) {
      form_login.reportValidity();
      return;
    }

    axios({
      method: 'POST',
      url: '/postSignIn',
      data: {
        userid: form_login.userid.value,
        pw: form_login.pw.value,
      },
    })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (data) {
          // true
          // (1) alert 띄우기
          alert('로그인 성공');
          // (2) form_info 폼 선택
          const form_info = document.forms['form_info'];
          // (3) form_login의 userid 값을 form_ingo의 userid value에 저장
          form_info.userid.value = form_login.userid.value;
          // (4) form_info 제출
          // form[name="form_info"] 요소의 method와 action 속성 값에 의해
          // POST /user/profile 요청을 수행
          form_info.submit();
        } else {
          // false
          // (1) alert 띄우기
          alert('로그인 실패');
          // (2) form_info 초기화 (제출 안함)
          form_login.reset();
        }
      });
  }