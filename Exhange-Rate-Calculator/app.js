const currency1 = document.querySelector("#currency-one");
const currency2 = document.querySelector("#currency-two");
const amount1 = document.querySelector("#amount-one");
const amount2 = document.querySelector("#amount-two");

const rateElem = document.querySelector("#rate");
const swap = document.querySelector("#swap");

// Fetch exchange rate and update the DOM
const calculate = () => {
   const currency_one = currency1.value;
   const currency_two = currency2.value;

   fetch(
      `https://v6.exchangerate-api.com/v6/dc58c17bac68b4926ef7045a/latest/${currency_one}`
   )
      .then((res) => res.json())
      .then((data) => {
         const rate = data.conversion_rates[currency_two];
         rateElem.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
         amount2.value = (amount1.value * rate).toFixed(2);
      });
};

// event listeners
currency1.addEventListener("change", calculate);
currency2.addEventListener("change", calculate);
amount1.addEventListener("input", calculate);
amount2.addEventListener("input", calculate);

swap.addEventListener("click", () => {
   const temp = currency1.value;
   currency1.value = currency2.value;
   currency2.value = temp;
   calculate();
});
