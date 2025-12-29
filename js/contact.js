
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