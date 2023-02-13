let listPays = {
    "AED": "AE", "AFN": "AF", "XCD": "AG", "ALL": "AL",  "AMD": "AM", "ANG": "AN", "AOA": "AO", "AQD": "AQ", "ARS": "AR", "AUD": "AU",
    "AZN": "AZ", "BAM": "BA", "BBD": "BB", "BDT": "BD", "XOF": "BE", "BGN": "BG", "BHD": "BH", "BIF": "BI", "BMD": "BM", "BND": "BN",
    "BOB": "BO", "BRL": "BR", "BSD": "BS", "NOK": "BV", "BWP": "BW", "BYR": "BY", "BZD": "BZ", "CAD": "CA", "CDF": "CD", "XAF": "CF",
    "CHF": "CH", "CLP": "CL", "CNY": "CN", "COP": "CO", "CRC": "CR", "CUP": "CU", "CVE": "CV", "CYP": "CY", "CZK": "CZ", "DJF": "DJ",
    "DKK": "DK", "DOP": "DO", "DZD": "DZ", "ECS": "EC", "EEK": "EE", "EGP": "EG", "ETB": "ET", "EUR": "FR", "FJD": "FJ", "FKP": "FK",
    "GBP": "GB", "GEL": "GE", "GGP": "GG", "GHS": "GH", "GIP": "GI", "GMD": "GM", "GNF": "GN", "GTQ": "GT", "GYD": "GY", "HKD": "HK",
    "HNL": "HN", "HRK": "HR", "HTG": "HT", "HUF": "HU", "IDR": "ID", "ILS": "IL", "INR": "IN", "IQD": "IQ", "IRR": "IR", "ISK": "IS",
    "JMD": "JM", "JOD": "JO", "JPY": "JP", "KES": "KE", "KGS": "KG", "KHR": "KH", "KMF": "KM", "KPW": "KP", "KRW": "KR", "KWD": "KW",
    "KYD": "KY", "KZT": "KZ", "LAK": "LA", "LBP": "LB", "LKR": "LK", "LRD": "LR", "LSL": "LS", "LTL": "LT", "LVL": "LV", "LYD": "LY",
    "MAD": "MA", "MDL": "MD", "MGA": "MG", "MKD": "MK", "MMK": "MM", "MNT": "MN", "MOP": "MO", "MRO": "MR", "MTL": "MT", "MUR": "MU",
    "MVR": "MV", "MWK": "MW", "MXN": "MX", "MYR": "MY", "MZN": "MZ", "NAD": "NA", "XPF": "NC", "NGN": "NG", "NIO": "NI", "NPR": "NP",
    "NZD": "NZ", "OMR": "OM", "PAB": "PA", "PEN": "PE", "PGK": "PG", "PHP": "PH", "PKR": "PK", "PLN": "PL", "PYG": "PY", "QAR": "QA",
    "RON": "RO", "RSD": "RS", "RUB": "RU", "RWF": "RW", "SAR": "SA", "SBD": "SB", "SCR": "SC", "SDG": "SD", "SEK": "SE", "SGD": "SG",
    "SKK": "SK", "SLL": "SL", "SOS": "SO", "SRD": "SR", "STD": "ST", "SVC": "SV", "SYP": "SY", "SZL": "SZ", "THB": "TH", "TJS": "TJ",
    "TMT": "TM", "TND": "TN", "TOP": "TO", "TRY": "TR", "TTD": "TT", "TWD": "TW", "TZS": "TZ", "UAH": "UA", "UGX": "UG", "USD": "US", 
    "UYU": "UY", "UZS": "UZ", "VEF": "VE", "VND": "VN", "VUV": "VU", "YER": "YE", "ZAR": "ZA", "ZMK": "ZM", "ZWD": "ZW"
};
const dropDownList = document.querySelectorAll("#formCurrency select"),
    fromCurrency = document.querySelector(".fromCurrency select"),
    targetCurrency = document.querySelector(".targetCurrency select"),
    convertirButton = document.getElementById("convertir");

for (let i = 0; i < dropDownList.length; i++) {
    for (let codeDeDevise in listPays) {
        // selecting EUR by default as FROM currency and BDT as TO currency
        let selected = i == 0 ? codeDeDevise == "EUR" ? "selected" : "" : codeDeDevise == "BDT" ? "selected" : "";
        // creating option tag with passing currency code as a text and value
        let selectOption = `<option value="${codeDeDevise}" ${selected}>${codeDeDevise}</option>`;
        // inserting options tag inside select tag
        dropDownList[i].insertAdjacentHTML("beforeend", selectOption);
    }
    dropDownList[i].addEventListener("change", e => {
        loadDrapeu(e.target); // calling loadDrapeu with passing target element as an argument
    });
}

function loadDrapeu(element) {
    for (let code in listPays) {
        if (code == element.value) { // if currency code of country list is equal to option value
            let imgTag = element.parentElement.querySelector("img"); // selecting img tag of particular drop down list
            // passing country code of a selected currency code in a img url
            imgTag.src = `https://flagcdn.com/48x36/${listPays[code].toLowerCase()}.png`;
        }
    }
}

window.addEventListener("load", () => {
    exchangeRate();
});

convertirButton.addEventListener("click", e => {
    e.preventDefault(); //preventing form from submitting
    exchangeRate();
});

const changeIcon = document.querySelector("form .icon");
changeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value; // temporary currency code of FROM drop list
    fromCurrency.value = targetCurrency.value; // passing TO currency code to FROM currency code
    targetCurrency.value = tempCode; // passing temporary currency code to TO currency code
    loadDrapeu(fromCurrency); // calling loadDrapeu with passing select element (fromCurrency) of FROM
    loadDrapeu(targetCurrency); // calling loadDrapeu with passing select element (targetCurrency) of TO
    exchangeRate(); // calling exchangeRate
})

function exchangeRate() {
    const amount = document.querySelector(".formInput");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;
    // if user don't enter any value or enter 0 then we'll put 1 value by default in the input field
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Conversion en cours, veuillez patienter...";
    let url = `https://v6.exchangerate-api.com/v6/e7ee5980c20408e58333386f/latest/${fromCurrency.value}`;
    // fetching api response and returning it with parsing into js obj and in another then method receiving that obj
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[targetCurrency.value]; // getting user selected TO currency rate
        let totalExRate = (amountVal * exchangeRate).toFixed(2); // multiplying user entered value with selected TO currency rate
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${targetCurrency.value}`;
    }).catch(() => { // if user is offline or any other error occured while fetching data then catch function will run
        exchangeRateTxt.innerText = "Un problème est survenu, veuillez vérifier";
    });
}


