const menuToggle=document.querySelector(".menu-toggle");
const nav=document.querySelector(".nav");
if(menuToggle&&nav){
  menuToggle.addEventListener("click",()=>{
    const open=nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded",String(open));
    menuToggle.setAttribute("aria-label",open?"Close navigation":"Open navigation");
  });
  nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded","false");
  }));
}
const form=document.getElementById("enquiryForm");
const feedback=document.getElementById("formFeedback");
const toast=document.getElementById("toast");
function notify(message){
  if(!toast)return;
  toast.textContent=message;
  toast.classList.add("show");
  window.setTimeout(()=>toast.classList.remove("show"),3200);
}
if(form){
  form.addEventListener("submit",async event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    const data=new FormData(form);
    const message=[
      "PYRAMIDS DEVELOPMENT & INVESTMENTS — PROJECT ENQUIRY",
      "",
      "Name: "+data.get("name"),
      "Area of interest: "+data.get("interest"),
      "Project details: "+data.get("details"),
      "",
      "Prepared from the Pyramids website concept."
    ].join("\n");
    try{
      await navigator.clipboard.writeText(message);
      feedback.textContent="Your enquiry has been copied. You can paste it into a message when contacting the Pyramids team.";
      notify("Enquiry copied. Paste it into your preferred messaging app.");
    }catch(error){
      feedback.textContent="Copy was unavailable in this browser. Select and copy the details you entered, then contact the Pyramids team.";
      notify("Please copy your enquiry manually.");
    }
  });
}
const year=document.getElementById("year");
if(year)year.textContent=new Date().getFullYear();
