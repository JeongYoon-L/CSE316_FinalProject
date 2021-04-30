const { gql } = require('apollo-server');
const typeDefs = gql `

extend type Query {
    getAllRegions(parentID : String! ): [Region]
    getRegionById(_id: String!): Region
    getAllLandmark(_id : String!) : [String]
    getViewerRegions(_id : String!): Region
}
extend type Mutation {
    addRegion(region: RegionInput!): String
    deleteRegion(_id: String!): Boolean
    updateRegionField(_id: String!, field: String!, value: String!): String
    updateParent_RegionIDField(_id: String!, parentID : String!): String
    sortRegions(_id : String!, updateitems: [String]!): [String]
    deleteLandMarkField(_id : String! , deleteValue : String!) : [String]
    addLandMarkField(_id : String!, value : String!) : [String]
    updateLandMarkField(_id: String!, field: String!, value: String!): String
}


`;

module.exports = { typeDefs: typeDefs }