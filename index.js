let gridElement = document.querySelector('#grid');

let count = 0;

// loop to create the div elements 
for (let i=0; i<16; i++){
    count++;

    if (count===4){
        count=0;
        newDiv = document.createElement('div');
        newDiv.classList.add('cell');
        gridElement.appendChild(newDiv);
    }else{
        newDiv = document.createElement('div');
        newDiv.classList.add('cell');
        newDiv.style.borderRight = "none";
        gridElement.appendChild(newDiv);
    }
}

let newGridElement = document.querySelector('#grid');
let firstClick = 0;
let startTime = "none";

handleCellClick = (e) => {

    imageList = [
                "https://cdn.discordapp.com/attachments/431354432987594763/1013856792771571743/FW2PCceVsAAo9Ju.jpeg", 
                "https://cdn.discordapp.com/attachments/431354432987594763/1014050303877845112/000.jpg",
                "https://cdn.discordapp.com/attachments/431354432987594763/1010129622362488862/IMG_0301.JPG"
            ]
    if (firstClick === 0){
        startTime = Date.now();
        firstClick++;
    }

    if (newGridElement !== e.target){
        if (e.target.style.backgroundColor != "green"){
            e.target.style.backgroundImage = `url(${imageList[Math.floor(Math.random()*imageList.length)]})`;
        }
    }
}
newGridElement.style.boxSizing = "border-box";
newGridElement.addEventListener('click', handleCellClick);

let resetButton = document.querySelector('#reset');
let frogCheckCounter = 0;

let timerElement = document.querySelector('#time');
let alertElement = document.querySelector('#alert');

handleSubmitButtonClick = () => {

    for (let child of newGridElement.children){
        if (child.style.backgroundImage.slice(4, -1).replace(/"/g, "") === imageList[1]){
            child.style.backgroundImage = "none";
            child.style.backgroundColor = "green";
            frogCheckCounter++;
        }

    }
    if (frogCheckCounter === 16){
        let endTime = Date.now();
        let timeTaken = ((endTime-startTime)/1000);
        let medal = "none";
        if (timeTaken <= 22) {
            medal = "Elite";
        }else if (timeTaken > 22 && timeTaken < 35){
            medal = "Average";
        }else{
            medal = "Too slow, please delete the game";
        }
        timerElement.innerHTML = `Time taken: ${((endTime-startTime)/1000)} seconds. \n \nYou have recieved the medal ---> ${medal}`;
        alertElement.innerHTML = "ALL FROGS FOUND";
        for (let child of newGridElement.children){
            child.style.backgroundColor = "red";
        }
        firstClick = 0;
    }else{
        alertElement.innerHTML = `${16-frogCheckCounter} FROGS REMAINING`;
        
    }
}

handleResetButtonClick = () => {
    for (let child of newGridElement.children){
        child.style.backgroundColor = "red";
        child.style.backgroundImage = "green";
        firstClick = 0;
        frogCheckCounter = 0;
        timerElement.innerHTML = "";
        alertElement.innerHTML = "";
    }
}

let submitButton = document.querySelector("#submit");

resetButton.addEventListener('click', handleResetButtonClick);
submitButton.addEventListener('click', handleSubmitButtonClick);