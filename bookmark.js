import { makeCard } from "./app.js";
import { getMoviesAPI } from "./api.js";

const bookmarkBtn = document.querySelector(".openBookmarkBtn");
const main = document.querySelector(".movies");

const getMovieData = async function (id) {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`;
  const data = await getMoviesAPI(url);
  return data;
};

const openBookmark = async function () {
  const bookmarkArr = [];
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) === "alertShown") continue;
    bookmarkArr.push(localStorage.key(i));
  }

  main.innerHTML = "";
  const movies = await Promise.all(
    bookmarkArr.map((id) => {
      return new Promise((resolve, reject) => {
        getMovieData(id).then(resolve);
      });
    })
  );
  main.innerHTML = "";
  movies.map((movie) => makeBookmarkCard(movie));
};

const makeBookmarkCard = function (movie) {
  makeCard(movie);
};

bookmarkBtn.addEventListener("click", openBookmark);
