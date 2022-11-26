let scrollLeft = document.querySelector('.prev')
let scrollRight = document.querySelector('.next')
let cardArticle = document.querySelector('.cardArticle');
let serchInput = document.querySelector('.serch-input')

scrollLeft.onclick = () => {
  cardArticle.scrollLeft -= 1020;
};

scrollRight.onclick = () => {

  cardArticle.scrollLeft += 1020;
};

function mypage() {
  document.location.href = '/profile';
}