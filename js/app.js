import { getMoviesAPI } from "./api.js";
import { search } from "./search.js";
import { openModal } from "./modal.js";
import { addBookMark, removeBookMark, makeBookmarkCard } from "./bookmark.js";

// 영화 카드 생성 함수
const makeCard = function (elem) {
  let img =
    "https://media.themoviedb.org/t/p/w440_and_h660_face" + elem["poster_path"];
  let tempHtml = `
  <div id = ${elem["id"]}>
  <img
  class="poster"
  id="image"
  src="${img}"
  alt="${elem["title"]}"
  />
  </div>
  <div class="movieComment">
  <h2 id="title">${elem["title"]} <br> (${elem["original_title"]})</h2>
  <p style="display: none;" id="overview">${elem["overview"]}</p>
  <p style="display: none;" id="date">${elem["release_date"]}</p>
  <p id="rate">평점: ${elem["vote_average"]}</p>
  </div>`;
  let movie = document.createElement("div");
  movie.className = "movieCard";
  movie.innerHTML = tempHtml;
  main.appendChild(movie);
};

const body = document.querySelector("body");
const main = document.querySelector(".movies");
const searchInput = document.querySelector("#movieTitle");
const modalPage = document.querySelector(".modal");
const resetBtn = document.querySelector("h1");
const bookmarkBtn = document.querySelector(".openBookmarkBtn");
const movieURL =
  "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1";
let timer;

const fetchMovies = await getMoviesAPI(movieURL);
fetchMovies["results"].forEach((elem) => makeCard(elem));

// 영화 검색(디바운싱 적용)
searchInput.addEventListener("input", () => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(search, 500);
});

body.onclick = function (event) {
  let target = event.target;
  if (target.className == "bookmarkDiv" || target.className === "bookmarkBtn") {
    const bookmarkCard = document.querySelector(".modal");
    const bookmarkId = bookmarkCard.firstElementChild.firstElementChild.id;
    if (
      target.textContent === "북마크 추가" ||
      target.firstElementChild.textContent === "북마크 추가"
    ) {
      addBookMark(bookmarkId);
    } else {
      removeBookMark(bookmarkId);
    }
  }

  if (target.className != "movieCard") return;
  openModal(target);
};

// 모달창 영역 외에도 누르면 닫기 기능
document.addEventListener("mouseup", (e) => {
  if (!modalPage.contains(e.target)) {
    modalPage.style.display = "none";
    body.classList.remove("active");
  }
});
resetBtn.addEventListener("click", () => location.reload()); // 페이지 새로고침
bookmarkBtn.addEventListener("click", makeBookmarkCard); // 북마크 보기

export { makeCard, fetchMovies };
