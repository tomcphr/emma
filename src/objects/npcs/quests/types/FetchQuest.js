import Quest from "../../../Quest";

export default class FetchQuest extends Quest {
    constructor(scene, title, description, items) {
        super(scene, title, description);

        this.items = items;

        this.status = 0;
    };

    addItem(item, quantity) {
        this.items[item] -= quantity;
        if (this.items[item] <= 0) {
            delete this.items[item];
        }

        // If this is the first time we have added an item
        if (!this.isQuestNew()) {
            this.setProgressStatus();
        }

        // If everything has been removed from the requirements
        // Then the quest has been completed!
        if (!Object.keys(this.items).length) {
            this.setCompleteStatus();
        }

        return this.isQuestComplete();
    };
}
