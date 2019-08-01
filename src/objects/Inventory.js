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

    addItem(item) {
        let id = item.getId();
        let quantity = item.getQuantity();
        if (id in this.data) {
            quantity = this.data[id] + quantity;
        }

        this.data[id] = quantity;

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
