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
let currentLanguage="en";
const languageToggle=document.getElementById("languageToggle");
function setLanguage(language){
  currentLanguage=language;
  document.documentElement.lang=language==="ny"?"ny":"en";
  document.querySelectorAll("[data-en][data-ny]").forEach(element=>{
    element.innerHTML=element.dataset[language];
  });
  if(languageToggle){
    languageToggle.innerHTML=language==="en"?"<span class='lang-active'>EN</span><span> / </span><span>CHI</span>":"<span>EN</span><span> / </span><span class='lang-active'>CHI</span>";
    languageToggle.setAttribute("aria-label",language==="en"?"Switch to Chichewa":"Switch to English");
  }
  const name=document.querySelector('input[name="name"]');
  const details=document.querySelector('textarea[name="details"]');
  if(name)name.placeholder=language==="en"?"Your full name":"Dzina lanu lonse";
  if(details)details.placeholder=language==="en"?"Your requirements or questions...":"Fotokozani zomwe mukufuna kapena mafunso anu...";
  const title=document.querySelector("title");
  if(title)title.textContent=language==="en"?"Pyramids Development & Investments | Transform Your Space":"Pyramids Development & Investments | Kongoletsani Malo Anu";
}
if(languageToggle)languageToggle.addEventListener("click",()=>setLanguage(currentLanguage==="en"?"ny":"en"));
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
      "PYRAMIDS DEVELOPMENT & INVESTMENTS LTD — PROJECT ENQUIRY",
      "",
      (currentLanguage==="en"?"Name: ":"Dzina: ")+data.get("name"),
      (currentLanguage==="en"?"Area of interest: ":"Zomwe mukufuna: ")+data.get("interest"),
      (currentLanguage==="en"?"Project details: ":"Zambiri za ntchito: ")+data.get("details"),
      "",
      "Prepared from the Pyramids website concept."
    ].join("\n");
    try{
      await navigator.clipboard.writeText(message);
      feedback.textContent=currentLanguage==="en"?"Your enquiry has been copied. Paste it into a message when contacting Pyramids.":"Uthenga wanu wakopedwa. Mutha kuuyika mu meseji mukamalumikizana ndi Pyramids.";
      notify(currentLanguage==="en"?"Enquiry copied.":"Uthenga wakopedwa.");
    }catch(error){
      feedback.textContent=currentLanguage==="en"?"Copy was unavailable. Please copy your enquiry manually.":"Kukopera sikunathe. Chonde koperani uthenga wanu nokha.";
      notify(currentLanguage==="en"?"Please copy your enquiry manually.":"Chonde koperani uthenga wanu nokha.");
    }
  });
}
const year=document.getElementById("year");
if(year)year.textContent=new Date().getFullYear();
