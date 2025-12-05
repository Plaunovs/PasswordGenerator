import { GeneratePassword } from "../wailsjs/go/app/App";

console.log("main.js loaded");

window.addEventListener("DOMContentLoaded", () => {

    const generateBtn = document.getElementById("generateBtn");
    const resultBox = document.getElementById("result");
    const toggleVisibility = document.getElementById("toggleVisibility");

    let lastPassword = "";
    let passwordVisible = true;

    toggleVisibility.addEventListener("click", () => {

        if (!lastPassword) return;

        passwordVisible = !passwordVisible;

        if (passwordVisible) {
            resultBox.innerText = lastPassword;
            toggleVisibility.textContent = "👁";
        } else {
            resultBox.innerText = "●".repeat(lastPassword.length);
            toggleVisibility.textContent = "👁";
        }
    });

    const lengthInput = document.getElementById("lengthInput");
    const digitsCheckbox = document.getElementById("digitsCheckbox");
    const lowerCheckbox = document.getElementById("lowerCheckbox");
    const upperCheckbox = document.getElementById("upperCheckbox");

    generateBtn.addEventListener("click", () => {

        const lengthText = lengthInput.value.trim();

        if (lengthText === "") {
            resultBox.innerText = "Please enter a password length!";
            return;
        }

        const length = parseInt(lengthText);

        if (isNaN(length) || length <= 0) {
            resultBox.innerText = "Length must be a positive number!";
            return;
        }

        const digits = digitsCheckbox.checked;
        const lower = lowerCheckbox.checked;
        const upper = upperCheckbox.checked;

        if (!digits && !lower && !upper) {
            resultBox.innerText = "Please select at least one option!";
            return;
        }

        GeneratePassword(length, digits, lower, upper)
            .then(result => {
                lastPassword = result;
                passwordVisible = false;
                resultBox.innerText = "●".repeat(result.length);
                toggleVisibility.textContent = "👁";
            })
            .catch(err => {
                resultBox.innerText = "Backend error!";
                console.error(err);
            });

    });

});
