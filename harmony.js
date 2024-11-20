let countLight = 0;

function displayLight() {
    if (countLight % 2 === 0) {
        document.getElementById('body').style.backgroundColor = "#454545"; 
    } else {
        document.getElementById('body').style.backgroundColor = "whitesmoke";
    }
    countLight++; 
}