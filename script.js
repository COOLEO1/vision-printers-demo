const BUSINESS_WHATSAPP = "265999277733";
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const modal = document.getElementById("quoteModal");
const form = document.getElementById("quoteForm");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));
}

function openModal() {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
document.querySelectorAll("[data-quote]").forEach(button => button.addEventListener("click", openModal));
document.querySelectorAll("[data-close-modal]").forEach(button => button.addEventListener("click", closeModal));
document.addEventListener("keydown", event => { if (event.key === "Escape" && modal.classList.contains("open")) closeModal(); });

document.querySelectorAll("[data-pick-service]").forEach(button => button.addEventListener("click", () => {
  const select = form.elements.service;
  select.value = button.dataset.pickService;
  closeModal();
  document.getElementById("contact").scrollIntoView({behavior:"smooth"});
  setTimeout(() => form.elements.name.focus({preventScroll:true}), 500);
}));
document.querySelectorAll("[data-service]").forEach(link => link.addEventListener("click", () => {
  const select = form.elements.service;
  if (select) select.value = link.dataset.service;
}));

form.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const message = [
    "Hello Vision Printers, I'd like to request a quotation.",
    "",
    "Name: " + data.get("name"),
    "Phone: " + data.get("phone"),
    "Service: " + data.get("service"),
    "Project details: " + data.get("details"),
    "",
    "Please let me know the next steps. Thank you."
  ].join("\n");
  const url = "https://wa.me/" + BUSINESS_WHATSAPP + "?text=" + encodeURIComponent(message);
  window.open(url, "_blank", "noopener,noreferrer");
  const feedback = form.querySelector(".form-feedback");
  feedback.textContent = "WhatsApp is opening with your enquiry. Please press Send in WhatsApp to deliver it.";
});

document.getElementById("year").textContent = new Date().getFullYear();