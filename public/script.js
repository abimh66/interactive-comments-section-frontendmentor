const body = document.querySelector("body");
const mainContainer = document.querySelector(".main-container");
const replySection = document.querySelector(".replySection");
const imgCurrentUser = document.querySelector(".img-current-user");
const btnSend = document.querySelector(".button-send");
const commentArea = document.querySelector(".comment-area");
const commentText = document.querySelector("#comment");
const deleteModal = document.querySelector(".delete-modal");
const btnCancel = document.querySelector(".button-cancel");
const btnDelete = document.querySelector(".button-delete");
let currentId = 5;

const addContent = function (
  id,
  contentAtId,
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
  <div class="content-container flex flex-col gap-3" data-id-content=${id} data-content-at-id=${contentAtId}>
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
            ${
              currentUsername == username
                ? `<span class="px-2 -ml-2 bg-primary-blue text-white text-sm"
            >you</span`
                : ""
            }
            <span class="text-neutral-darkBlue h-max">${createdAt}</span>
          </div>
          <p class="sm:w-11/12">
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
          class="vote-panel flex sm:flex-col items-center gap-5 sm:gap-3 py-3 px-4 sm:p-4 w-max sm:h-max bg-neutral-lightGray1 rounded-lg"
        >
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" class="button-like cursor-pointer fill-[#C5C6EF] hover:fill-primary-blue sm:ml-[6px]">
            <path
              d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
              
            />
          </svg>
          <span>${score}</span>
          <svg width="16" height="4" xmlns="http://www.w3.org/2000/svg" class="button-dislike cursor-pointer fill-[#C5C6EF] hover:fill-primary-blue sm:ml-[6px]">
            <path
              d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
              
            />
          </svg>
        </div>
        <!-- End Like/dislike -->
        <!-- Button reply -->
        <div
          class=" flex items-center gap-5 absolute right-5 bottom-7 sm:top-5 sm:bottom-auto text-primary-blue font-bold"
        >
        ${
          currentUsername == username
            ? `<div class="flex items-center gap-1 cursor-pointer hover:opacity-50">
            <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                fill="#ED6368"
              />
            </svg>
            <span class="show-button-delete text-primary-softRed ">Delete</span>
          </div>
          <div class="flex items-center gap-1 cursor-pointer hover:opacity-50">
            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                fill="#5357B6"
              />
            </svg>
            <span class="show-button-edit">Edit</span>
          </div>`
            : `<div class="flex items-center gap-1 cursor-pointer hover:opacity-50">
            <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
              fill="#5357B6"
            />
          </svg>
          <span class="btnShowReplySection">Reply</span>
            </div>`
        }
        </div>
      </div>
      <!-- End button reply -->
    </div>
  </div>
  `;

  // if we are not specified a 'to' parameter, then we return html text only
  // It is used in showReply() function
  if (!to) return html;

  // insert html as a last child of the 'to' element
  to.insertAdjacentHTML("beforeEnd", html);
};

const showReply = function (replies, idComment, currentUsername, to) {
  let html = `
  <div
  class="flex flex-col gap-3 sm:ml-10 pl-5 border-l-2 border-neutral-grayBlue"
  >
  `;

  replies.forEach((reply) => {
    const replyCreated =
      reply.createdAt instanceof Object
        ? dateFromNow(reply.createdAt)
        : reply.createdAt;

    html += addContent(
      reply.id,
      idComment,
      reply.user.image.png,
      reply.user.username,
      replyCreated,
      reply.content,
      reply.score,
      reply.replyingTo,
      currentUsername
    );
  });

  html += "</div>";
  to.insertAdjacentHTML("beforeEnd", html);
};

const toggleReplyAndEdit = function (type, to, textValue = "") {
  const html = `
  <div
    class=" relative flex flex-col sm:flex-row sm:items-start gap-6 bg-white rounded-lg p-5"
  >
    <textarea
      name="textReply"
      id="reply"
      cols="30"
      rows="3"
      placeholder="Add a reply..."
      class="w-full border-2 border-neutral-grayBlue rounded-lg resize-none p-3 sm:order-2"
      autofocus
    >${textValue}</textarea>
    <img
      src=${resultData.currentUser.image.png}
      alt="currentUser"
      class="w-10 h-10 sm:order-1"
    />
    <span
      class="${
        type == "reply" ? "btnAddReply" : "btnEdit"
      } absolute sm:static right-5 bottom-5 bg-primary-blue text-white uppercase px-5 sm:px-7 py-2 sm:py-3 w-max rounded-lg cursor-pointer hover:opacity-50 sm:order-3"
      >${type == "reply" ? "Reply" : "Edit"}</span
    >
  </div>
  `;

  // delete element if already exist or add as 'to' next sibling element if not exist yet
  if (to.nextElementSibling) to.nextElementSibling.remove();
  else to.insertAdjacentHTML("afterEnd", html);
};

let resultData;
if (!localStorage.getItem("data")) {
  //Top level await
  const data = await fetch("./data.json");
  resultData = await data.json();
} else {
  resultData = JSON.parse(window.localStorage.getItem("data"));
}

const generateDate = function () {
  const date = new Date();
  const dateNow = {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };

  return dateNow;
};

// Calculate difference between current time and createdAt time
const dateFromNow = function (dateCreated) {
  const dateNow = generateDate();

  if (dateNow.year !== dateCreated.year)
    return `${
      dateNow.year - dateCreated.year == 1
        ? "a year ago"
        : dateNow.year - dateCreated.year + " years ago"
    }`;
  if (dateNow.month !== dateCreated.month)
    return `${
      dateNow.month - dateCreated.month == 1
        ? "a month ago"
        : dateNow.month - dateCreated.month + " months ago"
    } `;
  if (dateNow.day !== dateCreated.day)
    return `${
      dateNow.day - dateCreated.day == 1
        ? "a day ago"
        : dateNow.day - dateCreated.day + " days ago"
    }`;
  if (dateNow.hour !== dateCreated.hour)
    return `${
      dateNow.hour - dateCreated.hour == 1
        ? "a hour ago"
        : dateNow.hour - dateCreated.hour + " hours ago"
    } `;
  if (dateNow.minute !== dateCreated.minute)
    return `${
      dateNow.minute - dateCreated.minute == 1
        ? "a minute ago"
        : dateNow.minute - dateCreated.minute + " minutes ago"
    }`;

  return "a second ago";
};

//Load View
const loadView = function () {
  const { comments, currentUser } = resultData;

  // Show Comment
  if (comments.length <= 0) return;
  comments.forEach((c) => {
    const commentCreated =
      c.createdAt instanceof Object ? dateFromNow(c.createdAt) : c.createdAt;

    addContent(
      c.id,
      c.id,
      c.user.image.png,
      c.user.username,
      commentCreated,
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
      toggleReplyAndEdit(
        "reply",
        this.parentElement.parentElement.parentElement
      );

      // Add Reply
      if (!mainContainer.querySelector(".btnAddReply")) return;
      mainContainer
        .querySelector(".btnAddReply")
        .addEventListener("click", function (e) {
          const replyingInId =
            +e.target.closest(".content-container").dataset.contentAtId;
          const replyContent = e.target.parentNode.firstElementChild.value;
          const replyingTo = e.target
            .closest(".content-container")
            .querySelector(".username").innerHTML;

          if (!replyContent) return;
          const newReply = {
            id: currentId,
            content: replyContent,
            createdAt: generateDate(),
            score: 0,
            replyingTo: replyingTo,
            user: resultData.currentUser,
          };

          // Add reply to comment parent
          resultData.comments.forEach((c) => {
            c.id === replyingInId && c.replies.push(newReply);
          });
          currentId++;

          //Update view (Delete child in main container, Then load again)
          mainContainer.innerHTML = "";
          initApp();

          //Close reply section
          toggleReplyAndEdit("reply", btn.parentElement);
        });
    });
  });
};

const showBtnEdit = function () {
  // Show Btn Edit
  const btnsShowEdit = mainContainer.querySelectorAll(".show-button-edit");
  btnsShowEdit.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const idContent =
        +e.target.closest(".content-container").dataset.idContent;
      const contentAtId =
        +e.target.closest(".content-container").dataset.contentAtId;
      let editingAt;

      // Find Edited data
      if (idContent == contentAtId) {
        resultData.comments.forEach(
          (c) => c.id == idContent && (editingAt = c)
        );
      } else {
        resultData.comments.forEach((c) => {
          if (c.id == contentAtId) {
            c.replies.forEach((r) => r.id == idContent && (editingAt = r));
          }
        });
      }

      toggleReplyAndEdit(
        "edit",
        this.parentElement.parentElement.parentElement,
        editingAt.content
      );

      if (!mainContainer.querySelector(".btnEdit")) return;
      mainContainer
        .querySelector(".btnEdit")
        .addEventListener("click", function (e) {
          const editContent = e.target.parentNode.firstElementChild.value;
          // console.log(editContent);

          if (!editContent) return;
          const editedData = {
            id: editingAt.id,
            content: editContent,
            createdAt: generateDate(),
            score: editingAt.score,
            user: editingAt.user,
          };

          if (idContent == contentAtId) {
            resultData.comments.forEach((c, index, arr) => {
              if (c.id == idContent) {
                editedData.replies = editingAt.replies;
                arr[index] = editedData;
              }
            });
          } else {
            resultData.comments.forEach((c) => {
              if (c.id == contentAtId) {
                c.replies.forEach((r, index, arr) => {
                  if (r.id == idContent) {
                    editedData.replyingTo = editingAt.replyingTo;
                    arr[index] = editedData;
                  }
                });
              }
            });
          }
          // end if
          //Update view (Delete child in main container, Then load again)
          mainContainer.innerHTML = "";
          initApp();
        });
    });
  });
};

const toggleModal = function () {
  deleteModal.classList.toggle("hidden");
  deleteModal.classList.toggle("grid");
  body.classList.toggle("overflow-hidden");
};

const showBtnDelete = function () {
  // Show Btn Delete
  const btnsShowDelete = mainContainer.querySelectorAll(".show-button-delete");
  btnsShowDelete.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const parent = e.target.closest(".content-container");

      toggleModal();
      btnCancel.addEventListener("click", toggleModal);
      btnDelete.addEventListener("click", function (e) {
        const idContent = +parent.dataset.idContent;
        const contentAtId = +parent.dataset.contentAtId;

        if (idContent == contentAtId) {
          resultData.comments.forEach((c, index, arr) => {
            if (c.id == idContent) {
              arr.splice(index, 1);
            }
          });
        } else {
          resultData.comments.forEach((c) => {
            if (c.id == contentAtId) {
              c.replies.forEach((r, index, arr) => {
                if (r.id == idContent) {
                  arr.splice(index, 1);
                }
              });
            }
          });
        }

        //Update view (Delete child in main container, Then load again)
        mainContainer.innerHTML = "";
        initApp();

        // CLose modal
        toggleModal();
      });
    });
  });
};

const addLikeDislike = function () {
  const votePanels = mainContainer.querySelectorAll(".vote-panel");

  votePanels.forEach((panel) => {
    panel.addEventListener("click", function (e) {
      const btnLike = e.target.closest(".button-like");
      const btnDislike = e.target.closest(".button-dislike");
      const idContent =
        +e.target.closest(".content-container").dataset.idContent;
      const contentAtId =
        +e.target.closest(".content-container").dataset.contentAtId;

      // console.log(btnLike, btnDislike);
      if (!btnLike && !btnDislike) return;

      // Find Edited data
      if (idContent == contentAtId) {
        resultData.comments.forEach((c) => {
          if (c.id == idContent) btnLike ? c.score++ : c.score--;
        });

        // Sorting comments based on score
        resultData.comments.sort((a, b) => b.score - a.score);
      } else {
        resultData.comments.forEach((c) => {
          if (c.id == contentAtId) {
            c.replies.forEach((r) => {
              if (r.id == idContent) btnLike ? r.score++ : r.score--;
            });
          }
        });
      }

      //Update view (Delete child in main container, Then load again)
      mainContainer.innerHTML = "";
      initApp();
    });
  });
};

const sendComment = function () {
  // Add Comment
  btnSend.addEventListener("click", function () {
    if (commentText.value === "") return;

    const newComment = {
      id: currentId,
      content: comment.value,
      createdAt: generateDate(),
      score: 0,
      user: resultData.currentUser,
      replies: [],
    };

    // Add new data to Data Object
    resultData.comments.push(newComment);
    currentId++;

    //Delete child in main container, Then load again
    mainContainer.innerHTML = "";
    initApp();

    //clear textarea
    comment.value = "";
  });
};

// Initialize App
const initApp = function () {
  loadView();
  showBtnReply();
  showBtnEdit();
  showBtnDelete();
  sendComment();
  addLikeDislike();

  commentArea.classList.remove("opacity-0");
  imgCurrentUser.src = resultData.currentUser.image.png;

  // Set local storage
  localStorage.setItem("data", JSON.stringify(resultData));
};
initApp();
