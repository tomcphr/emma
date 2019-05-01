import FetchQuest from "./types/FetchQuest";
export default class CooksAssistant {
    constructor(scene) {
        let items = {
            "milk" : 1,
            "egg" : 1,
            "flour" : 1
        };

        super(scene, "Cook's Assistant", "Cake Maker 2000", items);
    };
}
