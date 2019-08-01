import Item from "./Item";

export default class Inventory {
    constructor(scene) {
        this.scene = scene;
        this.data = {};
    };

    getItems() {
        let items = {};
        for (var item in this.data) {
            let quantity = this.data[item];
            items[item] = new Item(this.scene, item, quantity);
        }
        return items;
    };

    addItem(drop) {
        let item = drop.getItemId();
        let quantity = drop.getQuantity();
        if (item in this.data) {
            quantity = this.data[item] + quantity;
        }

        this.data[item] = quantity;

        return true;
    };

    removeItem(item, quantity) {
        if (!(item in this.data)) {
            return false;
        }

        this.data[item] = this.data[item] - quantity;
        if (this.data[item] <= 0) {
            delete this.data[item];
        }

        return true;
    };
}
