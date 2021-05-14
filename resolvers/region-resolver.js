const ObjectId = require('mongoose').Types.ObjectId;
const Region = require('../models/region-model');
const Map = require('../models/map-model');

module.exports = {
	Query: {
		getAllRegions: async (_, args) => { 
			const { parentID } = args;
			if(!parentID) { return };
			const _id = new ObjectId(parentID);
			const todolists = await Region.find({parentRegion: _id}).sort({updatedAt: 'ascending'});

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
			if(!_id) { return };
			 let array = [];
			let updated = "A";
			while(updated || updated !== null){
				let updated = await Region.findOne({_id: _id});
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
			const { region, indexID } = args;
			const objectId = new ObjectId();
			const { _id, id , parentRegion, capital, name, leader, Flag} = region;
			let RegionID ='';
			if(_id === ''){ 
				RegionID = objectId;

				const newList = new Region({
					_id: RegionID,
					id: id,
					capital: capital,
					name : name,
					leader: leader,
					Flag: Flag,
					parentRegion: parentRegion,
					landmark: [] ,
					forOrder: "1",
				});
				const updated = await newList.save();
	
				if(updated) return RegionID;
				else return ('Could not add region');								
			}
			else{
				RegionID = _id;
				const newList = new Region({
					_id: RegionID,
					id: id,
					capital: capital,
					name : name,
					leader: leader,
					Flag: Flag,
					parentRegion: parentRegion,
					landmark: [] ,
					forOrder: "1",
				});
				const updated = await newList.save();
				for(let i = 0;i<indexID.length;i++){
					let aa = await Region.updateOne({_id: indexID[i]}, { forOrder: "1" })
				}	
				
				if(updated) return RegionID;
				else return ('Could not add region');					
			}
			return;
		},		
		deleteRegion: async (_, args) => {
			const { _id , indexID} = args;
			const objectId = new ObjectId(_id);
			const deleted = await Region.deleteOne({_id: objectId})
			for(let i = 0;i<indexID.length;i++){
				let aa = await Region.updateOne({_id: indexID[i]}, { forOrder: "1" })
			}		
			if(deleted) return objectId;
			else return "Could not delete region";
		},
		updateRegionField: async (_, args) => {
			const { itemId, field, indexID } = args;
			let { value } = args
			const RegionId = new ObjectId(itemId);
			let updated = await Region.findOne({_id: RegionId});
			console.log(RegionId);
			console.log(itemId);
			
			switch(field) {
				case 'capital':
					updated = await Region.updateOne({_id: RegionId}, { capital: value })
					break;
				case 'leader':
					updated = await Region.updateOne({_id: RegionId}, { leader: value })
					break;
				case 'name':
					updated = await Region.updateOne({_id: RegionId}, { name: value })
					break;
				default:
					return ;
			}
			console.log(indexID);
			for(let i = 0;i<indexID.length;i++){
				let aa = await Region.updateOne({_id: indexID[i]}, { forOrder: "1" })
			}		
			if(updated) return "a";
			else return;
		},
		updateParent_RegionIDField: async (_, args) => {}, // update ParentRegionID
        deleteLandMarkField: async (_, args) => {},
        addLandMarkField: async (_, args) => {},
		updateLandMarkField: async (_, args) => {},
		sortTodoItems: async (_, args) => {
			const {updateitems} = args;
			for(let i = 0;i<updateitems.length;i++){
				let aa = await Region.updateOne({_id: updateitems[i]}, { forOrder: "1" })
			}	
			return "A"

		} //when sorting Regions

	}
}
