const currencyRates = { usd: 1 };
const fromCurrencySelect = document.querySelector(".currency-app #fromCurrency");
const toCurrencySelect = document.querySelector(".currency-app #toCurrency");
const inputAmount = document.querySelector(".currency-app .input-amount");
const resultElement = document.querySelector(".currency-app .result");
const swapButton = document.querySelector(".currency-app .swap-btn");

// Fetch exchange rates data and initialize the converter
const initializeConverter = async () => {
  try {
    const response = await fetch(`http://www.floatrates.com/daily/usd.json`);
    const data = await response.json();

    if (response.ok) {
      for (const currencyCode in data) {
        const currencyInfo = data[currencyCode];
        const { code, name } = currencyInfo;

        // Update exchange rates and populate select options
        currencyRates[currencyCode] = currencyInfo.rate;

        const optionFrom = document.createElement("option");
        optionFrom.value = code;
        optionFrom.textContent = `${code} - ${name}`;

        const optionTo = optionFrom.cloneNode(true);

        fromCurrencySelect.appendChild(optionFrom);
        toCurrencySelect.appendChild(optionTo);
      }

      toCurrencySelect.value = toCurrencySelect.options[1].value;
      convertCurrency();
    }
  } catch (error) {
    console.log("Error loading currency data");
  }
};

// Initial call to initialize the converter
initializeConverter();

// Convert currency based on user input
const convertCurrency = () => {
  const inputValue = parseFloat(inputAmount.value);
  const fromCurrencyValue = fromCurrencySelect.value.toLowerCase();
  const toCurrencyValue = toCurrencySelect.value.toLowerCase();

  const convertedValue =
    (inputValue * currencyRates[toCurrencyValue]) / currencyRates[fromCurrencyValue];

  // Display the result or "Invalid Input" if the input is not valid
  const resultValue = `<span class='result-currency'>${toCurrencyValue}</span> ${convertedValue.toFixed(2)}`;
  resultElement.innerHTML = isNaN(convertedValue) ? "Invalid Input" : resultValue;
};

// Event listeners for input changes
toCurrencySelect.addEventListener("change", convertCurrency);
fromCurrencySelect.addEventListener("change", convertCurrency);
inputAmount.addEventListener("input", convertCurrency);

// Swap button functionality
swapButton.addEventListener("click", () => {
  const fromCurrencyValue = fromCurrencySelect.value;
  const toCurrencyValue = toCurrencySelect.value;

  // Swap selected currencies
  fromCurrencySelect.value = toCurrencyValue;
  toCurrencySelect.value = fromCurrencyValue;

  // Trigger conversion with the new currencies
  convertCurrency();
});
