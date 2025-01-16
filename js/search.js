import { getMoviesAPI } from "./api.js";
import { makeCard, fetchMovies } from "./app.js";

const searchInput = document.querySelector("#searchMovietitle"); // input창 검색어
const movies = document.querySelector(".movies"); // 영화 카드들 container

// 영화 검색 함수
const search = async function () {
  const searchValue = searchInput.value; // 검색어
  console.log(searchValue);
  const searchURL = `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=true&language=ko-KR&page=1`;
  const searchMovies = await getMoviesAPI(searchURL);

  movies.innerHTML = "";

  // 검색된 결과의 영화 카드 생성
  searchMovies["results"].forEach((elem) => {
    if (!document.getElementById(elem.id)) makeCard(elem);
  });

  // 만약, 검색어가 없을 때 다시 원래 영화 카드 출력
  if (searchInput.value === "") {
    fetchMovies["results"].forEach((elem) => makeCard(elem));
  }
};

export { search };
