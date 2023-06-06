// let rand = document.getElementById('rand')
// let dollar = document.getElementById('dollar')

// rand.oninput = function() {
//     let d = (parseFloat(rand.value) * 0.052);
//     dollar.value = parseFloat(d.toFixed(4));
// }

// dollar.oninput = function() {
//     let r = (parseFloat(dollar.value) * 19.40);
//     rand.value = parseFloat(r.toFixed(4));

// }


//Declaring a variable with your api key stored in that variable
const apiKey = "ee2f2ec90dde9ebd8942b3bf";

//fetching the information
fetch(`https://v6.exchangerate-api.com/v6/ee2f2ec90dde9ebd8942b3bf/codes`)
.then((response) => response.json())
.then ((data) => {
    const {supported_codes} = data;
    const selectElements = document.querySelectorAll("select");

    supported_codes.forEach((code) => {
        const optionElement = document.createElement("option");
        optionElement.value = code.slice(0,1);
        optionElement.text = code.slice(0,1);

        selectElements.forEach((select) => {
            select.appendChild(optionElement.cloneNode(true));

        });
    });
})
.catch((error) => {
    console.log("Error fetching currency options:", error);
})

function conversion() {
    const inputCurrency = document.getElementById("input-currency")
    const selectFrom = document.getElementById("selectFrom").value
    const selectTo = document.getElementById("selectTo").value
    const displayConversion = document.getElementById("displayConversion")

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${selectFrom}/${selectTo}`)
    .then(response => response.json())
    .then(data => {
        const {conversion_rate} = data;
        const amountConverted = (inputCurrency.value * conversion_rate).toFixed(2);

        displayConversion.innerHTML = `${inputCurrency.value}
        ${selectFrom} = ${amountConverted} ${selectTo}`
    })

    .catch(error => {
        console.log("Error fetching exchange rate:", error);
    })
}

const convertBtn = document.getElementById("convertbtn")
convertBtn.addEventListener('click', conversion)