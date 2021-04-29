const ObjectId = require('mongoose').Types.ObjectId;
const Map = require('../models/map-model');

module.exports = {
	Query: {
		getAllMaps: async (_, __, { req }) => {
			const _id = new ObjectId(req.userId);
			if(!_id) { return([])};
			const todolists = await Map.find({owner: _id}).sort({updatedAt: 'descending'});
			if(todolists) {
				return (todolists);
			} 
		},
		getMapById: async (_, args) => {},
	},
	Mutation: {
		createMap: async(_, args) => {
			const { map } = args;
			const objectId = new ObjectId();
			const { id, name, owner } = map;
			const newList = new Map({
				_id: objectId,
				id: id,
				name: name,
				owner: owner,
			});
			const updated = await newList.save();
			if(updated) return objectId;
			else return ('Could not add map');
		},
		deleteMap: async (_, args) => {},
		editMap: async (_, args) => {},
		currentMapOnTop: async (_, args) => {},
        updateRegionfromMap: async (_, args) => {}

	}
}