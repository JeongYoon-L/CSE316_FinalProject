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
		deleteMap: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const deleted = await Map.deleteOne({_id: objectId});
			if(deleted) return true;
			else return false;
		},
		editMapName: async (_, args) => {
			const { _id, name } = args;
			const updated = await Map.updateOne({_id: _id}, { name: name });
			if(updated) return _id;
			else return ('Could not edit map name');
		},
		currentMapOnTop: async (_, args) => {},
        updateRegionfromMap: async (_, args) => {}

	}
}