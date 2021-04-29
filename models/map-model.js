const { model, Schema, ObjectId } = require('mongoose');

const MapSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		id: {
			type: Number,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		owner: {
			type: String,
			required: true
		},
		
	},
	{ timestamps: true }
);

const Map = model('Map', MapSchema);
module.exports = Map;