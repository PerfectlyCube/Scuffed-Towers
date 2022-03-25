class Price {

    constructor (gold, wood) {

        this.gold = gold;
        this.wood = wood;

    }

}

class Resources {

    constructor (gold, wood) {

        this.gold = gold;
        this.wood = wood;

    }

    removeResourcesByPrice(price) {

        this.gold -= price.gold;
        this.wood -= price.wood;

    }

    sellWood(amount) {

        if (this.wood >= amount) {
        
            this.gold += amount/25;
            this.wood -= amount;
        
        }

    }

    buyWood(amount) {

        if (this.gold >= amount/5) {

            this.wood += amount;
            this.gold -= amount/5;

        }

    }

}