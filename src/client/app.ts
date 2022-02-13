// @ts-ignore: Unreachable code error
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
const socket = io("http://127.0.0.1:3000");

let svg = document.createElement("div");
svg.setAttribute("id", "web__colab_");

socket.on("connect", () => {
  svg.innerHTML = `
  <svg
    width="19"
    height="19"
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    id=${socket.id}
  >
    <path
      d="M1 1L8.07 18L10.58 10.61L18 8.07L1 1Z"
      stroke=#26D17F
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>`;
  document.body.appendChild(svg);
});

socket.on("message", (message: []) => {
  let allSvgID: string[];
  const mouse_div = document.getElementById("web__colab_") as HTMLBodyElement;

  message.forEach((mes: { id: string; clientY: number; clientX: number }) => {
    // Filter NodeList, output result to a new Array
    [...mouse_div.children].forEach((nod: any) => {
      allSvgID.push(nod.getAttribute("id"));

      allSvgID = [...new Set(allSvgID)];
    });
    if (allSvgID.includes(mes.id) === false) {
      mouse_div.innerHTML += `
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          id=${mes.id}
        >
          <path
            d="M1 1L8.07 18L10.58 10.61L18 8.07L1 1Z"
            stroke=#26D17F
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>`;
    }
    const mouseRef = document.getElementById(mes.id);
    if (mouseRef) {
      mouseRef.setAttribute(
        "style",
        `position: absolute; top: ${mes.clientY}px; left: ${mes.clientX}px; transform: translate(-50%, -50%);`
      );
    }
  });
});

(function () {
  document.addEventListener("mousemove", (event) => {
    const { clientX, clientY } = event;
    if (socket.id) {
      socket.emit("message", {
        id: socket.id,
        clientX,
        clientY,
      });
    }
  });
})();
