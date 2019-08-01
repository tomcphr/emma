export default class Item {
    constructor(scene, item, quantity) {
        this.scene = scene;
        this.item = item;
        this.quantity = quantity;

        this.descriptions = {
            0: "Coins",
            1: "Blade of Eben",
            2: "Staff of Eternal",
        };
    };

    getId() {
        return this.item;
    };

    getQuantity() {
        return this.quantity;
    };

    getDescription() {
        return this.descriptions[this.getId()];
    };
}
