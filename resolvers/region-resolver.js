const ObjectId = require('mongoose').Types.ObjectId;
const Region = require('../models/region-model');
const Map = require('../models/map-model');

module.exports = {
	Query: {
		getAllRegions: async (_, args) => { 
			const { parentID } = args;
			if(!parentID) { return };
			const _id = new ObjectId(parentID);
			const todolists = await Region.find({parentRegion: _id});

			if(todolists) {
				return (todolists);
			} 
		},
		getAllCurrentRegions: async (_, args) => {
			const { CurrentID } = args;
			const _id = CurrentID;
			const updated = await Region.findOne({_id: _id});
			if(updated) return updated;
		},
		getAllLandmark: async (_, __, { req }) => { },
		getViewerRegions: async (_, __, { req }) => { },
		getAllParentsBranchRegion: async (_, args) => {
			let { _id } = args;
			let array = [];
			let updated = "A";
			while(updated || updated !== null){
				const updated = await Region.findOne({_id: _id});
				if(!updated || updated == null){
					const mapSelect = await Map.findOne({_id: _id});
					if(mapSelect || mapSelect !== null){
						let ar = {
							_id : mapSelect._id,
							name : mapSelect.name
						};
						array.push(ar);
					}
					break;
				}
				let ar1 = {
					_id : updated._id,
					name : updated.name
				};
				array.push(ar1);
				_id = updated.parentRegion;
			}				
			if(array) return array;
		},
		getRegionById: async (_, args) => {},
	},
	Mutation: {
		addRegion: async(_, args) => {
			const { region } = args;
			const objectId = new ObjectId();
			const { id , parentRegion, capital, name, leader, Flag} = region;
			const newList = new Region({
				_id: objectId,
				id: id,
                capital: capital,
				name : name,
                leader: leader,
                Flag: Flag,
                parentRegion: parentRegion,
                landmark: [] ,
			});
			const updated = await newList.save();
			
			if(updated) return objectId;
			else return ('Could not add region');
		},		
		deleteRegion: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const deleted = await Region.deleteOne({_id: objectId});
			if(deleted) return true;
			else return false;
		},
		updateRegionField: async (_, args) => {},
		updateParent_RegionIDField: async (_, args) => {}, // update ParentRegionID
        deleteLandMarkField: async (_, args) => {},
        addLandMarkField: async (_, args) => {},
		updateLandMarkField: async (_, args) => {},
		sortRegions: async (_, args) => {} //when sorting Regions

	}
}
