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
    data["results"].forEach((elem) => {
      console.log(elem["title"], elem["vote_average"], elem["poster_path"]);
      const main = document.querySelector("#main");
      let img =
        "https://media.themoviedb.org/t/p/w440_and_h660_face" +
        elem["poster_path"];
      let title = elem["title"];
      let rate = elem["vote_average"];

      let tempHtml = `
      <div class="card_style_1">
        <div class="image">
          <img
            class="poster w-full"
            src="${img}"
            alt="${title}"
          />
        </div>
        <div class="content">
          <div class="consensus tight"></div>
          <h2>${title}</h2>
          <p>평점: ${rate}</p>
        </div>
      </div>`;
      let movie = document.createElement("div");
      movie.innerHTML = tempHtml;
      main.appendChild(movie);
    });
  })
  .catch((err) => console.error(err));
