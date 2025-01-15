import { getMoviesAPI } from "./api.js";
import { search } from "./search.js";
import { openModal } from "./modal.js";
import {
  addBookMark,
  removeBookMark,
  makeBookmarkCard,
  isBookMarked,
} from "./bookmark.js";

// 영화 카드 생성 함수
const makeCard = function (elem) {
  let tempHtml = `
  <div id = ${elem["id"]}>
  <img
  class="poster"
  id="image"
  src="${
    "https://media.themoviedb.org/t/p/w440_and_h660_face" + elem["poster_path"]
  }"
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
  movies.appendChild(movie);
};

const body = document.querySelector("body");
const movies = document.querySelector(".movies");
const searchInput = document.querySelector("#searchMovietitle");
const modalPage = document.querySelector(".modal");
const resetBtn = document.querySelector("h1");
const bookmarkBtn = document.querySelector(".openBookmarkBtn");
const movieURL =
  "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1";
let timer;

// 초반 영화 20개 카드 리스트 생성
const fetchMovies = await getMoviesAPI(movieURL);
fetchMovies["results"].forEach((elem) => makeCard(elem));

// 영화 검색(디바운싱 적용)
searchInput.addEventListener("input", () => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(search, 500);
});

// 북마크 추가, 제거 버튼 클릭
modalPage.addEventListener("click", (event) => {
  if (
    event.target.className === "bookmarkDiv" ||
    event.target.className === "bookmarkBtn"
  ) {
    const bookmarkText = document.querySelector(".bookmarkBtn");
    const bookmarkId = modalPage.firstElementChild.firstElementChild.id;

    if (
      bookmarkText.textContent === "북마크 추가" &&
      !isBookMarked(bookmarkId)
    ) {
      addBookMark(bookmarkId); // 북마크 추가
      bookmarkText.innerText = "북마크 제거";
    } else if (
      bookmarkText.textContent === "북마크 제거" &&
      isBookMarked(bookmarkId)
    ) {
      removeBookMark(bookmarkId); // 북마크 제거
      bookmarkText.innerText = "북마크 추가";
    }
  }
});

// 영화 카드 클릭 시 상세정보 모달창 띄우기
movies.addEventListener("click", (event) => {
  let target = event.target;
  if (target.className != "movieCard") return;
  openModal(target);
});

// 모달창 영역 외에도 누르면 닫기 기능
document.addEventListener("mouseup", (event) => {
  if (!modalPage.contains(event.target)) {
    modalPage.style.display = "none";
    body.classList.remove("active");
  }
});

resetBtn.addEventListener("click", () => location.reload()); // 페이지 새로고침
bookmarkBtn.addEventListener("click", makeBookmarkCard); // 북마크 보기

export { makeCard, fetchMovies };
