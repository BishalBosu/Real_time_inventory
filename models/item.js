const Sequelize = require("sequelize")

const sequelize = require("../utils/database")

const Item = sequelize.define("item", {
    id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},

	amount: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},

	desc: {
		type: Sequelize.STRING,
		allowNull: false,
	},
    type: {
		type: Sequelize.STRING,
		allowNull: false,
	}



})

module.exports = Item;