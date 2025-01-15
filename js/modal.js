import { isBookMarked } from "./bookmark.js";

const modalPage = document.querySelector(".modal");
const body = document.querySelector("body");

// 모달창 클릭, 닫기
const openModal = function (target) {
  // 영화 정보 받아오기
  const id = target.firstElementChild.id;
  const img = target.querySelector("#image").src;
  const title = target.querySelector("#title").textContent;
  const rate = target.querySelector("#rate").textContent;
  const content = target.querySelector("#overview").textContent;
  const releaseDate = target.querySelector("#date").textContent;
  const btnText = isBookMarked(id) ? "북마크 제거" : "북마크 추가"; // 이미 북마크에 있다면 버튼을 "북마크 제거"로, 없다면 "북마크 추가"

  let tempModal = `
  <div class="container">
  <div class="modalDiv" id="${id}">
  <div class="btn">
  <button class="modalBtn">❌</button>
  </div>
  <div class="modalImg">
  <img src="${img}" alt="${title}">
  </div>
  <div class="content">
  <h2 class="modal-title">${title}</h2>
  <p>${content}</p>
  <p class = "modal-date">개봉일: ${releaseDate}</p>
  <p class="modal-rate">${rate}</p>
  </div>
  <div class="bookmarkDiv">
  <button class="bookmarkBtn">${btnText}</button>
  </div>
  </div>
  </div>`;

  // 모달창 띄우기, 모달창 배경 활성화
  modalPage.innerHTML = tempModal;
  modalPage.style.display = "block";
  body.classList.toggle("active");

  // 모달창 닫기
  const modalBtn = document.querySelector(".modalBtn");
  modalBtn.addEventListener("click", () => {
    modalPage.style.display = "none";
    body.classList.remove("active");
  });
};

export { openModal };
