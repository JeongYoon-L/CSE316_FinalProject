const { gql } = require('apollo-server');
const typeDefs = gql `
type forName {
    _id: String
    name: String
}
extend type Query {
    getAllRegions(parentID : String! ): [Region]
    getRegionById(_id: String!): Region
    getAllLandmark(_id : String!) : [String]
    getAllChildInfo(CurrentID : String!) : [Region]
    getViewerRegions(_id : String!): Region
    getAllCurrentRegions(CurrentID: String!):Region
    getAllParentsBranchRegion(_id: String!): [forName]
}
extend type Mutation {
    addRegion(region: RegionInput!, indexID : [String]! ): String
    deleteRegion(_id: String!, indexID : [String]! ): String
    updateRegionField(itemId: String!, field: String!, value: String!, indexID : [String]!): String
    updateParent_RegionIDField(_id: String!, parentID : String!): String
    sortTodoItems(updateitems: [String]!): String
    deleteLandMarkField(_id : String! , deleteValue : String!) : [String]
    addLandmarkfield(_id : String!, landmark : [String]) : [String]
    editLandmarkfield(_id : String!, landmark : [String]) : [String]
    updateLandMarkField(_id: String!, field: String!, value: String!): String
    findwithArrowViewer(_id: String!, direction: String!): ViewerInput
}

type ViewerInput {
    _id: String
    id: Int
    capital: String
    name : String
    leader: String
    parentRegion:  String
    landmark: [String]
    parentName : String
}


`;

module.exports = { typeDefs: typeDefs }