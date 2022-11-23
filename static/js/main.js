const cards = document.querySelector(".cards");
const cardArticle = document.querySelector(".cardArticle");
const card = document.querySelectorAll(".card");
const currentIdx = 0;
const controls = document.querySelectorAll(".controls");
const buttonLeft = document.querySelector(".left");
const buttonRight = document.querySelector(".right");

buttonLeft.addEventListener("click", () => {
  currentIndex--;
  currentIndex = currentIndex < 0 ? 0 : currentIndex; // index값이 0보다 작아질 경우 0으로 변경
  cardArticle.style.marginLeft = `-${cards.clientWidth * currentIndex}px`; // index만큼 margin을 주어 옆으로 밀기
});

buttonRight.addEventListener("click", () => {
  currentIndex++;
  currentIndex = currentIndex >= card.length ? card.length - 1 : currentIndex; // index값이 inner의 총 개수보다 많아질 경우 마지막 인덱스값으로 변경
  cardArticle.style.marginLeft = `-${cards.clientWidth * currentIndex}px`; // index만큼 margin을 주어 옆으로 밀기
});
