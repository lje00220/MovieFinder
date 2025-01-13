import { getMoviesAPI } from "./api.js";

const body = document.querySelector("body");
const main = document.querySelector(".movies");
const searchInput = document.querySelector("#movieTitle");

const movieURL =
  "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1";

// 영화 카드 생성 함수
const makeCard = function (elem) {
  let img =
    "https://media.themoviedb.org/t/p/w440_and_h660_face" + elem["poster_path"];
  let title = elem["title"];
  let rate = elem["vote_average"];
  let engTitle = elem["original_title"];
  let overview = elem["overview"];
  let date = elem["release_date"];
  let id = elem["id"];
  let tempHtml = `
        <div id = ${id}>
          <img
            class="poster"
            id="image"
            src="${img}"
            alt="${title}"
          />
        </div>
        <div class="movieComment">
          <h2 id="title">${title} <br> (${engTitle})</h2>
          <p style="display: none;" id="overview">${overview}</p>
          <p style="display: none;" id="date">${date}</p>
          <p id="rate">평점: ${rate}</p>
        </div>`;
  let movie = document.createElement("div");
  movie.className = "movieCard";
  movie.innerHTML = tempHtml;
  main.appendChild(movie);
};

// 검색 기능 함수
const search = async function () {
  const searchURL = `https://api.themoviedb.org/3/search/movie?query=${searchInput.value}&include_adult=false&language=ko-KR&page=1`;
  const searchMovies = await getMoviesAPI(searchURL);

  searchMovies["results"].forEach((elem) => {
    if (!document.getElementById(elem.id)) makeCard(elem);
  });

  const movieTitle = document.querySelector("#movieTitle");
  const filter = movieTitle.value.toUpperCase();
  const div = document.getElementsByClassName("movieCard");

  for (let i = 0; i < div.length; i++) {
    let content = div[i].getElementsByTagName("h2")[0];
    let txtValue = content.textContent || content.innerText;
    txtValue = txtValue.replaceAll(" ", "");
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      div[i].style.display = "block";
    } else {
      div[i].style.display = "none";
    }
  }

  if (movieTitle.value === "") {
    main.innerHTML = "";
    fetchMovies["results"].forEach((elem) => makeCard(elem));
  }
};

// 모달창 클릭, 닫기
const modalFunc = function (target) {
  const modalPage = document.querySelector(".modal");
  const img = target.querySelector("#image").src;
  const title = target.querySelector("#title").textContent;
  const rate = target.querySelector("#rate").textContent;
  const content = target.querySelector("#overview").textContent;
  const releaseDate = target.querySelector("#date").textContent;
  let tempModal = `
  <div class="container">
    <div id="modalDiv">
      <div class="btn">
        <button class="modalBtn">❌</button>
      </div>
      <div class="modalImg">
        <img src="${img}" alt="${title}">
      </div>
      <div class="content">
        <h2>${title}</h2>
        <p>${content}</p>
        <p>개봉일: ${releaseDate}</p>
        <p>${rate}</p>
      </div>
      <div>
        <button class="bookmarkBtn">북마크 추가</button>
      </div>
    </div>
  </div>`;
  modalPage.innerHTML = tempModal;
  modalPage.style.display = "block";
  body.classList.toggle("active");

  const modalBtn = document.querySelector(".modalBtn");
  modalBtn.addEventListener("click", (event) => {
    modalPage.style.display = "none";
    body.classList.remove("active");
  });

  // body.addEventListener(
  //   "click",
  //   (event) => {
  //     console.log(event.target);
  //     if (event.target.className == "modal") return;
  //     modalPage.style.display = "none";
  //     body.classList.remove("active");
  //   },
  //   { once: true }
  // );
};

const fetchMovies = await getMoviesAPI(movieURL);
fetchMovies["results"].forEach((elem) => makeCard(elem));
searchInput.addEventListener("keyup", search);
body.onclick = function (event) {
  let target = event.target;
  if (target.className != "movieCard") return;
  modalFunc(target);
};
