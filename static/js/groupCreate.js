const goShare = () => {
  if (pcMQL.matches) {
    qna.style.animation = "";
    const interval = setInterval(() => {
      qna.style.opacity -= 0.1;
      qna.style.transform = "translateY(-1px)";
    }, 50);
    setTimeout(() => clearTimeout(interval), 500);
    setTimeout(() => (qna.style.display = "none"), 500);
  }

  const result = document.getElementById("shareResult");
  const grade = sortResult(point);
  const pTitle = document.querySelector(".p");
  const res_point = document.querySelector(".point");
  const pin = document.querySelector(".pin");
  const img_url = grade + ".png";
  const res_img = document.createElement("img");
  const location = document.querySelector(".result");
  const desc = document.querySelector(".res");

  setTimeout(() => {
    header.style.display = "block";
    result.style.display = "block";
    header.style.animation = "fade-in 0.3s forwards";
    result.style.animation = "going-up 0.5s, " + "fade-in 0.5s forwards";
  }, 600);
};

const end = () => {
  console.log(result);
  result.style.display = "block";
  qna.style.animation = "";
  const interval = setInterval(() => {
    qna.style.opacity -= 0.1;
    qna.style.transform = "translateY(-1px)";
  }, 50);
  setTimeout(() => clearTimeout(interval), 500);
  setTimeout(() => (qna.style.display = "none"), 500);
};

const addAnswer = (answerTxt, idx) => {
  const answer = document.createElement("button");
  const a = document.querySelector(".answer");
  answer.className += "a box";
  answer.innerHTML = answerTxt;
  answer.addEventListener("click", () => {
    const parent = answer.parentNode;
    const children = parent.childNodes;
    for (let i in children) {
      children[i].disabled = true;
    }
    parent.classList.add("fade-out-5-4");
    setTimeout(() => {
      select[qIdx] = idx;
      a.innerHTML = "";
      parent.classList.remove("fade-out-5-4");
      goNext();
    }, 800);
  });

  setTimeout(
    () =>
      (answer.style.animation =
        "going-down 0.25s forwards, fade-in 0.25s forwards"),
    50
  );
  a.appendChild(answer);
};

const goNext = () => {
  console.log(qnaList.length); // 8
  console.log(qnaList); // 배열 8개
  console.log(qIdx); // 0 ~ 7
  if (qIdx++ === qnaList.length - 1) {
    end();
    return;
  }

  const status = document.querySelector(".status");
  const qNum = qnaList[qIdx];
  const q = document.querySelector(".q");

  status.style.width = ENDPOINT * (qIdx + 2) + "%";
  q.innerHTML = qNum.q;
  qna.style.animation =
    "fade-in 0.3s ease-in-out 0.4s forwards, " +
    "going-down 0.3s ease-in-out 0.4s forwards";

  setTimeout(() => {
    const endIdx = qNum.a.length - 1;
    for (let i in qNum.a) {
      addAnswer(qNum.a[i].answer, i);
    }
    qna.style.opacity = 1;
  }, 700);
};

const begin = () => {
  const welcome = document.getElementById("welcome");
  header.style.animation =
    "going-up 0.4s forwards, " + "fade-out 0.4s forwards";
  setTimeout(
    () =>
      (welcome.style.animation =
        "going-up 0.4s ease-in-out forwards, " +
        "fade-out 0.4s ease-in-out forwards"),
    500
  );
  setTimeout(() => {
    header.style.display = "none";
    welcome.style.display = "none";
    qna.style.display = "block";
    if (pcMQL.matches) {
      console.log("PC");
      wrap.style.marginTop = "50px";
    } else if (tabletMQL.matches) {
      console.log("tablet");
      wrap.style.marginTop = "30px";
    }
    goNext();
  }, 1000);
};

const load = () => {
  const msg = document.querySelector(".check-name");
  const start_btn = document.querySelector(".start");

  u_name.addEventListener("blur", () => {
    try {
      if (u_name.value.length < 1) {
        throw "이름을 입력하고 시작해 주세요.";
      }
      msg.innerHTML = "";
    } catch (err) {
      msg.innerHTML = err;
    }
  });

  start_btn.addEventListener("click", () => {
    try {
      if (u_name.value.length < 1) {
        throw "이름을 입력하고 시작해 주세요.";
      }
      msg.innerHTML = "";
      start_btn.disabled = true;
      begin();
    } catch (err) {
      console.log(err);
      msg.innerHTML = err;
    }
  });
};

window.onload = load();
