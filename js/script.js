const doorImage1 = document.getElementById('door1');
const doorImage2 = document.getElementById('door2');
const doorImage3 = document.getElementById('door3');
const startButton = document.getElementById('start');
const botDoorPath = 'res/robot.svg';
const beachDoorPath = 'res/beach.svg';
const spaceDoorPath = 'res/space.svg';
const closedDoorPath = 'res/closed_door.svg';

let currentlyPlaying = true;
let numClosedDoors = 3;
let openDoor1, openDoor2, openDoor3;

const isBot = door => {
    srcPath = door.src.split('/');
    checkPath = botDoorPath.split('/');
    if (srcPath[srcPath.length-1] === checkPath[checkPath.length-1]) {
        return true;
    } else {
        return false;
    }
};

const isClicked = door => {
    srcPath = door.src.split('/');
    checkPath = closedDoorPath.split('/');
    if (srcPath[srcPath.length-1] === checkPath[checkPath.length-1]) {
        return false;
    } else {
        return true;
    }
};

const playDoor = door => {
    numClosedDoors -= 1;
    if (numClosedDoors == 0) {
        gameOver('win');
    } else if (isBot(door)) {
        gameOver();
    }

};

const randomChoreDoorGenerator = () => {
    const choreDoor = Math.floor(Math.random() * numClosedDoors);
    if (choreDoor === 0) {
        openDoor1 = botDoorPath;
        openDoor2 = beachDoorPath;
        openDoor3 = spaceDoorPath;
    } else if (choreDoor === 1) {
        openDoor2 = botDoorPath;
        openDoor1 = beachDoorPath;
        openDoor3 = spaceDoorPath;
    } else {
        openDoor3 = botDoorPath;
        openDoor1 = beachDoorPath;
        openDoor2 = spaceDoorPath;
    }
};

doorImage1.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImage1)) {
        doorImage1.src = openDoor1;
        playDoor(doorImage1);
    }
};

doorImage2.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImage2)) {
        doorImage2.src = openDoor2;
        playDoor(doorImage2);
    }
};

doorImage3.onclick = () => {
    if(currentlyPlaying && !isClicked(doorImage3)) {
        doorImage3.src = openDoor3;
        playDoor(doorImage3);
    }
};

startButton.onclick = () => {
    if (!currentlyPlaying) {
         startRound();
    }
};

const startRound = () => {
    doorImage1.src = closedDoorPath;
    doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;
    startButton.innerHTML = 'Good luck!';
    numClosedDoors = 3;
    currentlyPlaying = true;
    randomChoreDoorGenerator();
};

const gameOver = status => {
    if (status === 'win') {
        startButton.innerHTML = 'You win! Play again?';
    } else {
        startButton.innerHTML = 'Game over! Play again?';
    }
    currentlyPlaying = false;
};

startRound();
