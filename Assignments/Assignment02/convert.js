window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
    // Get both the celsius and farenheit input boxes
    let celsiusBox = document.getElementById("cInput");
    let farenheitBox = document.getElementById("fInput");

    // Get the error box
    let errorMsg = document.getElementById("errorMessage");

    // Celsius input - clear farneheit when value is entered
    celsiusBox.addEventListener("input", function (e) {
        farenheitBox.value = "";
    });

    // Farenheit input - clear celsius when value is entered
    farenheitBox.addEventListener("input", function (e) {
        celsiusBox.value = "";
    });

    // Convert button
    let convertBtn = document.getElementById("convertButton");
    convertBtn.addEventListener("click", function(e) {
        // If there is a value for celsius, convert to farenheit
        // Else, if there is a value for farenheit, convert to celsius
        // Else, do nothing
        if (celsiusBox && celsiusBox.value) {
            // Compute the new value
            let newValue = parseFloat(celsiusBox.value);
            // Handle invalid input
            if (isNaN(newValue)) {
                errorMsg.textContent = celsiusBox.value + " is not a number";
                // End listener
                return;
            } else {
                errorMsg.textContent = "";
                // Convert to farenheit & assign it to the farenheit box
                farenheitBox.value = convertCtoF(newValue);
            }
        } else if (farenheitBox && farenheitBox.value) {
            // Compute the new value
            let newValue = parseFloat(farenheitBox.value);
            // Handle invalid input
            if (isNaN(newValue)) {
                errorMsg.textContent = farenheitBox.value + " is not a number";
                // End listener
                return;
            } else {
                errorMsg.textContent = "";
                // Convert to celsius & assign it to the celsius box
                celsiusBox.value = convertFtoC(newValue);
            }
        }

        // Get the image object based off id
        let weatherImage = document.getElementById("weatherImage");
        // Change the image shown based on the following:
        // Below 32 F --> cold.png
        // Between 32 and 50 F --> cool.png
        // Above 50 F --> warm.png
        if (farenheitBox.value < 32) {
            weatherImage.src = "images/cold.png";
        } else if (farenheitBox.value > 50) {
            weatherImage.src = "images/warm.png";
        } else {
            weatherImage.src = "images/cool.png";
        }
    });
}

function convertCtoF(degreesCelsius) {
   return (degreesCelsius * (9 / 5)) + 32;
}

function convertFtoC(degreesFahrenheit) {
   return (degreesFahrenheit - 32) * (5 / 9);
}
