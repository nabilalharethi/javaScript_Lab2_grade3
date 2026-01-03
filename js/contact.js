
// contact form validation system , this will handle client-side validation for the contact form



console.log("Contact form validation script loaded.");


//store refrence to all form elements

const contactForm = document.getElementById("contact-form");
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const subjectInput = document.getElementById("subject");
const messgeTextarea = document.getElementById("message");
const clearButton = document.getElementById("reset-button");
const successMessage = document.getElementById("success-message");
const successNameSpan = document.getElementById("successName");
const charCount = document.getElementById("char-counter");

console.log("All form elements referenced.:", {
    form: contactForm,
    firstName: firstNameInput,
    lastName: lastNameInput,
});

//function to validate email format

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
}


//function that validate a name (first or last)

function isValidName(name) {
    const nameRegex = /^[a-zA-Z'-]{2,30}$/;
    return nameRegex.test(name.trim());
}

//function to validate message length

function isValidMessage(message) {
    return message.trim().length >= 20;
}

console.log("testing validateMessage()");
console.log(isValidMessage("This is a valid message.")); //true
console.log(isValidMessage("Too short")); //false


//function to validate phone number format
function isValidPhone(phone) {
    if (phone.trim() === "") return true; //phone is optional
    const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;
    return phoneRegex.test(phone.trim());
}


//displays error message below a field

function showError(inputElement, Message) {
    const errorElement = document.getElementById(`${inputElement.id}-error`);
    errorElement.textContent = Message;
    errorElement.style.display = "block";

    //add eror style to input field
    inputElement.classList.add("error");
    inputElement.classList.remove("success");
}



//function to clear error message
function clearError(inputElement) {
    const errorElement = document.getElementById(`${inputElement.id}-error`);
    //clear error message
    errorElement.textContent = "";
    errorElement.style.display = "none";
    //remove error style from input field
    inputElement.classList.remove("error");

    //add success style
    if (inputElement.value.trim() !== "") {
        inputElement.classList.add("success");
    }
}

//function to update character count for message textarea
function updateCharCount() {
    const currentLength = messgeTextarea.value.length;
    charCount.textContent = `${currentLength}/20 characters`;

    //change color based on length
    if (currentLength < 20) {
        charCount.classList.remove("success-count");
        charCount.classList.add("error-count");
    } else {
        charCount.classList.remove("error-count");
        charCount.classList.add("success-count");
    }
}



//event listener for message textarea input to update char count
messgeTextarea.addEventListener("input", updateCharCount);
//initial char count update
updateCharCount();


//first name validation on blur
firstNameInput.addEventListener("blur", () => {
    if (firstNameInput.value.trim() === "") {
        showError(firstNameInput, "First name is required.");
        isFormValid = false;
    } else if(!isValidName(firstNameInput.value)) {
        showError(firstNameInput, "First name must be 2-30 alphabetic characters.");
        isFormValid = false;
    } else {
        clearError(firstNameInput);
    }
});



//last name validation on blur
lastNameInput.addEventListener("blur", () => {
    if (lastNameInput.value.trim() === "") { 
        showError(lastNameInput, "Last name is required.");
        isFormValid = false;
    } else if(!isValidName(lastNameInput.value)) {
        showError(lastNameInput, "Last name must be 2-30 alphabetic characters.");
        isFormValid = false;
    } else {
        clearError(lastNameInput);
    }
});



//email validation on blur
emailInput.addEventListener("blur", () => {
    if (emailInput.value.trim() === "") {
        showError(emailInput, "Email is required.");
        isFormValid = false;
    } else if(!isValidEmail(emailInput.value)) {
        showError(emailInput, "Please enter a valid email address.");
        isFormValid = false;
    } else {
        clearError(emailInput);
    }
});



//message validation on blur
messgeTextarea.addEventListener("blur", () => {
    if (messgeTextarea.value.trim() === "") {
        showError(messgeTextarea, "Message is required.");
        isFormValid = false;
    } else if(!isValidMessage(messgeTextarea.value)) {
        showError(messgeTextarea, "Message must be at least 20 characters long.");
        isFormValid = false;
    } else {
        clearError(messgeTextarea);
    }
});



//phone validation on blur
phoneInput.addEventListener("blur", () => {
    
    if(!isValidPhone(phoneInput.value)) { 
        showError(phoneInput, "Please enter a valid phone number.");
    } else {
        clearError(phoneInput);
    }
});



//Vadite all form fields at once, return true if all valid
function validateForm() {
    let isFormValid = true;

    //first name validation
    if (!isValidName(firstNameInput.value)) {
        showError(firstNameInput, "First name must be 2-30 alphabetic characters.");
        isFormValid = false;
    } else {
        clearError(firstNameInput);
    }
    //last name validation
    if (!isValidName(lastNameInput.value)) {
        showError(lastNameInput, "Last name must be 2-30 alphabetic characters.");
        isFormValid = false;
    } else {
        clearError(lastNameInput);
    }
    //email validation
    if (!isValidEmail(emailInput.value)) {
        showError(emailInput, "Please enter a valid email address.");
        isFormValid = false;
    } else {
        clearError(emailInput);
    }
    //message validation
    if (!isValidMessage(messgeTextarea.value)) {
        showError(messgeTextarea, "Message must be at least 20 characters long.");
        isFormValid = false;
    } else {
        clearError(messgeTextarea);
    }
    //phone validation
    if (!isValidPhone(phoneInput.value)) {
        showError(phoneInput, "Please enter a valid phone number.");
        isFormValid = false;
    }
    else {
        clearError(phoneInput);
    }
    return isFormValid;
}  



//form submit event handler
contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); //prevent default form submission
    if (validateForm()) {

        const firstName = firstNameInput.value.trim();
        showSuccessMessage(firstName);
        clearForm();

    } else {
        console.log("Form is invalid. Please correct the errors and try again.");
        
        const firstError = contactForm.querySelector(".error");
        if (firstError) {
            firstError.scrollIntoView({ behavior: "smooth" , block: "center" });
        }
    }   
});

//show success message function

function showSuccessMessage(firstName) {
    successNameSpan.textContent = firstName;
    successMessage.style.display = "block";
    

    //scroll to success message
    successMessage.scrollIntoView({ behavior: "smooth", block: "center" });

    //hide success message after 3 seconds
    setTimeout(() => {
        successMessage.style.display = "none";
    }, 3000);
}


//clear all form fields aftet successful submission

function clearForm() {
    contactForm.reset();

    const allInputs = [firstNameInput, lastNameInput, emailInput, phoneInput, subjectInput, messgeTextarea];
    allInputs.forEach((input) => {
        input.classList.remove("error", "success");
        clearError(input);
    });

    //reset char count
    updateCharCount();
}   

//clear button event listener
clearButton.addEventListener("click", () => {
    clearForm();

});