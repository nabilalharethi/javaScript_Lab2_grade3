
// contact form validation system , this will handle client-side validation for the contact form



console.log("Contact form validation script loaded.");


//store refrence to all form elements

const contactForm = document.getElementById("contactForm");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const subjectInput = document.getElementById("subject");
const messgeTextarea = document.getElementById("message");
const clearButton = document.getElementById("clearButton");
const successMessage = document.getElementById("successMessage");
const successNameSpan = document.getElementById("successName");
const charCount = document.getElementById("charCount");

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
//test function

console.log("testing validateEmail()");
console.log(isValidEmail("nabil@example.com")); //true
console.log(isValidEmail("invalid.email")); //false
console.log(isValidEmail(" user@domain")); //false

//function that validate a name (first or last)

function isValidName(name) {
    const nameRegex = /^[a-zA-Z'-]{2,30}$/;
    return nameRegex.test(name.trim());
}

//test function

console.log("testing validateName()");
console.log(isValidName("Nabil")); //true
console.log(isValidName("A")); //false
console.log(isValidName("O'Connor")); //true
console.log(isValidName("Mary-Jane")); //true
console.log(isValidName("John123")); //false    

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
//test function
console.log("testing validatePhone()");
console.log(isValidPhone("+1 (555) 123-4567")); //true
console.log(isValidPhone("555-1234")); //true
console.log(isValidPhone("invalid-phone")); //false
console.log(isValidPhone("")); //true (optional field)

//displays error message below a field

function showError(inputElement, Message) {
    const errorElement = document.getElementById('${inputElement.id}-error');
    errorElement.textContent = Message;
    errorElement.style.display = "block";

    //add eror style to input field
    inputElement.classList.add("error");
    inputElement.classList.remove("success");
}

//test showError function
console.log("testing showError()");
showError(firstNameInput, "First name is required.");

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

//test updateCharCount function
console.log("testing updateCharCount()");
messgeTextarea.value = "Hello, this is a test message.";
updateCharCount();
messgeTextarea.value = "Short msg";
updateCharCount();


//event listener for message textarea input to update char count
messgeTextarea.addEventListener("input", updateCharCount);
//initial char count update
updateCharCount();

//test clearError function
console.log("testing clearError()");
clearError(firstNameInput); //should clear error message and styles

//first name validation on blur
firstNameInput.addEventListener("blur", () => {
    if (firstNameInput.value.trim() === "") {
        if(!isValidName(firstNameInput.value)) {
            showError(firstNameInput, "First name must be 2-30 alphabetic characters.");
        }else {
            clearError(firstNameInput);
        }
    
    }
});

//test first name blur event
console.log("testing firstNameInput blur event");
firstNameInput.value = "A"; //invalid
firstNameInput.dispatchEvent(new Event("blur")); //should show error
firstNameInput.value = "Nabil"; //valid
firstNameInput.dispatchEvent(new Event("blur")); //should clear error
firstNameInput.value = ""; //empty
firstNameInput.dispatchEvent(new Event("blur")); //should show required error

//last name validation on blur
lastNameInput.addEventListener("blur", () => {
    if (lastNameInput.value.trim() === "") { 
        if(!isValidName(lastNameInput.value)) {
            showError(lastNameInput, "Last name must be 2-30 alphabetic characters.");
        }else {
            clearError(lastNameInput);
        }
    }
});

//test last name blur event
console.log("testing lastNameInput blur event");
lastNameInput.value = "B"; //invalid
lastNameInput.dispatchEvent(new Event("blur")); //should show error
lastNameInput.value = "Smith";
lastNameInput.dispatchEvent(new Event("blur")); //should clear error
lastNameInput.value = ""; //empty
lastNameInput.dispatchEvent(new Event("blur")); //should show required error

//email validation on blur
emailInput.addEventListener("blur", () => {
    if (emailInput.value.trim() === "") {
        if(!isValidEmail(emailInput.value)) {
            showError(emailInput, "Please enter a valid email address.");
        }else {
            clearError(emailInput);
        }  
    }
});

//test email blur event
console.log("testing emailInput blur event");
emailInput.value = "invalid-email"; //invalid
emailInput.dispatchEvent(new Event("blur")); //should show error

//message validation on blur
messgeTextarea.addEventListener("blur", () => {
    if (messgeTextarea.value.trim() === "") {
        if(!isValidMessage(messgeTextarea.value)) {
            showError(messgeTextarea, "Message must be at least 20 characters long.");
        }else {
            clearError(messgeTextarea);
        }
    }
});

//test message blur event
console.log("testing messgeTextarea blur event");
messgeTextarea.value = "Short msg"; //invalid
messgeTextarea.dispatchEvent(new Event("blur")); //should show error   

//phone validation on blur
phoneInput.addEventListener("blur", () => {
    if (phoneInput.value.trim() !== "") {
        if(!isValidPhone(phoneInput.value)) { 
            showError(phoneInput, "Please enter a valid phone number.");
        }else {
            clearError(phoneInput);
        } 
    }
});

//test phone blur event
console.log("testing phoneInput blur event");
phoneInput.value = "invalid-phone"; //invalid
phoneInput.dispatchEvent(new Event("blur")); //should show error

