
const typeDefs = gql `
type Region {
    _id: String!
    id: Int!
    capital: String!
    leader: String!
    Flag: String!
    parentRegion:  Boolean!
    landmark: [String]
}
extend type Query {
    getAllRegions: [Region]
    getRegionById(_id: String!): Region
    getAllLandmark(_id : String!) : [String]
    getViewerRegions(_id : String!): Region
}
extend type Mutation {
    addRegion(region: RegionInput!): String
    deleteRegion(_id: String!): Boolean
    updateRegionField(_id: String!, field: String!, value: String!): String
    updateParent_RegionIDField(_id: String!, parentID : String!): String
    sortRegions(_id : String!, updateitems: [String]!): [Item]
    deleteLandMarkField(_id : String! , deleteValue : String!) : [String]
    addLandMarkField(_id : String!, value : String!) : [String]
    updateLandMarkField(_id: String!, field: String!, value: String!): String
}
input FieldInput {
    _id: String
    field: String
    value: String
}
input RegionInput {
    _id: String
    id: Int
    capital: String
    leader: String
    Flag: String
    parentRegion:  Boolean
    landmark: [String]
}

`;