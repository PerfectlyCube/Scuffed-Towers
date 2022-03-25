import { goldTowTex, woodTowTex } from "./textures"

class Tower {
    
    constructor (img, x, y, id) {

        this.x = x;
        this.y = y;

        this.img = img;

        this.time = 0;

        this.id = id;

    }

    action(gameTime, resources) {

    }

}

class UpgradableTower extends Tower {

    constructor (img, x, y, id, limit) {

        super (img, x, y, id);

        this.limit = limit;
        this.level = 1;

    }

    action(gameTime, resources) {

    }

    upgrade(resources) {

    }

}

class BuyableUpgradableTower extends UpgradableTower {

    constructor (img, x, y, id, limit, price) {

        super (img, x, y, id, limit);
        this.price = price;
    
    }

    action(gameTime, resources) {

    }

    upgrade(resources) {

    }

    buy(resources) {

        resources.removeResourcesByPrice(this.price);

    }



}

class BuyableTower extends Tower {

    constructor (img, x, y, id, price) {

        super (img, x, y, id);
        this.price = price;

    }

    action(gameTime, resources) {

    }

    buy(resources) {

        resources.removeResourcesByPrice(this.price);

    }

}

export class GoldTower extends Tower {

    constructor (x, y) {

        super(goldTowTex, x, y, 0);

    }

    action(gameTime, resources) {

        if (gameTime - this.time >= 750*3) {

            resources.gold += 1;
            this.time = gameTime;

        }

    }   

}

export class WoodTower extends BuyableTower {

    constructor(x, y) {

        super(woodTowTex, x, y, 1, new Price(12, 0));

    }

    action(gameTime, resources) {

        if (gameTime - this.time >= 750) {

            resources.wood += 5;

            this.time = gameTime;

        }

    }
    
}