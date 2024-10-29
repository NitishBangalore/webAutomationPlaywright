class ItemUtils{

    constructor(){
        this.serialNumber();
        this.generateItemCode();
    }


    static async getItemSerialNumber(){
        let serial = Date.now().toString().substring(2, 12);
        process.env.itemSerialNumber = serial.toString();  //set the value
        return serial.toString();
    }

    static async generateItemCode(){
        let code = Date.now().toString().substring(2, 10);
        process.env.itemCode = code.toString();
        return code.toString();
    }
}

module.exports = { ItemUtils };