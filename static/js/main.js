let scrollLeft = document.querySelector('.prev')
let scrollRight = document.querySelector('.next')
let cardArticle = document.querySelector('.cardArticle');
let serchInput = document.querySelector('.serch-input')
let closeBtn = modal.querySelector(".close-area")
let GPic = document.querySelector('.group-pic')
let GIntro = document.querySelector('.group-intro')
let GDay = document.querySelector('.group-day')
let Ghour = document.querySelector('.group-hour')
let Gmember = document.querySelector('.group-headcount')

scrollLeft.onclick = () => {
  cardArticle.scrollLeft -= 1020;
};

scrollRight.onclick = () => {
  cardArticle.scrollLeft += 1020;
};

let card = document.card

function detail(data) {
  modal.style.display = "flex";
  console.log('각각의 그룹 아이디 >>>', data.id)
  
  axios({
    method: 'POST',
    url: '/detail',
    data: {
      groupId: data.id,
    }
  })
  .then((res) => {
    return res.data;
  })
  .then((data) => {
    console.log(data)
    GPic.src = data.picture;
    GIntro.innerText = data.introduce;
    GDay.innerText = data.day;
    Ghour.innerText = data.hour;
    Gmember.innerText = data.headcount;

    for (j = 0; j < Object.keys(data.members).length; j++){
    let profileImg = document.createElement('img');
    profileImg.classList.add('profileImg');
    profileImg.src = data.members[j].user.picture;
    Gmember.appendChild(profileImg)
    }
  })
}


closeBtn.addEventListener("click", e => {
    modal.style.display = "none"
})

modal.addEventListener("click", e => {
  const evTarget = e.target
  if(evTarget.classList.contains("modal-overlay")) {
      modal.style.display = "none"
  }
})