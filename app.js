import { fetchMovies } from "./api.js";

const main = document.querySelector(".movies");
const searchInput = document.querySelector("#movieTitle");

// 영화 카드 생성 함수
const makeCard = function (elem) {
  // console.log(elem);
  let img =
    "https://media.themoviedb.org/t/p/w440_and_h660_face" + elem["poster_path"];
  let title = elem["title"];
  let rate = elem["vote_average"];
  let engTitle = elem["original_title"];
  let id = elem["id"];
  let overview = elem["overview"];
  let date = elem["release_date"];
  let tempHtml = `
      <div class="card_style_1" id="${id}">
        <img
          class="poster w-full"
          src="${img}"
          alt="${title}"
        />
        <h2 id="title">${title} <br> (${engTitle})</h2>
        <p style="display: none;" id="overview">${overview}</p>
        <p style="display: none;" id="date">${date}</p>
        <p id="rate">평점: ${rate}</p>
      </div>`;
  let movie = document.createElement("div");
  movie.innerHTML = tempHtml;
  main.appendChild(movie);
};

// 검색 기능 함수
const search = function () {
  const movieTitle = document.querySelector("#movieTitle");
  const filter = movieTitle.value.toUpperCase();
  const div = document.getElementsByClassName("card_style_1");

  for (let i = 0; i < div.length; i++) {
    let content = div[i].getElementsByTagName("h2")[0];
    let txtValue = content.textContent || content.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      div[i].style.display = "block";
    } else {
      div[i].style.display = "none";
    }
  }
};

// 모달창 클릭, 닫기
const modalFunc = function (target) {
  const modalPage = document.querySelector(".modal");
  // console.log(target.firstElementChild);
  const img = target.firstElementChild.src;
  const title = target.querySelector("#title").textContent;
  const rate = target.querySelector("#rate").textContent;
  const content = target.querySelector("#overview").textContent;
  const releaseDate = target.querySelector("#date").textContent;
  let tempModal = `<div>
    <button class="modalBtn">닫기</button>
    <img src="${img}" alt="${title}">
    <h2>${title}</h2>
    <p>${content}</p>
    <p>개봉일: ${releaseDate}</p>
    <p>${rate}</p>
  </div>`;
  // console.log(target);
  modalPage.innerHTML = tempModal;
  modalPage.style.display = "block";

  const modalBtn = document.querySelector(".modalBtn");
  modalBtn.addEventListener("click", (event) => {
    modalPage.style.display = "none";
  });
};

fetchMovies["results"].forEach((elem) => makeCard(elem));
searchInput.addEventListener("keyup", search);
main.onclick = function (event) {
  let target = event.target;
  if (target.tagName != "DIV") return;
  modalFunc(target);
};
