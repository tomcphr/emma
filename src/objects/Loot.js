export default class Loot
{
    getItems(maxItems = 10) {
        // Randomly pick a number of items up to the max
        let picks = Math.floor(Math.random() * maxItems);

        // todo? maybe make the items picking unique? quantities?
        var items = [];
        for (var i = 0; i <= picks; i++) {
            let item = this.getItem();
            items.push(item);
        }

        return items;
    };

    getItem() {
        let random = Math.random();

        let lootTable = {
            0.1 :   "Ultra rare 0.1%",
            0.5 :   "0.5% chance",
            1   :   "1% chance",
            5   :   "5% chance",
            10  :   "10% chance",
            15  :   "15% chance",
            20  :   "20% chance",
            25  :   "25% chance",
            30  :   "30% chance",
            40  :   "40% chance",
            50  :   "50% chance",
            60  :   "60% chance",
            70  :   "70% chance",
            80  :   "80% chance",
            90  :   "90% chance",
            100 :   "100% chance",
        };

        for (var chance in lootTable) {
            var item = lootTable[chance];
            if (random <= (chance / 100)) {
                return item;
            }
        }
    };
}
