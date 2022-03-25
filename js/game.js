import { cloudRX, cloudRY, cloudMoveX, cloudMoveY, cloudX, cloudY, veloX, veloY, posX, posY } from "./renderer";
import { GoldTower, WoodTower } from "./towers";
import { render } from "./renderer";

const canvas = document.getElementById("screen");
const g = canvas.getContext('2d');

const fullscreen = document.getElementById("fullscreen");

var init = false;

let gameTime = 0;

let displayWidth = 0, displayHeight = 0;

var mouseX = 0, mouseY = 0;

var resources = new Resources(0, 100);

export var towers = new Array();

function main() {

    towers.push(new GoldTower(3, 2));
    towers.push(new WoodTower(3, 3));

    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight);

    displayWidth = window.innerWidth;
    displayHeight = window.innerHeight;

    cloun.style.opacity = 0.5

    for (let i = 0; i < 64 * 36; i++) {

        cloudRX.push(Math.random() * (displayWidth + 128));
        cloudRY.push(Math.random() * (displayHeight + 96));

        cloudX.push(0);
        cloudY.push(0);

    }

    g.imageSmoothingEnabled = false;

    init = true;

}

function loop() {

    if (!init)
        main();

    posX += veloX;
    posY += veloY;

    veloX *= 0.925;
    veloY *= 0.925;

    moveTower();

    render();

    alreadyPressed = mouseDown;

}

var heldTower = null;
var lastTowerX = 0;
var lastTowerY = 0;
var htID = 0;

function moveTower() {

    for (let i = 0; i < towers.length; i++) {

        let tower = towers[i];

        if (tower.x == Math.floor((mouseX - posX - 1)/32) && tower.y == Math.floor((mouseY - posY + 16)/32) && heldTower == null) {

            if (mouseDown && !alreadyPressed) {

                lastTowerX = tower.x;
                lastTowerY = tower.y;

                heldTower = tower;

                htID = i;

            }

        }

    }

    if (heldTower != null) {

        heldTower.x = Math.floor((mouseX - posX - 1)/32);
        heldTower.y = Math.floor((mouseY - posY + 16)/32);

        var text = null;

    }

    if (heldTower != null && !mouseDown) {

        for (let i = 0; i < towers.length; i++) {

            var tower = towers[i];

            if (tower != heldTower) {

                if (heldTower.x == tower.x && heldTower.y == tower.y) {

                    heldTower.x = lastTowerX;
                    heldTower.y = lastTowerY;

                    towers[htID] = heldTower;

                    heldTower = null;

                    return;

                }

            }

        }

        towers[htID] = heldTower;
        heldTower = null;

    }

}

setInterval(loop, 12)

var mouseDown = false;

canvas.addEventListener("mousedown", (e) => {

    mouseDown = true;

})

canvas.addEventListener("mouseup", (e) => {

    mouseDown = false;

})

canvas.addEventListener("mousemove", (e) => {
    
    if (mouseDown && Math.sin(phase * Math.PI/180) == 0 && heldTower == null) {

        veloX += e.movementX/16;
        veloY += e.movementY/16;
        
        cloudMoveX += e.movementX/500;
        cloudMoveY += e.movementY/500;

    }

    mouseX = e.clientX;
    mouseY = e.clientY;

})

fullscreen.addEventListener("click", (e) => canvas.requestFullscreen())