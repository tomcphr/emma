export default class Speech {
    constructor(scene, text) {
    	this.scene = scene;
    	this.text = text;
    	this.pointer = 0;
    };

    getText() {
    	if (!(this.pointer in this.text)) {
    		this.pointer = 0;
    		return;
    	}
    	return this.text[this.pointer++];
    };

    reset() {
    	this.pointer = 0;
    }
}