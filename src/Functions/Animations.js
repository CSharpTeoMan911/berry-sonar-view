let authContainerInterval = null;

function authContainerGeometry(){
    let main_background = document.getElementById("main-background");
    let auth_container = document.getElementById("auth-container");

    if(main_background != null && auth_container != null){
        const mainHeight = main_background.offsetHeight;
        const mainWidth = main_background.offsetWidth;

        if(mainHeight <= 500 || mainWidth <= 500 ){
            auth_container.style.width = mainWidth * 96 / 100 + "px";
            auth_container.style.maxWidth = "100%";

        }
        else{
            auth_container.style.width = mainWidth * 70 / 100 + "px";
            auth_container.style.maxWidth = "500px";
        }
    }
}

export function setAuthContainerGeometry(){
    try{
        clearInterval(authContainerInterval);
        authContainerInterval = null;
    }
    catch{}

    authContainerInterval = setInterval(authContainerGeometry, 10);
}