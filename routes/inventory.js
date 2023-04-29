const express = require("express")


const app = express();

const router = express.Router();

const inventoryController = require("../controllers/inventoryController")


//a Retrieve the entire inventory
router.get('/', inventoryController.getInventory)

//b Retrieve a single item from the inventory
router.get('/:id', inventoryController.getItem)

//c Add a new item to the inventory
router.post('/', inventoryController.postItem)

//D Update an existing item in the inventory
router.put('/:id', inventoryController.putItem)


//D Delete an existing item in the inventory
router.delete('/:id', inventoryController.deleteItem)


module.exports = router;