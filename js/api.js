const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzkxYWVjMTA3ZTRlNmFmMWUwYWM4NjQyMDUwODdjMCIsIm5iZiI6MTczNjMxMjc3Ny42MjMwMDAxLCJzdWIiOiI2NzdlMDdjOWE2Nzc4YWE1YjM3YWZhMzEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OEs7hHoPgUBZiTsFv9Z0WhrBamfklY-BTN4veBfHVMg",
  },
};

// TMDB API 요청 코드
async function getMoviesAPI(URL) {
  try {
    const response = await fetch(URL, options);

    if (!response.ok) {
      throw new Error("에러 발생!!");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("에러 발생!!!");
  }
}

export { getMoviesAPI };
