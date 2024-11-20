let countLight = 0;

function displayLight() {
    if (countLight % 2 === 0) {
        document.getElementById('body').style.backgroundColor = "#454545"; 
    } else {
        document.getElementById('body').style.backgroundColor = "whitesmoke";
    }
    countLight++; 
}
function displayMenu() {
    let menu = document.querySelector('.lin');
    if (menu) {
    
        if (menu.style.display === "block") {
            menu.style.display = "none"; 
        } else {
            menu.style.display = "block"; 
            menu.style.gap = "20px ";
        }
        
    } else {
        console.error("Menu element not found!");
    }
}