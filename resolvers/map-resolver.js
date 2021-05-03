const ObjectId = require('mongoose').Types.ObjectId;
const Map = require('../models/map-model');

module.exports = {
	Query: {
		getAllMaps: async (_, __, { req }) => {
			const _id = new ObjectId(req.userId);
			if(!_id) { return([])};
			const todolists = await Map.find({owner: _id}).sort('top');
			if(todolists) {
				return (todolists);
			} 
		},
		getAllCurrentMaps: async (_, args) => {
			const { CurrentID } = args;
			const _id = CurrentID;
			const updated = await Map.findOne({_id: _id});
			if(updated) return updated;
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
				top: 1,
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
		currentMapOnTop: async (_, args) => {
			const {mapID} = args;
			
			await Map.updateMany({top: 1});
			await Map.updateOne({_id: mapID}, {top: 0});
			const prevFirst = await Map.findOne();
			let prevFirstId = prevFirst._id;
			const updateList = await Map.updateOne({_id : prevFirstId}, {top: 1});
			if(updateList){
				await Map.find().sort('top');
				//console.log(prevFirst);
			}
			
			
			return ("A");
		},
        updateRegionfromMap: async (_, args) => {}

	}
}