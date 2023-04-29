const Item = require("../models/item")

exports.getInventory = async (req, res, next)=>{
    try{
        const items = await Item.findAll();
        
        res.status(200).json(items)
    }
    catch(err){
        console.log(err);

        res.status(404).json({success: false, Message: "Internal server error! Cant give you the info"})
    }

}

//give back a single item by id
exports.getItem = async (req, res, next)=>{
    try{

        const itemId = req.param.id;

        const item = await Item.findByPk(itemId);
        res.status(200).json(item)
    }
    catch(err){
        console.log(err);

        res.status(404).json({success: false, Message: "Internal server error! Cant give you the ITEM info"})
    }

}


//add a single item to the db
exports.postItem = async (req, res, next)=>{
    try{
        const amount =  req.body.amount;
        const desc =  req.body.desc;
        const type =  req.body.type;

        const itemPushed = await Item.create(
            {
                amount: amount,
                desc: desc,
                type: type
               
            }
        )
        res.status(200).json(itemPushed)
    }
    catch(err){
        console.log(err);
        //BAD REQ STATUS
        res.status(400).json({success: false, Message: "Internal server error! Item not posted!"})
    }

}

exports.putItem = async (req, res, next)=>{
    try{
        const itemId = req.params.id;

        const amount =  req.body.amount;
        const desc =  req.body.desc;
        const type =  req.body.type;

        const item = await Item.findByPk(itemId);

        const itemPushed = await item.update({
            amount: amount,
            desc: desc,
            type: type
        })

        res.status(200).json(itemPushed)
    }
    catch(err){
        console.log(err);        
        res.status(404).json({success: false, Message: "Internal server error! Item not found! or not all field are not provided."})
    }

}


exports.deleteItem = async (req, res, next)=>{
    try{
        const itemId = req.params.id;
        
        const item = await Item.findByPk(itemId);

        item.destroy();
        res.status(200).json({success: true, Message: "deleted successfully"})
    }
    catch(err){
        console.log(err);
        
        res.status(404).json({success: false, Message: "Internal server error! Item not found!"})
    }

}



