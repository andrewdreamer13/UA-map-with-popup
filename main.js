// svg map

const popup = document.querySelector(".popup");
const popupInner = document.querySelector(".popup__inner");
const closeButton = document.querySelector(".popup__close");
const mapRegions = document.querySelectorAll(".svg-link");
const allPaths = document.querySelectorAll(".svg-link path");

//mouse actions for mapRegions

mapRegions.forEach((region) => {
  region.addEventListener("mouseenter", (e) => {
    let currentPath = region.querySelector("path");
    currentPath.style.fill = "#dbea0c";
  });
});

mapRegions.forEach((region) => {
  region.addEventListener("mouseleave", (e) => {
    let currentPath = region.querySelector("path");
    if (currentPath.getAttribute("data-active") !== "true") {
      currentPath.style.fill = "#0a6def";
    }
  });
});

// open popup

mapRegions.forEach((region) => {
  let currentPath = region.querySelector("path");
  removeActiveClass();

  region.addEventListener("click", (event) => {
  
    allPaths.forEach((path) => {
      path.style.fill = "#0a6def";
      path.removeAttribute("data-active");
    });
    currentPath.style.fill = "#dbea0c";
    currentPath.setAttribute("data-active", "true");

    let dataId = region.getAttribute("data-id");

    let coordY = currentPath.getBoundingClientRect().top - popup.getBoundingClientRect().height / 2;
    let coordX = currentPath.getBoundingClientRect().left;

    popup.style.cssText = `top: ${coordY}px;left: ${coordX}px;  `;

    async function getData() {
      let response = await fetch(`data.json`, { method: "GET" });
      let data = await response.json();
      data.forEach((item) => {
        if (item.id == dataId) {
          popupInner.innerHTML = `
          <h2 class="popup__capital"> ${item.capital}</h2>
          <img class="popup__img" src="${item.src}" alt="${item.alt}">
         `;
         addActiveClass();
        }
      });
    }
    removeActiveClass();
    getData();
   
   
      //   window.addEventListener("click", (e) => {
      //     if (e.target != popup) {
      //       popup.classList.remove("popup-visible");
      //       popupInner.innerHTML = "";
      //       popupInner.classList.remove("popup__inner-active");
      //       //  document.body.style.overflow = 'scroll';
      //     }
      //   });
   });
});



function addActiveClass() {
  popup.classList.add("popup-visible");
  popupInner.classList.add("popup__inner-active");
}

function removeActiveClass() {
  popup.classList.remove("popup-visible");
  popupInner.classList.remove("popup__inner-active");
}
