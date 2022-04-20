const Joi = require('joi');
const BaseModel = require('./BaseModel');

const schema = Joi.object({
	id: Joi.number().integer().min(1).required().allow(null),
	name: Joi.string().max(255).required(),
	path: Joi.string().max(255).required(),
});

class ProxyModel extends BaseModel {
	static get table () {
		return 'proxy';
	}

	static get schema () {
		return schema;
	}

	static get unique () {
		return [ 'id', 'name', 'path' ];
	}

	constructor (properties = {}) {
		super();

		/** @type {number} */
		this.id = null;

		/** @type {string} */
		this.name = '';

		/** @type {string} */
		this.path = '';

		Object.assign(this, properties);
		return new Proxy(this, BaseModel.ProxyHandler);
	}
}

module.exports = ProxyModel;
