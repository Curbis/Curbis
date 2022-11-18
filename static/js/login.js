// kakao api 발급키 842656a06fd53c5d26ad06533039f42e

function kakaoLogin() {
    Kakao.init('842656a06fd53c5d26ad06533039f42e'); //발급받은 키 중 javascript키를 사용해준다.
    console.log(Kakao.isInitialized()); // sdk초기화여부판단
    Kakao.Auth.login({
      success: function (response) {
        Kakao.API.request({
          url: '/v2/user/me',
          success: function (response) {
            console.log(response)

            window.close();
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
  