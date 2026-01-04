document.addEventListener("DOMContentLoaded", () => {
//storage af billeder

const photos = [
  {
    src: "images/cowboy.png",
    title: "First Photo"
  },
  {
    src: "images/cowboy.png",
    title: "Second Photo"
  },
  {
    src: "images/cowboy.png",
    title: "Third Photo"
  },

  {
    src: "images/cowboy.png",
    title: "Fourth Photo"
  },

  {
    src: "images/cowboy.png",
    title: "Fifth Photo"
  }
];

let currentIndex = 0;

const track = document.querySelector(".track");
const slots = document.querySelectorAll(".image-slot");
const title = document.querySelector(".info h3");


//modulo (%) efterlader remainderen efter at minusse de 2 ting
function render() {
  const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
  const nextIndex = (currentIndex + 1) % photos.length;


  document.querySelector("#prev img").src = photos[prevIndex].src;
  document.querySelector("#current img").src = photos[currentIndex].src;
  document.querySelector("#next img").src = photos[nextIndex].src;


  title.textContent = photos[currentIndex].title;
}


//slide fremad animation
function slideForward() {
  track.style.transform = "translateX(-100px)";

  setTimeout(() => {
    track.style.transition = "none";
    track.style.transform = "translateX(0)";

    currentIndex = (currentIndex + 1) % photos.length;
    render();

    track.offsetHeight;
    track.style.transition = "transform 0.4s ease";
  }, 400);
}

//slide tilbage animation

function slideBackward() {
  track.style.transform = "translateX(100px)";

  setTimeout(() => {
    track.style.transition = "none";
    track.style.transform = "translateX(0)";

    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    render();

    track.offsetHeight;
    track.style.transition = "transform 0.4s ease";
  }, 400);
}


//knappernes kode

document.getElementById("forward").addEventListener("click", slideForward);
document.getElementById("back").addEventListener("click", slideBackward);

slots[0].addEventListener("click", slideBackward);
slots[2].addEventListener("click", slideForward);


//kode for at klikke videre på billederne selv
document.getElementById("prev").addEventListener("click", slideBackward);
document.getElementById("next").addEventListener("click", slideForward);


  render();
});


