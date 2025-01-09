const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzkxYWVjMTA3ZTRlNmFmMWUwYWM4NjQyMDUwODdjMCIsIm5iZiI6MTczNjMxMjc3Ny42MjMwMDAxLCJzdWIiOiI2NzdlMDdjOWE2Nzc4YWE1YjM3YWZhMzEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OEs7hHoPgUBZiTsFv9Z0WhrBamfklY-BTN4veBfHVMg",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
  options
)
  .then((res) => {
    if (!res.ok) {
      throw new Error("에러 발생!");
    }
    return res.json();
  })
  .then((data) => {
    console.log(data);
    data["results"].forEach((elem) => {
      // console.log(elem["title"], elem["vote_average"], elem["poster_path"]);
      // console.log(elem);
      const main = document.querySelector(".movies");
      let img =
        "https://media.themoviedb.org/t/p/w440_and_h660_face" +
        elem["poster_path"];
      let title = elem["title"];
      let rate = elem["vote_average"];
      let engTitle = elem["original_title"];
      let id = elem["id"];
      let tempHtml = `
      <a href="#popup">
        <div class="card_style_1" onclick="modal()" id="${id}">
          <div class="image">
            <img
              class="poster w-full"
              src="${img}"
              alt="${title}"
            />
          </div>
          <div class="content">
            <h2>${title} <br> (${engTitle})</h2>
            <p>평점: ${rate}</p>
          </div>
        </div>
      </a>`;
      let movie = document.createElement("div");
      movie.innerHTML = tempHtml;
      main.appendChild(movie);
    });
  })
  .catch((err) => console.error(err));

// 검색 기능 함수
const search = function () {
  const movieTitle = document.querySelector("#movieTitle");
  const filter = movieTitle.value.toUpperCase();
  const div = document.getElementsByClassName("card_style_1");
  for (let i = 0; i < div.length; i++) {
    let content = div[i].getElementsByTagName("h2")[0];
    txtValue = content.textContent || content.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      div[i].style.display = "block";
    } else {
      div[i].style.display = "none";
    }
  }
};

// 20개의 div마다 돌면서 각각마다 확인
// 1개의 div의 h2태그(제목)의 내용을 받아온게 txtValue
// 이 내용에서 내가 검색한 filter값이 있냐 없냐를 Indexof를 통해서 확인
// 만약 있으면 block, 없으면 none으로 표시

// 모달창 띄우기
const modal = function () {
  let movie = document.querySelector(".card_style_1");
  let movieID = Number(movie.id);
  let modalPage = document.querySelector(".modal");
  // console.log(movieID);
  fetch(
    "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
    options
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("에러 발생!");
      }
      return res.json();
    })
    .then((data) => {
      data["results"].forEach((elem) => {
        if (elem["id"] === movieID) {
          let img =
            "https://media.themoviedb.org/t/p/w440_and_h660_face" +
            elem["poster_path"];
          let title = elem["title"];
          let rate = elem["vote_average"];
          let overview = elem["overview"];
          let releaseDate = elem["release_date"];
          // console.log(title, rate, overview, releaseDate);
          let tempModal = `<div>
            <img src="${img}" alt="${title}">
            <h2>${title}</h2>
            <p>${overview}</p>
            <p>${releaseDate}</p>
            <p>${rate}</p>
          </div>`;

          let modalContent = document.createElement("div");
          modalContent.innerHTML = tempModal;
          modalPage.appendChild(modalContent);
        }
      });
      // console.log(selectMovie);
    })
    .catch((err) => console.error(err));
  modalPage.style.display = "block";
};

// const movies = document.querySelectorAll(".card_style_1");
// console.log(movies);
// let targetID;
// for (let i = 0; i < movies.length; i++) {
//   movies[i].addEventListener("click", function () {
//     console.log("click");
//   });
// }
