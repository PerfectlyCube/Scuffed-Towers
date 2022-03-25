import { towers } from "./game";
import { goldTex, grsTex, woodTex } from "./textures";

export var cloudX = [], cloudY = [];
export var cloudMoveX = 0, cloudMoveY = 0;

export var cloudRX = [], cloudRY = [];

export var posX = 0, posY = 0;
export var veloX = 0, veloY = 0;

export function render() {

    g.fillStyle = `rgb(${144}, ${168}, ${255})`;
    g.fillRect(0, 0, displayWidth, displayHeight);

    for (let y = 0; y < 25; y++) {

        for (let x = 0; x < 25; x++) {

            if (posX + x * 32 >= displayWidth || posY + y * 32 >= displayHeight || (posX + x * 32) + 32 < 0 || (posY + y * 32) + 32 < 0) continue;

            g.drawImage(grsTex, posX + x * 32, posY + y * 32, 32, 32);

        }

    }

    for (let i = 0; i < towers.length; i++) {

        let tower = towers[i];

        if ((posX + tower.x * 32) + 32 < 0 || (posY + tower.y * 32) + 32 < 0 || posX + tower.x * 32 >= displayWidth || posY + tower.y * 32 >= displayHeight) continue;
        
        g.drawImage(tower.img, posX + tower.x * 32, posY + tower.y * 32, 32, 32);

    }

    for (let x = 0; x < 64; x++) {
        
        for (let y = 0; y < 36; y++) {

            var cX = (cloudX[x + y] + cloudRX[x + y]) - 64, cY = (cloudY[x + y] + cloudRY[x + y]) - 48;

            if (cX + 64 < -64)
                cloudX[x + y] = (displayWidth + 128) - cloudRX[x + y];
                
            if (cX > displayWidth + 128)
                cloudX[x + y] = -64 - cloudRX[x + y];

            if (cY + 48 < -48)
                cloudY[x + y] = (displayHeight + 96) - cloudRY[x + y];
        
            if (cY > displayHeight + 48)
                cloudY[x + y] = -48 - cloudRY[x + y];
            
            if (cX + 48 < 0 || cY + 32 < 0 || cX > displayWidth || cY > displayHeight) continue;

            g.drawImage(cloun, cX, cY, 48, 32);

        }
        
    }

    for (let i = 0; i < cloudX.length; i++) {

        cloudX[i] += cloudMoveX;
        cloudY[i] += cloudMoveY;

    }

    drawGui();
    drawShop();

}

function drawGui() {

    g.font = "18px Arial"
    g.fillStyle = "#ffffff";
    g.drawImage(goldTex, 4, 4);
    g.fillText("Gold: " + Math.floor(resources.gold) + "g", 4 + 20, 18);

    g.drawImage(woodTex, 4, 22);
    g.fillText("Wood: " + Math.floor(resources.wood), 4 + 20, 36);

}

var phase = 0;
var alreadyPressed = false;
var shopOpen = false;

var shopOptions = [

    "Sell Wood",
    "Buy Wood",
    
]

function drawShop() {

    var hovered = mouseX > displayWidth - 240 + 8 && 
        mouseY > displayHeight - 80 - (Math.sin(phase * Math.PI/180) * (displayHeight - 80)) &&
        mouseX < displayWidth - 240 + 180 + 8 &&
        mouseY < displayHeight - 80 - (Math.sin(phase * Math.PI/180) * (displayHeight - 80)) + 90

    var buttonPressed = Math.sin(phase * Math.PI/180) != 0 && Math.sin(phase * Math.PI/180) != 1;

    g.fillStyle = hovered? "#ffffff" : "#aaaaaa";
    g.fillRect(displayWidth - 240, displayHeight - 80 - (Math.sin(phase * Math.PI/180) * (displayHeight - 80)), 180, 80);

    g.fillStyle = "#000000";
    g.font = "30px Arial"
    g.fillText("Shop", displayWidth - 215, displayHeight - 35 - (Math.sin(phase * Math.PI/180) * (displayHeight - 80)));

    if (mouseDown && !alreadyPressed && hovered && !buttonPressed) {
        
        shopOpen = Math.sin(phase * Math.PI/180) != 0
        
        if (shopOpen)
            phase -= 4;
        else
            phase += 4;

    }

    if (buttonPressed)
        if (shopOpen)
            phase -= 4;
        else
            phase += 4;

    if (Math.sin(phase * Math.PI/180) != 0) {

        let shopUIY = displayHeight - (Math.sin(phase * Math.PI/180) * (displayHeight - 80))

        g.fillStyle = "#777777"
        g.fillRect(0, shopUIY, displayWidth, displayHeight);
        
        g.fillStyle = "#aaaaaa"
        g.fillRect(0, shopUIY, displayWidth, 10);

        for (let i = 0; i < shopOptions.length; i++) {

            var option = shopOptions[i];

            function optionAction(option) {

                if (option === "Sell Wood") {

                    resources.sellWood(5);

                }

                if (option === "Buy Wood") {

                    resources.buyWood(5);

                }

            }

            let subButtonHover = mouseX > 25 + 8 &&
                mouseY > shopUIY + displayHeight - 200 - (180/1.5 * i) + 10 &&
                mouseX < 25 + 200 + 8 &&
                mouseY < shopUIY + displayHeight - 200 - (180/1.5 * i) + 90 + 10;

            g.fillStyle = subButtonHover? "#ffffff" : "#999999";
            g.fillRect(25, shopUIY + displayHeight - 200 - (180/1.5 * i), 200, 90)

            g.fillStyle = "#000000";
            g.fillText(option, 40, shopUIY + displayHeight - 145 - ((145 * 1.25/1.5) * i))

            if (mouseDown && !alreadyPressed && subButtonHover)
                optionAction(option);

        }

    }
        
    // should we add a clamp method?

    phase = Math.max(Math.min(phase, 90), 0);

}