import Item from "./Item";

export default class Loot
{
    constructor(scene, drops)
    {
        this.scene = scene;
        this.drops = drops;

        // Ensure that the drops are ordered by chance
        this.drops.sort((a, b) => {
            return a.chance - b.chance;
        });
    };

    getItems(maxItems = 10) {
        // Randomly pick a number of items up to the max
        let picks = Math.floor(Math.random() * maxItems);

        var items = [];
        for (var i = 0; i < picks; i++) {
            let item = this.getItem();

            // If we already given this item, then continue;
            let processed = items.find((e) => {return e.item === item.item});
            if (processed) {
                continue;
            }

            items.push(item);
        }

        return items;
    };

    getItem() {
        let random = Math.random();

        for (var record in this.drops) {
            let item = this.drops[record];

            let code = item.id;
            let chance = item.chance;
            
            if (random <= (chance / 100)) {
                // Pick a random quantity based on the min and max.
                let quantity = Math.floor(random * (item.max - item.min + 1) + item.min);

                return new Item(this.scene, code, quantity);
            }
        }

        return null;
    };
}
