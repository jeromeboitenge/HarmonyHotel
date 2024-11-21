let countLight = 0;

function displayLight() {
    if (countLight % 2 === 0) {
        document.getElementById('body').style.backgroundColor = "#454545"; 
    } else {
        document.getElementById('body').style.backgroundColor = "#FAF4E1";
    }
    countLight++; 
}
function displayMenu() {
    let menu = document.querySelector('.lin'); // Select the menu element
    if (menu) {
        // Check screen width
        if (window.innerWidth <= 600) {
            // Toggle visibility
            if (menu.style.display === "block") {
                menu.style.display = "none"; // Hide the menu
            } else {
                menu.style.display = "block"; // Show the menu
                menu.style.gap = "20px"; // Optional styling
            }
        } else {
            console.warn("Menu toggle is disabled for screens wider than 600px.");
        }
    } else {
        console.error("Menu element not found.");
    }
}

