import { io } from "socket.io-client";

const socket = io("ws://127.0.0.1:3000");

socket.on("message", (message: any) => {
  console.log("hello", message);
});

(function () {
  const mouseRef = document.getElementsByTagName("svg")[0];

  document.addEventListener("mousemove", (event) => {
    const { clientX, clientY } = event;
    mouseRef.setAttribute("style", `top: ${clientY}px; left: ${clientX}px`);
    console.log({
      clientX,
      clientY,
    });

    socket.emit("message", event);
  });
})();
