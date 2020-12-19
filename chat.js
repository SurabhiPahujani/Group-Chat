function Comment(userName, text, time) {
  this.userName = userName;
  this.text = text;
  this.time = time;
}

Comment.prototype.save = function () {
  console.log("inside prototype of reply");
  var commentList =
    JSON.parse(window.localStorage.getItem("commentList")) || [];
  commentList.push(this);
  createCommentView(commentList);
};

createCommentView = (commentList) => {
  console.log("inside prototype of reply3");
  var docFrag = document.createDocumentFragment();
  docFrag.appendChild(showComments(commentList));
  document.getElementById("viewComments").innerHTML = "";
  document.getElementById("viewComments").appendChild(docFrag);
  window.localStorage.setItem("commentList", JSON.stringify(commentList));
};

createComment = (userName, text, time) => {
  var comment = new Comment(userName, text, time);
  comment.save();
  return comment;
};

showComments = (commentList) => {
  var mainUL = document.createElement("ul");
  for (var i = 0; i < commentList.length; i++) {
    var comment = new Comment(
      commentList[i].userName,
      commentList[i].text,
      commentList[i].time
    );
    var li = createLi(comment, i);
    mainUL.appendChild(li);
  }
  return mainUL;
};

createLi = (comment) => {
  // main li element
  var li = document.createElement("li");

  // main div for the li element
  var mainDiv = document.createElement("div");

  //commentDiv which will have comment and username
  var commentDiv = document.createElement("div");
  commentDiv.className = "comment-div";
  var commentName = document.createElement("div");
  var time = document.createElement("span");
  time.className = "time";
  time.innerHTML = comment.time;
  commentName.innerHTML = comment.userName
    ? `${comment.userName}`
    : "Anonymous User";
  commentName.appendChild(time);
  commentName.className = "userName";
  var commentText = document.createElement("p");
  commentText.innerHTML = comment.text;
  commentText.className = "comment";
  commentDiv.appendChild(commentName);
  commentDiv.appendChild(commentText);

  //reply username div
  var userNameDiv = document.createElement("div");
  var userName = document.createTextNode("Username:");
  var usernameInput = document.createElement("input");
  userNameDiv.appendChild(userName);
  userNameDiv.appendChild(usernameInput);
  mainDiv.appendChild(commentDiv);
  li.appendChild(mainDiv);
  return li;
};

document.getElementById("post").addEventListener("click", function () {
  var userName = document.getElementById("userName").value;
  var content = document.getElementById("joinDiscussion").value;
  var d = new Date();
  var h = (d.getHours() < 10 ? "0" : "") + d.getHours();
  var m = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
  var time = h + ":" + m;
  console.log(time);
  createComment(userName, content, time);
});

var commentList = JSON.parse(window.localStorage.getItem("commentList")) || [];
if (commentList.length) createCommentView(commentList);
