"use string";
window.addEventListener("load", function () {
  const preloader = document.createElement("div");
  const content = document.getElementById("body");
  function makePreloader() {
    preloader.style.backgroundColor = "black";
    preloader.style.position = "fixed";
    preloader.style.top = 0;
    preloader.style.left = 0;
    preloader.style.width = "100%";
    preloader.style.height = "100%";
    preloader.style.display = "flex";
    preloader.style.justifyContent = "center";
    preloader.style.alignItems = "center";
    preloader.style.zIndex = 9999;

    const logo = document.createElement("img");
    logo.src = "../img/logo.png";
    logo.alt = "Логотип";
    logo.style.width = "150px";

    preloader.appendChild(logo);
    document.body.appendChild(preloader);
  }

  makePreloader();
  setTimeout(function () {
    preloader.style.display = "none";
    content.style.display = "block";
  }, 2000);
});
