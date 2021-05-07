const { gql } = require('apollo-server');

const typeDefs = gql `
type Map {
    _id: String!
    id: Int!
    name: String!
    owner: String!
    top: Int!
}
type Region {
    _id: String!
    id: Int!
    capital: String!
    name: String!
    leader: String!
    Flag: String!
    parentRegion:  String!
    landmark: [String]
    forOrder: String!
}
extend type Query {
    getAllMaps: [Map]
    getMapById(_id: String!): Map 
    getAllCurrentMaps(CurrentID: String!):Map
}
extend type Mutation {
    createMap(map: MapInput!): String
    deleteMap(_id: String!): Boolean
    editMapName(_id: String! , name : String! ): String
    currentMapOnTop(mapID: String!) : String
    updateRegionfromMap(listID : String!) : String
}
input FieldInput {
    _id: String
    field: String
    value: String
}
input MapInput {
    _id: String
    id: Int
    name: String
    owner: String
}
input RegionInput {
    _id: String
    id: Int
    capital: String
    name : String
    leader: String
    Flag: String
    parentRegion:  String
    landmark: [String]
    forOrder: String
}
`;

module.exports = { typeDefs: typeDefs }