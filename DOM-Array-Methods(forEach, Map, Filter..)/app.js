const main = document.querySelector("#main");
const addUser = document.querySelector("#add-user");
const double = document.querySelector("#double");
const million = document.querySelector("#million");
const sort = document.querySelector("#sort");
const total = document.querySelector("#calculate-total");

let data = [];

// Fetch random user and money

const getRandomUser = async () => {
   const res = await fetch("https://randomuser.me/api");
   const data = await res.json();

   const user = data.results[0];

   const newUser = {
      name: `${user.name.first} ${user.name.last}`,
      money: Math.floor(Math.random() * 1000000),
   };

   addData(newUser);
};

function doubleMoney() {
   data = data.map((user) => {
      return { ...user, money: user.money * 2 };
   });

   updateDOM();
}

function sortByRichest() {
   data.sort((a, b) => b.money - a.money);
   updateDOM();
}

function filterMillion() {
   data = data.filter((user) => user.money > 1000000);
   updateDOM();
}

function getTotal() {
   const totalWealth = data.reduce((a, user) => (a += user.money), 0);
   const wealthElm = document.createElement("div");
   wealthElm.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
      totalWealth
   )}</strong></h3>`;
   main.appendChild(wealthElm);
}

function addData(obj) {
   data.push(obj);
   updateDOM();
}

// Updating the DOM
function updateDOM(provideData = data) {
   main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";
   provideData.forEach((item) => {
      const element = document.createElement("div");
      element.classList.add("person");
      element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
         item.money
      )}`;
      main.appendChild(element);
   });
}

function formatMoney(number) {
   return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Event Listeners
addUser.addEventListener("click", getRandomUser);
double.addEventListener("click", doubleMoney);
sort.addEventListener("click", sortByRichest);
million.addEventListener("click", filterMillion);
total.addEventListener("click", getTotal);

// Button Ripple Effect

const buttons = document.querySelectorAll(".ripple");

buttons.forEach((button) => {
   button.addEventListener("click", function (e) {
      const x = e.clientX;
      const y = e.clientY;

      const buttonTop = e.target.offsetTop;
      const buttonLeft = e.target.offsetLeft;

      const xInside = x - buttonLeft;
      const yInside = y - buttonTop;

      console.log(xInside);

      const circle = document.createElement("span");
      circle.classList.add("circle");
      circle.style.top = yInside + "px";
      circle.style.left = xInside + "px";

      this.appendChild(circle);

      setTimeout(() => circle.remove(), 500);
   });
});
