const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();

// GitHub Pages is static hosting, so this form opens WhatsApp with a pre-filled request.
// It does not store patient information on the website or confirm an appointment.
const form = document.getElementById("appointment-form");
const dateInput = form.elements.date;
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
dateInput.min = localToday;

form.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const message = [
    "Appointment request — UNIQUE VISION EYE CLINIC & OPTICALS",
    `Name: ${data.get("name")}`,
    `Mobile: ${data.get("phone")}`,
    `Preferred branch: ${data.get("branch")}`,
    `Preferred date: ${data.get("date")}`,
    `Service: ${data.get("service")}`,
    `Note: ${data.get("note") || "None"}`,
    "",
    "Please confirm availability. I understand this is a request, not a confirmed booking."
  ].join("\n");
  document.getElementById("form-status").textContent =
    "WhatsApp is opening with your appointment request. Press Send in WhatsApp to submit it to the clinic.";
  window.open(`https://wa.me/918555808382?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});
