const fromAmountElement = document.querySelector('.amount');
const convertedAmountElement = document.querySelector('.convertedAmount');
const fromCurrancyElement = document.querySelector('.fromCurrancy');
const toCurrancyElement = document.querySelector('.toCurrancy');
const resultElement = document.querySelector('.result');
const convertorContainer = document.querySelector('.convertor-container');

// Array to populate the select tags with these countries

const countries = [
    { code: "AFA", name: "Afghan Afghani", },
    { code: "AUD", name: "Australian Dollar", },
    { code: "BHD", name: "Bahraini Dinar", },
    { code: "BDT", name: "Bangladeshi Taka", },
    { code: "GBP", name: "British Pound Sterling", },
    { code: "CAD", name: "Canadian Dollar", },
    { code: "CNY", name: "Chinese Yuan", },
    { code: "COP", name: "Colombian Peso", },
    { code: "CUC", name: "Cuban Convertible Peso", },
    { code: "XCD", name: "East Caribbean Dollar", },
    { code: "EGP", name: "Egyptian Pound", },
    { code: "EUR", name: "Euro", },
    { code: "HKD", name: "Hong Kong Dollar", },
    { code: "INR", name: "Indian Rupee", },
    { code: "IDR", name: "Indonesian Rupiah", },
    { code: "IRR", name: "Iranian Rial", },
    { code: "IQD", name: "Iraqi Dinar", },
    { code: "ITL", name: "Italian Lira", },
    { code: "JPY", name: "Japanese Yen", },
    { code: "KWD", name: "Kuwaiti Dinar", },
    { code: "MYR", name: "Malaysian Ringgit", },
    { code: "MXN", name: "Mexican Peso", },
    { code: "MAD", name: "Moroccan Dirham", },
    { code: "NPR", name: "Nepalese Rupee", },
    { code: "ANG", name: "Netherlands Antillean Guilder", },
    { code: "NZD", name: "New Zealand Dollar", },
    { code: "KPW", name: "North Korean Won", },
    { code: "OMR", name: "Omani Rial", },
    { code: "PKR", name: "Pakistani Rupee", },
    { code: "QAR", name: "Qatari Rial", },
    { code: "RUB", name: "Russian Ruble", },
    { code: "SAR", name: "Saudi Riyal", },
    { code: "SGD", name: "Singapore Dollar", },
    { code: "ZAR", name: "South African Rand", },
    { code: "KRW", name: "South Korean Won", },
    { code: "LKR", name: "Sri Lankan Rupee", },
    { code: "TRY", name: "Turkish Lira", },
    { code: "AED", name: "United Arab Emirates Dirham", },
    { code: "USD", name: "US Dollar", },
    { code: "YER", name: "Yemeni Rial", },
    { code: "ZWL", name: "Zimbabwean dollar" }
];
//Showing countries from array to select tag
countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country.code;
    option.textContent = `${country.code} (${country.name})`;
    fromCurrancyElement.add(option);
});
//Repeat same thing for the other dropdown
countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country.code;
    option.text = `${country.code} (${country.name})`;
    toCurrancyElement.add(option);

    fromCurrancyElement.value = "USD";
    toCurrancyElement.value = "INR";
});

//   functions to get exchange rate by API
const getExchangeRate = async () => {
    const amount = parseFloat(fromAmountElement.value);
    const fromCurrancy = fromCurrancyElement.value;
    const toCurrancy = toCurrancyElement.value;
    resultElement.textContent = "Fetching Exchange Rates..!";

    try {
        //   Fetch data from API
        const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrancy}`);
        const data = await response.json();

        const conversionRate = data.rates[toCurrancy];
        const convertedAmount = (amount * conversionRate).toFixed(2);
        if (typeof conversionRate == 'undefined') {
            resultElement.textContent = "Exchange rate data is not available for selected country";
            convertedAmountElement = "";
        }
        else {
            convertedAmountElement.value = convertedAmount;
            resultElement.textContent = `${amount} ${fromCurrancy} = ${convertedAmount} ${toCurrancy}`;
        }
    }
    catch (error) {
        convertorContainer.innerHTML = `<h2>Error while fetching exchange rates !</h2>`
    }

};
// Fetching exchange rate when user inputs the amount
fromAmountElement.addEventListener('input', getExchangeRate);

// Fetching exchange rate when user change the amount
fromAmountElement.addEventListener('change', getExchangeRate);
toCurrancyElement.addEventListener('change', getExchangeRate);
window.addEventListener('load', getExchangeRate);