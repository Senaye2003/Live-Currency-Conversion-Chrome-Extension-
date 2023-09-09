// Get references to HTML elements
const amount = document.getElementById("amount"); // Input field for amount
const currency = document.getElementById("currency"); // Dropdown for currency selection
const convert = document.getElementById("convert"); // Button to trigger currency conversion
const result = document.getElementById("result"); // Display the conversion result here

// Define your API key
const API_KEY = "xGV/vd8qKIWGA/+DOmY1rw==s9WVoAx8oblBDAI4";

// Define the API URL for currency exchange rate data
const apiURL = "https://api.api-ninjas.com/v1/exchangerate?pair=USD_";

// Add a click event listener to the "convert" button
convert.addEventListener('click', () => {
    console.log('hi'); // Log a message to the console when the button is clicked

    // Get the user-entered amount and selected currency
    const amountTotal = amount.value;
    const currencyTotal = currency.value;

    // Construct the complete API URL with the selected currency
    const url = apiURL + currencyTotal;
    console.log('url', url); // Log the API URL to the console

    // Make a fetch request to the API with your API key
    fetch(url, {
        headers: {
            'X-API-KEY': API_KEY // Include your API key in the request headers
        }
    })
    .then(response => response.json()) // Parse the API response as JSON
    .then(data => {
        // Retrieve the exchange rate from the API response
        const rate = data.exchange_rate;

        // Calculate the converted result
        const resultPrice = amountTotal * rate;

        console.log('result', resultPrice); // Log the result to the console

        // Update the result element with the conversion result
        result.innerHTML = `${amountTotal} ${currencyTotal} = ${resultPrice.toFixed(2)} USD`;
    })
    .catch(error => {
        // Handle any errors that occur during the fetch request
        console.error('Request fail:', error); // Log the error to the console
        result.innerHTML = 'An error occurred, please try again later.'; // Display an error message
    });
});
