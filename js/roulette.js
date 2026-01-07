//storage af billeder

let isAnimating = false;


const photos = [
  { src: "images/Tema-1.jpg", title: "Tema 1 - Introuge"},
  { src: "images/Tema-2.jpg", title: "Tema 2 - Grundlæggende Web"},
  { src: "images/Tema-3.jpg", title: "Tema 3 - Grundlæggende UX"},
  { src: "images/Tema-4.jpg", title: "Tema 4 - Grundlæggende Brugergrænsefladeudvikling"},
  { src: "images/Tema-5.jpg", title: "Tema 5 - Grundlæggende Indhold"}
];

let currentIndex = 0;

const slots = document.querySelectorAll(".image-slot");
const infoBtn = document.getElementById("infoBtn");
const popover = document.getElementById("popover");
const popoverPages = document.querySelectorAll(".popover-page");



function getSlots() {
  return {
    prev: document.querySelector(".image-slot.prev"),
    current: document.querySelector(".image-slot.current"),
    next: document.querySelector(".image-slot.next")
  };
}


//modulo (%) efterlader remainderen efter at minusse de 2 ting
function render() {
  const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
  const nextIndex = (currentIndex + 1) % photos.length;

  const { prev, current, next } = getSlots();

  prev.querySelector("img").src = photos[prevIndex].src;
  current.querySelector("img").src = photos[currentIndex].src;
  next.querySelector("img").src = photos[nextIndex].src;

  document.getElementById("title").textContent = photos[currentIndex].title;

  if (!popover.classList.contains("hidden")) {
    updatePopoverContent();
  }
}

//Popout tied til currentindex
function updatePopoverContent() {
  popoverPages.forEach(page => {
    page.classList.toggle(
      "active",
      Number(page.dataset.index) === currentIndex
    );
  });
}

function rotateForward() {
  if (isAnimating) return;
  isAnimating = true;

  const { prev, current, next } = getSlots();

  // rotate roles
  prev.classList.remove("prev");
  prev.classList.add("next");

  current.classList.remove("current");
  current.classList.add("prev");

  next.classList.remove("next");
  next.classList.add("current");

  // update index efter animation
  currentIndex = (currentIndex + 1) % photos.length;

  // update billeder efter animation er slut
  setTimeout(() => {
    render();
    isAnimating = false;
  }, 450);
}


function rotateBackward() {
  if (isAnimating) return;
  isAnimating = true;

  const { prev, current, next } = getSlots();

  prev.classList.remove("prev");
  prev.classList.add("current");

  current.classList.remove("current");
  current.classList.add("next");

  next.classList.remove("next");
  next.classList.add("prev");

  currentIndex = (currentIndex - 1 + photos.length) % photos.length;

  setTimeout(() => {
    render();
    isAnimating = false;
  }, 450);
}


//åben knap
infoBtn.addEventListener("click", () => {
  updatePopoverContent();
  popover.classList.remove("hidden");
});

//luk knap
document.addEventListener("click", (e) => {
  if (!popover.contains(e.target) && e.target !== infoBtn && !infoBtn.contains(e.target)) {
    popover.classList.add("hidden");
  }
});



//knappernes kode
document.querySelector(".roulette").addEventListener("click", (e) => {
  const slot = e.target.closest(".image-slot");
  if (!slot) return;

  if (slot.classList.contains("prev")) {
    rotateBackward();
  }

  if (slot.classList.contains("next")) {
    rotateForward();
  }
});


  render();

