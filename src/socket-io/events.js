import openSocket from "socket.io-client";
const socket = openSocket("localhost:4000");
// , {
//   transports: ["websocket"],
//   upgrade: false,
// });

// var curUser;

function _isActive() {
  socket.emit("isActive", "I'm going now...!");
}

function getOnlineUsers(cb) {
  socket.emit("onlineUser", "");
  socket.on("onlineNow", (users) => cb(users));
}

function setOnlineUser(userName) {
  // curUser = userName;
  console.log("Set Online User", userName);
  socket.emit("onlineUser", userName);
}

// function getCurrentUser() {
//   console.log(curUser);
//   return curUser;
// }

function broadCastMsg(msg) {
  socket.emit("broadCastMsg", msg);
}

function getMsgs(cb) {
  socket.on("getMsg", (messages) => cb(messages));
}

export { getOnlineUsers, setOnlineUser, broadCastMsg, getMsgs, _isActive };
