// Grab message from the HTML element
const spinnerContainer = document.querySelector(".spinner-container");
const message = spinnerContainer.dataset.message;

// Redirect after 5 seconds (spinner duration)
setTimeout(() => {
  window.location.href = "/loginForm?message=" + encodeURIComponent(message);
},4000);
