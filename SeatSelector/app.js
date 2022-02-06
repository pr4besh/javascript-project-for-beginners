const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(occupied)");
const count = document.querySelector("#count");
const total = document.querySelector("#total");
const movieSelect = document.querySelector("#movie-list");

let ticketPrice = +movieSelect.value;

// Save movies index and price
const saveMovieData = (index, price) => {
   localStorage.setItem("selectedMovieIndex", index);
   localStorage.setItem("selectedMoviePrice", price);
};

const updateCount = () => {
   const selectedSeats = document.querySelectorAll(".row .seat.selected");

   const seatIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
   localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));

   const selectedSeatsCount = selectedSeats.length;

   count.innerText = selectedSeatsCount;
   total.innerText = selectedSeatsCount * ticketPrice;
};

// Get data from local storage and populate ui

const populateUI = () => {
   const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
   if (selectedSeats !== null && selectedSeats.length > 0) {
      seats.forEach((seat, index) => {
         if (selectedSeats.indexOf(index) > -1) {
            seat.classList.add("selected");
         }
      });
   }

   const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
   if (selectedMovieIndex !== null) {
      movieSelect.selectedIndex = selectedMovieIndex;
   }
};

// Movie select event
movieSelect.addEventListener("change", (e) => {
   ticketPrice = +e.target.value;
   saveMovieData(e.target.selectedIndex, e.target.value);
   updateCount();
});

// Seat Clicking event
container.addEventListener("click", (e) => {
   if (
      e.target.classList.contains("seat") &&
      !e.target.classList.contains("occupied")
   ) {
      e.target.classList.toggle("selected");
      updateCount();
   }
});

populateUI();

// Initial count and total set
updateCount();
