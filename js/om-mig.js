//Storage af billeder

const billeder = [
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
  }
];

let nuværendeBillede = 0;

const frame = document.querySelector(".frame");


function render() {
  // Fade ud
  frame.classList.add("fade");

  // Vent på fade-out før billedet skiftes
  setTimeout(() => {
    frame.src = billeder[nuværendeBillede].src;
    frame.alt = billeder[nuværendeBillede].title;

    // Fade ind igen
    frame.classList.remove("fade");
  }, 800); // samme tid som CSS transition
}

function næsteBillede() {
  nuværendeBillede = (nuværendeBillede + 1) % billeder.length;
  render();
}

frame.addEventListener("click", næsteBillede);


setInterval(næsteBillede, 8000);

render();