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
    getViewerRegions(_id : String!): Region
    getAllCurrentRegions(CurrentID: String!):Region
    getAllParentsBranchRegion(_id: String!): [forName]
}
extend type Mutation {
    addRegion(region: RegionInput!, indexID : [String]! ): String
    deleteRegion(_id: String!, indexID : [String]! ): String
    updateRegionField(itemId: String!, field: String!, value: String!, indexID : [String]!): String
    updateParent_RegionIDField(_id: String!, parentID : String!): String
    sortRegions(_id : String!, updateitems: [String]!): [String]
    deleteLandMarkField(_id : String! , deleteValue : String!) : [String]
    addLandMarkField(_id : String!, value : String!) : [String]
    updateLandMarkField(_id: String!, field: String!, value: String!): String
}


`;

module.exports = { typeDefs: typeDefs }