const { gql } = require('apollo-server');

const typeDefs = gql `
type Map {
    _id: String!
    id: Int!
    name: String!
    owner: String!
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
    currentMapOnTop(listID: String!) : String
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
}
`;

module.exports = { typeDefs: typeDefs }