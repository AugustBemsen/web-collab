(function () {
  const mouseRef = document.getElementsByTagName("svg")[0];

  document.addEventListener("mousemove", (event) => {
    const { clientX, clientY } = event;
    mouseRef.setAttribute("style", `top: ${clientY}px; left: ${clientX}px`);
  });
})();
