const messageList = document.querySelector("ul")
const messageForm = document.querySelector("#message")
const nickForm = document.querySelector("#nickname")
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
    const msg = {type, payload};
    return JSON.stringify(msg);
}


// 소켓에 연결 성공 시 발생할 이벤트
socket.addEventListener("open", () => {
    console.log("Connected to Browser ok");
})

// 소켓에 데이터 도착 시 발생할 이벤트
socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
})

// 소켓에 연결 해제 시 발생할 이벤트
socket.addEventListener("close", () => {
    console.log("Disconnected from Server")
})



messageForm.addEventListener("submit", event => {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    input.value = "";
})



nickForm.addEventListener("submit", event => {
    event.preventDefault()
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
})