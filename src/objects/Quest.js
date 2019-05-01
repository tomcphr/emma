export default class Quest {
    constructor(scene, title, description) {
        this.scene = scene;

        this.title = title;

        this.description = description;

        this.status = 0;
    };

    setProgressStatus() {
        this.status = 1;
    };

    setCompleteStatus() {
        this.status = 2;
    };

    getTitle() {
        return this.title;
    };

    getDescription() {
        return this.description;
    };

    getStatus() {
        return this.status;
    };

    isQuestNew() {
        return (this.status === 0);
    };

    isQuestInProgress() {
        return (this.status === 1);
    };

    isQuestComplete() {
        return (this.status === 2);
    };
}
