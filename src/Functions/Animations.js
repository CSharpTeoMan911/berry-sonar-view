let authContainerInterval = null;
let gradientFluctuationInterval = null;
let gradientOffset = 70;
let switch_offset = false;


function gradientFluctuation() {
    if(switch_offset == false){
        if(gradientOffset < 100){
            gradientOffset++;   
        }
        else{
            switch_offset = true;
        }
    }
    else{
        if(gradientOffset > 70){
            gradientOffset--;   
        }
        else{
            switch_offset = false;
        }
    }

    let auth_container = document.getElementById("auth-container");

    if(auth_container != null && auth_container != undefined){
        console.log(auth_container.style.background);
         // linear-gradient(90deg, rgba(245, 35, 95, 0.80) 0%, rgba(117, 19, 47, 0.8) 70%);
        auth_container.style.background = `linear-gradient(90deg, rgba(245, 35, 95, 0.80) 0%, rgba(97, 15, 38, 0.8) ${gradientOffset}%)`;
    }
}

export function setGradientFluctuation() {
  try {
    gradientOffset = 70;
    clearInterval(gradientFluctuationInterval);
    gradientFluctuationInterval = null;
  } 
  catch {}
  gradientFluctuationInterval = setInterval(gradientFluctuation, 100);
}

function authContainerGeometry() {
  let main_background = document.getElementById("main-background");
  let auth_container = document.getElementById("auth-container");

  if (main_background != null && auth_container != null) {
    const mainHeight = main_background.offsetHeight;
    const mainWidth = main_background.offsetWidth;

    if (mainHeight <= 500 || mainWidth <= 500) {
      auth_container.style.width = (mainWidth * 96) / 100 + "px";
      auth_container.style.maxWidth = "100%";
    } else {
      auth_container.style.width = (mainWidth * 70) / 100 + "px";
      auth_container.style.maxWidth = "500px";
    }
  }
}

export function setAuthContainerGeometry() {
  try {
    clearInterval(authContainerInterval);
    authContainerInterval = null;
  } catch {}

  authContainerInterval = setInterval(authContainerGeometry, 10);
}
