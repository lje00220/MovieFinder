import { makeCard } from "./app.js";
import { getMoviesAPI } from "./api.js";

const movies = document.querySelector(".movies"); // 영화 카드들 container

// 북마크한 영화의 데이터 받아오기
const getBookmarkMovieData = async function (id) {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`;
  const data = await getMoviesAPI(url);
  return data;
};

// 로컬 스토리지에서 북마크된 영화의 id값을 받아오는 함수
const loadBookmark = function () {
  const bookmarkArr = [];
  for (let i = 0; i < localStorage.length; i++) {
    bookmarkArr.push(localStorage.key(i));
  }
  return bookmarkArr;
};

// 북마크 영화 카드 리스트 만드는 함수
const makeBookmarkCard = async function () {
  const arr = loadBookmark();
  const bookmarkMovies = await Promise.all(
    arr.map((id) => {
      return new Promise((resolve, reject) => {
        getBookmarkMovieData(id).then(resolve);
      });
    })
  );

  movies.innerHTML = "";
  bookmarkMovies.map((movie) => makeCard(movie));
};

// 북마크 여부 확인하는 함수
const isBookMarked = function (movie) {
  return localStorage.length > 0 ? loadBookmark().includes(movie) : false;
};

// 북마크 추가
const addBookMark = function (bookmarkId) {
  localStorage.setItem(bookmarkId, bookmarkId);
  alert("영화가 북마크에 추가되었습니다.");
};

// 북마크 제거
const removeBookMark = function (bookmarkId) {
  localStorage.removeItem(bookmarkId);
  alert("영화가 북마크에서 제거되었습니다.");
};

export { addBookMark, removeBookMark, isBookMarked, makeBookmarkCard };
