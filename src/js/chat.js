"use strict"
const socket = io();

const nickname = document.querySelector("#nickname")
const chatList = document.querySelector(".chatting-list")
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");

chatInput.addEventListener("keypress", (event) => {
    if(event.key === "Enter") {
        send();
    }
})

function send() {
    const param = {
        name: nickname.value,
        message: chatInput.value
    }
    socket.emit("chatting", param)
}

sendButton.addEventListener("click", send)

socket.on("chatting", (data) => {
    console.log(data)
    const { name, message, time } = data
    const item = new LiModel(name, message, time);
    item.makeLi();
    displayContainer.scrollTop(0, displayContainer.scrollHeight)
})

function LiModel(name, message, time) {
    this.name = name;
    this.message = message;
    this.time = time;

    this.makeLi = () => {
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent" : "received"); // 조건 수정
        const dom = 
        `<span class="profile">
            <img class="image" src="css/chat_image.jpg" alt="any">
        </span>
        <span class="message-wrapper">
            <span class="user">${this.name}</span>
            <span class="message">${this.message}</span>
        </span>                    
        <span class="time">${this.time}</span>`;
        li.innerHTML = dom;
        chatList.appendChild(li)
    }
}