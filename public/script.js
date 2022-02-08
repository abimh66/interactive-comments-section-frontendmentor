// "use strict";
const mainContainer = document.querySelector(".main-container");
const replySection = document.querySelector(".replySection");
const imgCurrentUser = document.querySelector(".img-current-user");
const btnSend = document.querySelector(".button-send");
const comment = document.querySelector("#comment");
let currentId = 5;

const addContent = function (
  id,
  avatar,
  username,
  createdAt,
  comment,
  score,
  replyingTo = null,
  currentUsername,
  to = null
) {
  const html = `
  <div class="content-container flex flex-col gap-3" data-id=${id}>
    <div class="content flex flex-col gap-3">
      <div class="card">
        <!-- Content -->
        <div class="flex flex-col gap-5 w-full">
          <div class="flex gap-5 items-center">
            <!-- head -->
            <img
              src="${avatar}"
              alt="amy"
              class="w-8"
            />
            <span class="username font-bold">${username}</span>
            <span class="text-neutral-darkBlue h-max">${createdAt}</span>
          </div>
          <p>
          ${
            replyingTo
              ? `<a class="text-primary-blue font-bold cursor-pointer">@${replyingTo} </a>`
              : ""
          }
            ${comment}
          </p>
        </div>
        <!-- End Content -->
        <!-- Like/dislike -->
        <div
          class="flex sm:flex-col gap-5 sm:gap-3 py-3 px-4 sm:p-4 w-max sm:h-max items-center bg-neutral-lightGray1 rounded-lg"
        >
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" class="cursor-pointer">
            <path
              d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
              fill="#C5C6EF"
            />
          </svg>
          <span>${score}</span>
          <svg width="16" height="4" xmlns="http://www.w3.org/2000/svg" class="cursor-pointer">
            <path
              d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
              fill="#C5C6EF"
            />
          </svg>
        </div>
        <!-- End Like/dislike -->
        <!-- Button reply -->
        <div
          class="btnShowReplySection flex items-center gap-2 sm:gap-5 absolute right-5 bottom-7 sm:top-5 sm:bottom-auto text-primary-blue font-bold"
        >
        ${
          currentUsername == username
            ? `<div class="flex items-center gap-1 cursor-pointer">
            <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                fill="#ED6368"
              />
            </svg>
            <span class="text-red-500">Delete</span>
          </div>
          <div class="flex items-center gap-1 cursor-pointer">
            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                fill="#5357B6"
              />
            </svg>
            <span>edit</span>
          </div>`
            : `<div class="flex items-center gap-1 cursor-pointer">
            <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
              fill="#5357B6"
            />
          </svg>
          <span>Reply</span>
            </div>`
        }
        </div>
      </div>
      <!-- End button reply -->
    </div>
  </div>
  `;

  if (!to) return html;
  to.insertAdjacentHTML("beforeEnd", html);
};

const showReply = function (replies, idComment, currentUsername, to) {
  let html = `
  <div
  class="flex flex-col gap-3 pl-5 border-l-2 border-neutral-grayBlue"
>
  `;

  replies.forEach((reply) => {
    html += addContent(
      idComment,
      reply.user.image.png,
      reply.user.username,
      reply.createdAt,
      reply.content,
      reply.score,
      reply.replyingTo,
      currentUsername
    );
  });

  html += "</div>";
  to.insertAdjacentHTML("beforeEnd", html);
};

const openReplySec = function (to) {
  const html = `
  <!-- Add reply -->
  <div
    class="replySection flex relative flex-col gap-6 bg-white rounded-lg p-5"
  >
    <textarea
      name="textReply"
      id="reply"
      cols="30"
      rows="3"
      placeholder="Add a reply..."
      class="border-2 border-neutral-grayBlue rounded-lg resize-none p-3"
    ></textarea>
    <img
      src="images/avatars/image-maxblagun.png"
      alt="max"
      class="w-10 h-10"
    />
    <span
      class="btnAddReply absolute right-5 bottom-5 bg-primary-blue text-white px-5 py-2 w-max rounded-lg cursor-pointer"
      >Reply</span
    >
  </div>
  <!-- End Add Reply -->
  `;

  // delete element if already exist
  if (to.nextElementSibling) to.nextElementSibling.remove();
  else to.insertAdjacentHTML("afterEnd", html);
};

//Top level await
const data = await fetch("./data.json");
const resultData = await data.json();

//Load View
const loadView = function () {
  const { comments, currentUser } = resultData;
  console.log(currentUser.username);

  // Show Comment
  if (comments.length <= 0) return;
  comments.forEach((c) => {
    addContent(
      c.id,
      c.user.image.png,
      c.user.username,
      c.createdAt,
      c.content,
      c.score,
      null,
      currentUser.username,
      mainContainer
    );
  });

  // Show Reply
  comments.forEach((c, i) => {
    if (c.replies.length > 0)
      showReply(
        c.replies,
        c.id,
        currentUser.username,
        mainContainer.children[i]
      );
  });
};

const showBtnReply = function () {
  // Show Btn Reply
  const btnsShowReply = mainContainer.querySelectorAll(".btnShowReplySection");
  btnsShowReply.forEach((btn) => {
    btn.addEventListener("click", function () {
      openReplySec(this.parentElement);

      // Add Reply
      if (!mainContainer.querySelector(".btnAddReply")) return;
      mainContainer
        .querySelector(".btnAddReply")
        .addEventListener("click", function (e) {
          const idUser = +e.target.closest(".content-container").dataset.id;
          const replyContent = e.target.parentNode.firstElementChild.value;
          const replyingTo = e.target
            .closest(".content-container")
            .querySelector(".username").innerHTML;

          if (!replyContent) return;
          const newReply = {
            id: currentId,
            content: replyContent,
            createdAt: "today", //Need update
            score: 0,
            replyingTo: replyingTo,
            user: resultData.currentUser,
          };

          resultData.comments.forEach((c) => {
            c.id === idUser && c.replies.push(newReply);
          });
          currentId++;

          //Update view (Delete child in main container, Then load again)
          mainContainer.innerHTML = "";
          loadView(resultData);

          //Close reply section
          openReplySec(btn.parentElement);
        });
    });
  });
};

const showCurrentUser = function () {
  const { currentUser } = resultData;
  imgCurrentUser.src = currentUser.image.png;
};

// Initialize App
const initApp = function () {
  loadView();
  showBtnReply();
  showCurrentUser();
};
initApp();

// Add Comment
btnSend.addEventListener("click", function () {
  if (comment.value === "") return;

  const newComment = {
    id: currentId,
    content: comment.value,
    createdAt: "today", //Need update
    score: 0,
    user: resultData.currentUser,
    replies: [],
  };

  // Add data to JSON Object
  resultData.comments.push(newComment);
  currentId++;

  //Delete child in main container
  mainContainer.innerHTML = "";

  //Then load again
  loadView(resultData);

  //clear textarea
  comment.value = "";
});