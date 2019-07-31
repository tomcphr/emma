export default class Item {
    constructor(scene, item, quantity) {
        this.scene = scene;
        this.item = item;
        this.quantity = quantity;
    };

    getId() {
        return this.item;
    };

    getQuantity() {
        return this.quantity;
    };
}
