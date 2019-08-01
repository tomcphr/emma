import Quest from "../../../Quest";
export default class ConquerQuest extends Quest {
    constructor(scene, title, description, amount) {
        super(scene, title, description);
        this.amount = amount;
        this.status = 0;
        this.deaths = 0;
    };

    kill() {
        this.deaths++;

        // If this is the first time we soaked blood.
        if (!this.isQuestNew()) {
            this.setProgressStatus();
        }

        if (this.deaths === this.amount) {
            this.setCompleteStatus();
        }

        return this.isQuestComplete();
    };
}
