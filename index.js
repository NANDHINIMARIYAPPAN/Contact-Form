
function checkRadio(radio) {
    if (radio.value === "1") {
        document.getElementById("generalEnquiry").checked = false;
        document.getElementById("supportRequest").checked = true;
        document.getElementById("support").style.background = "var(--Light-Green)";
        document.getElementById("general").style.background = "";
    }
    if (radio.value === "2") {
        document.getElementById("generalEnquiry").checked = true;
        document.getElementById("supportRequest").checked = false;
        document.getElementById("general").style.background = "var(--Light-Green)";
        document.getElementById("support").style.background = "";
    }
}

function validateField(input) {
    var fieldValue = input.value;
    var fieldName = input.name;

    if (fieldName == "firstName" || fieldName == "lastName" || fieldName == "message") {
        var validationError = document.getElementById(fieldName + "Error");
        if (fieldValue.trim() === "") {
            input.classList.add("invalid");
            validationError.textContent = "This field is required";
        } else {
            validationError.textContent = "";
            input.classList.remove("invalid");
        }
    }

    if (fieldName == "email") {
        var emailValidationError = document.getElementById("emailError");
        if (fieldValue.trim() === "") {
            input.classList.add("invalid");
            emailValidationError.textContent = "Please enter an email address";
        } else {
            input.classList.add("invalid");
            emailValidationError.textContent = "";
            let emailValid = (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/).test(fieldValue);
            var emailValidationError = document.getElementById("emailErrors");
            if (!emailValid) {
                input.classList.add("invalid");
                emailValidationError.textContent = "Please enter a valid email address";
            } else {
                input.classList.remove("invalid");
                emailValidationError.textContent = "";
            }
        }
    }

    if (fieldName == "consent") {
        var radioError = document.getElementById("radioError");
        if (!input.checked) {
            input.classList.add("invalid");
            radioError.textContent = "To submit this form, please consent to being contacted";
        } else {
            radioError.textContent = "";
            input.classList.remove("invalid");
        }
    }
    if (fieldName == "supportRequest" || fieldName == "generalEnquiry") {
        var validationError = document.getElementById("queryError");
        validationError.textContent = "";
        var radioInputs = document.getElementById("supportRequest").checked;
        var radioInputs1 = document.getElementById("generalEnquiry").checked;
        if (!radioInputs && !radioInputs1) {
            validationError.textContent = "Please select an option";
        } else {
            validationError.textContent = "";
        }
    }
}

function validateForm() {
    var inputs = document.forms["contactForm"].querySelectorAll("input, textarea, checkbox , radio");
    var isValid = true;
    for (var i = 0; i < inputs.length; i++) {
        validateField(inputs[i]);
        if (inputs[i].classList.contains("invalid")) {
            isValid = false;
        }
    }
    if (!isValid) {
        return false;
    }
    isValid = true;
    return true;

}


function validateAndSubmitForm() {
    var isValid = validateForm()
    if (isValid) {
        console.log("Form submitted successfully");
        var inputs = document.forms["contactForm"].querySelectorAll("input, textarea, checkbox , radio");
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
            document.getElementById("general").style.background = "";
            document.getElementById("support").style.background = "";
            inputs[i].checked = false;
        }
        let successMessage = document.getElementById("messageSent");
        let mainDiv = document.createElement("div");
        mainDiv.classList = "message";
        mainDiv.style.fontFamily = "var(--font-family)";
        let div1 = document.createElement("div");
        let div2 = document.createElement("div");
        div1.classList = "d-flex flex-column justify-content-end align-items-start flex-row-reverse gap-3";
        div2.textContent = "Thanks for completing the form. We'll be in touch soon!";
        let img = document.createElement("img");
        img.classList = "img-fluid pt-1 ";
        img.src = "/assets/images/icon-success-check.svg";
        let p = document.createElement("p");
        p.textContent = "Message Sent!";
        div1.appendChild(p);
        div1.appendChild(img);
        mainDiv.appendChild(div1);
        mainDiv.appendChild(div2);
        successMessage.appendChild(mainDiv);
    }

}

