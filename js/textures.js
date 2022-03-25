export var grsTex = document.createElement("img");
grsTex.src = "../resources/grass.png";

export var goldTowTex = document.createElement("img");
goldTowTex.src = "../resources/goldtower.png";

export var woodTowTex = document.createElement("img");
woodTowTex.src = "../resources/woodtower.png";

export var goldTex = document.createElement("img");
goldTex.src = "../resources/gold.png";

export var woodTex = document.createElement("img");
woodTex.src = "../resources/wood.png";

export var cloun = document.createElement("img");
cloun.src = "../resources/cloud.png";

function createTexture(path) {

    var texture = document.createElement("img");
    texture.src = path;

    return texture;

}