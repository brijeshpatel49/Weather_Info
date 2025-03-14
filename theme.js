let darkMode = localStorage.getItem("darkMode");

const theme=document.getElementById("theme");

const enableDarkMode=()=>{ 
    document.body.classList.add("darkmode");
    localStorage.setItem("darkMode","active");
}

const disableDarkMode=()=>{
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkMode",null);
}

if(darkMode==="active") enableDarkMode();

theme.addEventListener("click",()=>{
    darkMode=localStorage.getItem("darkMode");
    darkMode!=="active"?enableDarkMode():disableDarkMode();
})

