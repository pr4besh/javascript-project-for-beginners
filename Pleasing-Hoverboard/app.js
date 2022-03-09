const container = document.getElementById("container");
const squares = 10000;

function generateHex() {
   let hexValue = "#";

   while (hexValue.length < 7) {
      hexValue += Math.round(Math.random() * 15).toString(16);
   }

   return hexValue;
}

for (let i = 0; i < squares; i++) {
   const square = document.createElement("div");
   square.classList.add("square");
   square.addEventListener("mouseover", () => setColor(square));
   square.addEventListener("click", () => removeColor(square));
   container.appendChild(square);
}

function setColor(element) {
   let color = generateHex();
   element.style.backgroundColor = color;
   element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function removeColor(element) {
   element.style.backgroundColor = "#1d1d1d";
   element.style.boxShadow = "0 0 2px #000";
}
