module.exports = {
	Query: {
		getAllRegions: async (_, __, { req }) => { },
		getAllLandmark: async (_, __, { req }) => { },
		getViewerRegions: async (_, __, { req }) => { },
		getRegionById: async (_, args) => {},
	},
	Mutation: {
		addRegion: async(_, args) => {},		
		deleteRegion: async (_, args) => {},
		updateRegionField: async (_, args) => {},
		updateParent_RegionIDField: async (_, args) => {}, // update ParentRegionID
        deleteLandMarkField: async (_, args) => {},
        addLandMarkField: async (_, args) => {},
		updateLandMarkField: async (_, args) => {},
		sortRegions: async (_, args) => {} //when sorting Regions

	}
}
